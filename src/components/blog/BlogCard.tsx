import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt: string;
  category?: {
    name: string;
    slug: string;
  };
  publishedAt: string;
  featuredImage?: string;
}

const BlogCard = ({
  title,
  slug,
  excerpt,
  category,
  publishedAt,
  featuredImage,
}: BlogCardProps) => {
  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="glass-card overflow-hidden group hover:border-primary/50 transition-colors">
      {featuredImage && (
        <div className="aspect-video overflow-hidden">
          <img
            src={featuredImage}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          {category && (
            <Link to={`/blog?category=${category.slug}`}>
              <Badge variant="secondary" className="hover:bg-primary/20">
                <Tag className="w-3 h-3 mr-1" />
                {category.name}
              </Badge>
            </Link>
          )}
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formattedDate}
          </span>
        </div>
        <h3 className="font-display text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          <Link to={`/blog/${slug}`}>{title}</Link>
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
          {excerpt}
        </p>
        <Link
          to={`/blog/${slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Read More
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
