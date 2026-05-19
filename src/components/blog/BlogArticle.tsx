"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import TableOfContents, { extractHeadings } from "@/components/blog/TableOfContents";
import type { BlogPost } from "@/lib/blog";
import type { Theme } from "@/lib/themes";

export interface BlogArticleProps {
  post: BlogPost;
  theme: Theme;
  onBack: () => void;
}

function slugify(text: ReactNode): string {
  const value = Array.isArray(text) ? text.join("") : String(text ?? "");
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function getTextContent(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(getTextContent).join("");
  if (children && typeof children === "object" && "props" in children) {
    return getTextContent((children as { props?: { children?: ReactNode } }).props?.children);
  }
  return "";
}

function markdownComponents(theme: Theme): Components {
  return {
    h1: ({ children }: { children?: ReactNode }) => {
      const text = getTextContent(children);
      return (
        <h1
          id={slugify(text)}
          style={{
            fontSize: "1.6rem",
            color: theme.colors.primary,
            borderBottom: `1px solid ${theme.colors.border}`,
            paddingBottom: "8px",
            marginBottom: "16px",
            fontFamily: "inherit",
          }}
        >
          {children}
        </h1>
      );
    },
    h2: ({ children }: { children?: ReactNode }) => {
      const text = getTextContent(children);
      return (
        <h2
          id={slugify(text)}
          style={{
            fontSize: "1.25rem",
            color: theme.colors.text,
            marginTop: "32px",
            marginBottom: "12px",
            fontFamily: "inherit",
          }}
        >
          {children}
        </h2>
      );
    },
    h3: ({ children }: { children?: ReactNode }) => {
      const text = getTextContent(children);
      return (
        <h3
          id={slugify(text)}
          style={{
            fontSize: "1rem",
            color: theme.colors.textDim,
            marginTop: "24px",
            marginBottom: "8px",
            fontFamily: "inherit",
          }}
        >
          {children}
        </h3>
      );
    },
    p: ({ children }: { children?: ReactNode }) => (
      <p
        style={{
          fontSize: "0.88rem",
          lineHeight: 1.8,
          color: theme.colors.text,
          marginBottom: "16px",
          fontFamily: "inherit",
        }}
      >
        {children}
      </p>
    ),
    a: ({ children, href }: { children?: ReactNode; href?: string }) => (
      <a
        href={href}
        style={{
          color: theme.colors.secondary,
          textDecoration: "underline",
        }}
      >
        {children}
      </a>
    ),
    code: ({ inline, className, children }: { inline?: boolean; className?: string; children?: ReactNode }) => {
      if (!inline) {
        return (
          <code className={className} style={{ background: "transparent", color: theme.colors.text }}>
            {children}
          </code>
        );
      }

      return (
        <code
          style={{
            backgroundColor: theme.colors.bgSecondary,
            color: theme.colors.accent,
            padding: "2px 6px",
            borderRadius: 4,
            fontSize: "0.82em",
            fontFamily: "inherit",
          }}
        >
          {children}
        </code>
      );
    },
    pre: ({ children }: { children?: ReactNode }) => (
      <pre
        style={{
          backgroundColor: "#0d0d0d",
          borderRadius: 8,
          padding: "16px 20px",
          overflowX: "auto",
          marginBottom: "20px",
          border: `1px solid ${theme.colors.border}`,
        }}
      >
        {children}
      </pre>
    ),
    ul: ({ children }: { children?: ReactNode }) => (
      <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>{children}</ul>
    ),
    ol: ({ children }: { children?: ReactNode }) => (
      <ol style={{ paddingLeft: "24px", marginBottom: "16px" }}>{children}</ol>
    ),
    li: ({ children }: { children?: ReactNode }) => (
      <li
        style={{
          fontSize: "0.88rem",
          color: theme.colors.text,
          lineHeight: 1.7,
          marginBottom: "6px",
        }}
      >
        {children}
      </li>
    ),
    blockquote: ({ children }: { children?: ReactNode }) => (
      <blockquote
        style={{
          borderLeft: `3px solid ${theme.colors.secondary}`,
          paddingLeft: "16px",
          color: theme.colors.textDim,
          fontStyle: "italic",
          margin: "16px 0",
        }}
      >
        {children}
      </blockquote>
    ),
    strong: ({ children }: { children?: ReactNode }) => (
      <strong style={{ color: theme.colors.primary, fontWeight: 500 }}>{children}</strong>
    ),
    hr: () => (
      <hr
        style={{
          border: "none",
          borderTop: `1px solid ${theme.colors.border}`,
          margin: "24px 0",
        }}
      />
    ),
    img: ({ src, alt }: any) => (
      <img
        src={src}
        alt={alt}
        style={{
          maxWidth: "100%",
          borderRadius: 6,
          margin: "16px 0",
        }}
      />
    ),
    table: ({ children }: { children?: ReactNode }) => (
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
          fontSize: "0.85rem",
        }}
      >
        {children}
      </table>
    ),
    th: ({ children }: { children?: ReactNode }) => (
      <th
        style={{
          borderBottom: `1px solid ${theme.colors.border}`,
          padding: "8px 12px",
          color: theme.colors.primary,
          textAlign: "left",
        }}
      >
        {children}
      </th>
    ),
    td: ({ children }: { children?: ReactNode }) => (
      <td
        style={{
          borderBottom: `1px solid ${theme.colors.bgSecondary}`,
          padding: "8px 12px",
          color: theme.colors.text,
        }}
      >
        {children}
      </td>
    ),
  };
}

export default function BlogArticle({ post, theme, onBack }: BlogArticleProps) {
  const [activeId, setActiveId] = useState("");
  const [tocOpen, setTocOpen] = useState(true);
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
      { rootMargin: "-20% 0px -70% 0px" }
    );

    container.querySelectorAll("h1,h2,h3").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [post.slug, headings]);

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
          onClick={onBack}
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

          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={markdownComponents(theme)}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
