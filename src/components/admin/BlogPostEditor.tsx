import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, X } from 'lucide-react';

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  meta_description: string | null;
  featured_image: string | null;
  category_id: string | null;
  is_published: boolean | null;
  author: string | null;
}

interface BlogPostEditorProps {
  post?: BlogPost | null;
  onSave: () => void;
  onCancel: () => void;
}

const BlogPostEditor = ({ post, onSave, onCancel }: BlogPostEditorProps) => {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    meta_description: '',
    featured_image: '',
    category_id: '',
    is_published: false,
    author: 'Destiny Traders Hub',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        meta_description: post.meta_description || '',
        featured_image: post.featured_image || '',
        category_id: post.category_id || '',
        is_published: post.is_published || false,
        author: post.author || 'Destiny Traders Hub',
      });
    }
  }, [post]);

  const fetchCategories = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('blog_categories')
      .select('id, name, slug')
      .order('name');

    if (error) {
      console.error('Error fetching categories:', error);
    } else {
      setCategories(data || []);
    }
    setIsLoading(false);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: post ? prev.slug : generateSlug(title),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.slug || !formData.excerpt || !formData.content) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);

    const postData = {
      title: formData.title,
      slug: formData.slug,
      excerpt: formData.excerpt,
      content: formData.content,
      meta_description: formData.meta_description || null,
      featured_image: formData.featured_image || null,
      category_id: formData.category_id || null,
      is_published: formData.is_published,
      author: formData.author,
      published_at: formData.is_published ? new Date().toISOString() : null,
    };

    try {
      if (post) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', post.id);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Blog post updated successfully.',
        });
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([postData]);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Blog post created successfully.',
        });
      }

      onSave();
    } catch (error: any) {
      console.error('Error saving post:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save blog post.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Enter post title"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug *</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
            placeholder="post-url-slug"
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category_id}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, category_id: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => setFormData((prev) => ({ ...prev, author: e.target.value }))}
            placeholder="Author name"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt *</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
          placeholder="Brief summary of the post (displayed on blog listing)"
          rows={2}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content *</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
          placeholder="Full blog post content (supports HTML)"
          rows={12}
          required
          className="font-mono text-sm"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="meta_description">Meta Description</Label>
        <Textarea
          id="meta_description"
          value={formData.meta_description}
          onChange={(e) => setFormData((prev) => ({ ...prev, meta_description: e.target.value }))}
          placeholder="SEO meta description (max 160 characters)"
          rows={2}
          maxLength={160}
        />
        <p className="text-xs text-muted-foreground">
          {formData.meta_description.length}/160 characters
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="featured_image">Featured Image URL</Label>
        <Input
          id="featured_image"
          value={formData.featured_image}
          onChange={(e) => setFormData((prev) => ({ ...prev, featured_image: e.target.value }))}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
        <div>
          <Label htmlFor="is_published" className="font-medium">
            Publish Post
          </Label>
          <p className="text-sm text-muted-foreground">
            Make this post visible on the blog
          </p>
        </div>
        <Switch
          id="is_published"
          checked={formData.is_published}
          onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, is_published: checked }))}
        />
      </div>

      <div className="flex gap-3 justify-end pt-4 border-t border-border/50">
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {post ? 'Update Post' : 'Create Post'}
        </Button>
      </div>
    </form>
  );
};

export default BlogPostEditor;
