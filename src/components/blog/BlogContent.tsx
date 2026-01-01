import { useMemo } from "react";
import DOMPurify from "dompurify";
import BlogCTA from "./BlogCTA";
import BlogRiskDisclaimer from "./BlogRiskDisclaimer";

interface BlogContentProps {
  content: string;
}

// Configure DOMPurify to allow safe HTML elements and classes
const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['h2', 'h3', 'p', 'strong', 'em', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['class'],
    ALLOW_DATA_ATTR: false,
  });
};

const BlogContent = ({ content }: BlogContentProps) => {
  const renderedContent = useMemo(() => {
    // Split content into sections based on ## headers
    const sections = content.split(/(?=## )/);
    const midPoint = Math.floor(sections.length / 2);

    return sections.map((section, index) => {
      // Convert markdown to simple HTML
      let html = section
        // Headers
        .replace(/^### (.*$)/gim, '<h3 class="font-display text-lg font-semibold text-foreground mt-8 mb-4">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 class="font-display text-xl font-bold text-foreground mt-10 mb-4">$1</h2>')
        // Bold and italic
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // Lists
        .replace(/^\d+\. (.*$)/gim, '<li class="ml-6 mb-2 list-decimal">$1</li>')
        .replace(/^- (.*$)/gim, '<li class="ml-6 mb-2 list-disc">$1</li>')
        // Paragraphs (lines that don't start with HTML tags)
        .split('\n')
        .map(line => {
          const trimmed = line.trim();
          if (!trimmed) return '';
          if (trimmed.startsWith('<')) return line;
          if (trimmed.startsWith('-') || /^\d+\./.test(trimmed)) return line;
          return `<p class="text-muted-foreground leading-relaxed mb-4">${trimmed}</p>`;
        })
        .join('\n');

      // Wrap consecutive list items
      html = html.replace(
        /(<li class="ml-6 mb-2 list-disc">.*?<\/li>\n?)+/g,
        (match) => `<ul class="my-4">${match}</ul>`
      );
      html = html.replace(
        /(<li class="ml-6 mb-2 list-decimal">.*?<\/li>\n?)+/g,
        (match) => `<ol class="my-4">${match}</ol>`
      );

      // Sanitize the HTML to prevent XSS attacks
      const sanitizedHtml = sanitizeHtml(html);

      return (
        <div key={index}>
          <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
          {/* Insert mid-article CTA after the middle section */}
          {index === midPoint && <BlogCTA variant="inline" />}
          {/* Insert risk disclaimer before conclusion */}
          {section.toLowerCase().includes('## conclusion') && <BlogRiskDisclaimer />}
        </div>
      );
    });
  }, [content]);

  return (
    <div className="prose-custom max-w-none">
      {renderedContent}
    </div>
  );
};

export default BlogContent;
