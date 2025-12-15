import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogCard from "@/components/blog/BlogCard";
import BlogBreadcrumb from "@/components/blog/BlogBreadcrumb";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Tag } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  published_at: string;
  featured_image: string | null;
  blog_categories: Category | null;
}

const Blog = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");
  
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Fetch categories
      const { data: categoriesData } = await supabase
        .from("blog_categories")
        .select("*")
        .order("name");
      
      if (categoriesData) {
        setCategories(categoriesData);
      }

      // Fetch posts
      let query = supabase
        .from("blog_posts")
        .select(`
          id,
          title,
          slug,
          excerpt,
          published_at,
          featured_image,
          blog_categories (
            id,
            name,
            slug,
            description
          )
        `)
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      if (categoryFilter) {
        const category = categoriesData?.find(c => c.slug === categoryFilter);
        if (category) {
          query = query.eq("category_id", category.id);
        }
      }

      const { data: postsData } = await query;
      
      if (postsData) {
        setPosts(postsData as unknown as BlogPost[]);
      }
      
      setLoading(false);
    };

    fetchData();
  }, [categoryFilter]);

  const pageTitle = categoryFilter 
    ? `${categories.find(c => c.slug === categoryFilter)?.name || "Category"} Articles`
    : "Trading Education Blog";

  const pageDescription = categoryFilter
    ? `Explore our ${categories.find(c => c.slug === categoryFilter)?.name?.toLowerCase()} articles for trading education and insights.`
    : "Free trading education articles, guides, and insights. Learn forex, risk management, and trading strategies with Deriv.";

  return (
    <>
      <Helmet>
        <title>{pageTitle} | Destiny Traders Hub</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`${window.location.origin}/blog${categoryFilter ? `?category=${categoryFilter}` : ""}`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <BlogHeader />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <BlogBreadcrumb
              items={
                categoryFilter
                  ? [
                      { label: "Blog", href: "/blog" },
                      { label: categories.find(c => c.slug === categoryFilter)?.name || "Category" },
                    ]
                  : [{ label: "Blog" }]
              }
            />

            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Trading Education</span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {categoryFilter ? (
                  <>
                    {categories.find(c => c.slug === categoryFilter)?.name}{" "}
                    <span className="text-gradient-gold">Articles</span>
                  </>
                ) : (
                  <>
                    Learn to Trade with{" "}
                    <span className="text-gradient-gold">Confidence</span>
                  </>
                )}
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {categoryFilter
                  ? categories.find(c => c.slug === categoryFilter)?.description ||
                    "Explore our educational articles."
                  : "Free educational content to help you understand trading basics, risk management, and market analysis."}
              </p>
            </div>

            {/* Categories Filter */}
            <div className="flex flex-wrap gap-2 justify-center mb-12">
              <Link to="/blog">
                <Badge
                  variant={!categoryFilter ? "default" : "secondary"}
                  className="cursor-pointer hover:bg-primary/80"
                >
                  All Articles
                </Badge>
              </Link>
              {categories.map((category) => (
                <Link key={category.id} to={`/blog?category=${category.slug}`}>
                  <Badge
                    variant={categoryFilter === category.slug ? "default" : "secondary"}
                    className="cursor-pointer hover:bg-primary/80"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {category.name}
                  </Badge>
                </Link>
              ))}
            </div>

            {/* Posts Grid */}
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="glass-card p-6">
                    <Skeleton className="h-40 w-full mb-4" />
                    <Skeleton className="h-4 w-24 mb-3" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">No articles found.</p>
                <Link to="/blog" className="text-primary hover:underline">
                  View all articles
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <BlogCard
                    key={post.id}
                    title={post.title}
                    slug={post.slug}
                    excerpt={post.excerpt}
                    publishedAt={post.published_at}
                    featuredImage={post.featured_image || undefined}
                    category={
                      post.blog_categories
                        ? {
                            name: post.blog_categories.name,
                            slug: post.blog_categories.slug,
                          }
                        : undefined
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Blog;
