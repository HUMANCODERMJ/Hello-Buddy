"use client";

import BlogCard from "@/components/blog/BlogCard";
import type { BlogPost } from "@/lib/blog";
import type { Theme } from "@/lib/themes";

export interface BlogGridProps {
  posts: BlogPost[];
  theme: Theme;
  onSelectPost: (slug: string) => void;
  onBack: () => void;
}

export default function BlogGrid({ posts, theme, onSelectPost, onBack }: BlogGridProps) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div
        style={{
          padding: "16px 28px 8px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexShrink: 0,
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            color: theme.colors.textMuted,
            cursor: "pointer",
            padding: "4px",
            display: "flex",
            alignItems: "center",
            fontSize: "1rem",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = theme.colors.primary)}
          onMouseLeave={(e) => (e.currentTarget.style.color = theme.colors.textMuted)}
        >
          ← back
        </button>
        <span style={{ color: theme.colors.textMuted, fontSize: "0.78rem" }}>
          blog / articles
        </span>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "8px 28px 24px",
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "16px",
          alignContent: "start",
        }}
      >
        {posts.map((post, index) => (
          <BlogCard
            key={post.slug}
            post={post}
            theme={theme}
            index={index}
            onClick={() => onSelectPost(post.slug)}
          />
        ))}
      </div>
    </div>
  );
}
