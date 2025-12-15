import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogBreadcrumb from "@/components/blog/BlogBreadcrumb";
import BlogContent from "@/components/blog/BlogContent";
import BlogSchema from "@/components/blog/BlogSchema";
import BlogCTA from "@/components/blog/BlogCTA";
import BlogRiskDisclaimer from "@/components/blog/BlogRiskDisclaimer";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, User, Tag, ArrowLeft } from "lucide-react";

interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  meta_description: string | null;
  featured_image: string | null;
  author: string | null;
  published_at: string;
  updated_at: string;
  blog_categories: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      setLoading(true);
      
      const { data, error } = await supabase
        .from("blog_posts")
        .select(`
          *,
          blog_categories (
            id,
            name,
            slug
          )
        `)
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();

      if (error || !data) {
        navigate("/blog");
        return;
      }

      setPost(data as unknown as BlogPostData);
      setLoading(false);
    };

    fetchPost();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <BlogHeader />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Skeleton className="h-8 w-64 mb-6" />
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-6 w-48 mb-8" />
            <Skeleton className="h-64 w-full mb-8" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </main>
      </div>
    );
  }

  if (!post) return null;

  const formattedDate = new Date(post.published_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <BlogSchema
        title={post.title}
        description={post.meta_description || post.excerpt}
        slug={post.slug}
        datePublished={post.published_at}
        dateModified={post.updated_at}
        author={post.author || undefined}
        image={post.featured_image || undefined}
      />

      <div className="min-h-screen bg-background">
        <BlogHeader />
        
        <main className="pt-24 pb-16">
          <article className="container mx-auto px-4 max-w-4xl">
            {/* Back Link */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {/* Breadcrumb */}
            <BlogBreadcrumb
              items={[
                { label: "Blog", href: "/blog" },
                ...(post.blog_categories
                  ? [
                      {
                        label: post.blog_categories.name,
                        href: `/blog?category=${post.blog_categories.slug}`,
                      },
                    ]
                  : []),
                { label: post.title },
              ]}
            />

            {/* Header */}
            <header className="mb-8">
              {post.blog_categories && (
                <Link to={`/blog?category=${post.blog_categories.slug}`}>
                  <Badge variant="secondary" className="mb-4 hover:bg-primary/20">
                    <Tag className="w-3 h-3 mr-1" />
                    {post.blog_categories.name}
                  </Badge>
                </Link>
              )}
              
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {post.title}
              </h1>
              
              <p className="text-lg text-muted-foreground mb-6">
                {post.excerpt}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formattedDate}
                </span>
                {post.author && (
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                )}
              </div>
            </header>

            {/* Featured Image */}
            {post.featured_image && (
              <div className="mb-8 rounded-2xl overflow-hidden">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Content */}
            <BlogContent content={post.content} />

            {/* Final CTA */}
            <BlogCTA variant="primary" />

            {/* Final Risk Disclaimer */}
            <BlogRiskDisclaimer />
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
