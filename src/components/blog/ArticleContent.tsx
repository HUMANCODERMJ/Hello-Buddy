"use client";

import type { Theme } from "@/lib/themes";

interface ArticleContentProps {
  html: string;
  theme: Theme;
}

export default function ArticleContent({ html, theme }: ArticleContentProps) {
  return (
    <div
      className="article-content"
      style={{
        color: theme.colors.text,
        ["--article-primary" as string]: theme.colors.primary,
        ["--article-text" as string]: theme.colors.text,
        ["--article-dim" as string]: theme.colors.textDim,
        ["--article-secondary" as string]: theme.colors.secondary,
        ["--article-accent" as string]: theme.colors.accent,
      }}
    >
      <style jsx global>{`
        .article-content {
          font-family: "JetBrains Mono", "Fira Code", monospace;
          font-size: 0.88rem;
          line-height: 1.8;
        }
        .article-content h1 {
          font-size: 1.6rem;
          font-weight: 500;
          border-bottom: 1px solid #2d1f4e;
          padding-bottom: 8px;
          margin-bottom: 16px;
          margin-top: 0;
          font-family: inherit;
          color: var(--article-primary, #ff6eb4);
        }
        .article-content h2 {
          font-size: 1.25rem;
          font-weight: 500;
          margin-top: 32px;
          margin-bottom: 12px;
          font-family: inherit;
          color: var(--article-text, #f0e6ff);
        }
        .article-content h3 {
          font-size: 1rem;
          font-weight: 500;
          margin-top: 24px;
          margin-bottom: 8px;
          font-family: inherit;
          color: var(--article-dim, #c4b5fd);
        }
        .article-content p {
          margin-bottom: 16px;
          color: var(--article-text, #f0e6ff);
        }
        .article-content a {
          color: var(--article-secondary, #a78bfa);
          text-decoration: underline;
        }
        .article-content code {
          background-color: rgba(255, 255, 255, 0.06);
          color: var(--article-accent, #f472b6);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.82em;
          font-family: inherit;
        }
        .article-content pre {
          background-color: #0d0d0d;
          border-radius: 8px;
          padding: 16px 20px;
          overflow-x: auto;
          margin-bottom: 20px;
          border: 1px solid #2d1f4e;
        }
        .article-content pre code {
          background: transparent;
          color: #f0e6ff;
          padding: 0;
          font-size: 0.82rem;
          font-family: inherit;
        }
        .article-content ul,
        .article-content ol {
          padding-left: 24px;
          margin-bottom: 16px;
        }
        .article-content li {
          margin-bottom: 6px;
          line-height: 1.7;
          color: var(--article-text, #f0e6ff);
        }
        .article-content blockquote {
          border-left: 3px solid var(--article-secondary, #a78bfa);
          padding-left: 16px;
          color: var(--article-dim, #c4b5fd);
          font-style: italic;
          margin: 16px 0;
        }
        .article-content strong {
          color: var(--article-primary, #ff6eb4);
          font-weight: 500;
        }
        .article-content hr {
          border: none;
          border-top: 1px solid #2d1f4e;
          margin: 24px 0;
        }
        .article-content img {
          max-width: 100%;
          border-radius: 6px;
          margin: 16px 0;
          display: block;
        }
        .article-content table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
          font-size: 0.85rem;
        }
        .article-content th {
          border-bottom: 1px solid #2d1f4e;
          padding: 8px 12px;
          color: var(--article-primary, #ff6eb4);
          text-align: left;
        }
        .article-content td {
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding: 8px 12px;
          color: var(--article-text, #f0e6ff);
        }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}