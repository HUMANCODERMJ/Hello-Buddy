"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import TableOfContents, { extractHeadings } from "@/components/blog/TableOfContents";
import ArticleContent from "@/components/blog/ArticleContent";
import type { BlogPost } from "@/lib/blog";
import type { Theme } from "@/lib/themes";

interface BlogArticleProps {
  post: BlogPost;
  theme: Theme;
  onBack: () => void;
}

export default function BlogArticle({ post, theme, onBack }: BlogArticleProps) {
  const router = useRouter();
  const [activeId, setActiveId] = useState("");
  const [tocOpen, setTocOpen] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 768 : true
  );
  const articleRef = useRef<HTMLDivElement>(null);
  const headings = useMemo(() => extractHeadings(post.content), [post.content]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setTocOpen(false);
    }
  }, []);

  useEffect(() => {
    const container = articleRef.current;
    if (!container) return;

    setActiveId(headings[0]?.id ?? "");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        root: container,
        rootMargin: "-10% 0px -80% 0px",
      }
    );

    container.querySelectorAll("h1, h2, h3").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [post.slug, headings]);

  function handleBack() {
    router.replace("/");
    onBack();
  }

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          padding: "12px 20px",
          borderBottom: `1px solid ${theme.colors.border}`,
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexShrink: 0,
          backgroundColor: theme.colors.bgSecondary,
        }}
      >
        <button
          onClick={handleBack}
          style={{
            background: "none",
            border: "none",
            color: theme.colors.textMuted,
            cursor: "pointer",
            fontSize: "0.85rem",
            padding: "2px 6px",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = theme.colors.primary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = theme.colors.textMuted;
          }}
        >
          ← back
        </button>
        <span style={{ color: theme.colors.border }}>|</span>
        <span
          style={{
            color: theme.colors.textMuted,
            fontSize: "0.78rem",
            fontFamily: "inherit",
          }}
        >
          {post.title}
        </span>
        <span style={{ marginLeft: "auto", color: theme.colors.textMuted, fontSize: "0.72rem" }}>
          {post.readTime}
        </span>
      </div>

      <div style={{ flex: 1, display: "flex", overflow: "hidden", position: "relative" }}>
        <TableOfContents
          headings={headings}
          activeId={activeId}
          setActiveId={setActiveId}
          theme={theme}
          isOpen={tocOpen}
          onToggle={() => setTocOpen((value) => !value)}
        />

        <div
          ref={articleRef}
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "32px 48px 48px",
          }}
        >
          {post.coverImage ? (
            <img
              src={post.coverImage}
              alt={post.title}
              style={{
                width: "100%",
                maxHeight: "300px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "32px",
              }}
            />
          ) : null}

          <ArticleContent html={post.htmlContent} theme={theme} />
        </div>
      </div>
    </div>
  );
}
