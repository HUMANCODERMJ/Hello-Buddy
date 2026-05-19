"use client";

import type { Theme } from "@/lib/themes";

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

export interface ToCProps {
  headings: TocHeading[];
  activeId: string;
  theme: Theme;
  isOpen: boolean;
  onToggle: () => void;
}

export function extractHeadings(markdown: string) {
  const lines = markdown.split("\n");
  const results: { id: string; text: string; level: number }[] = [];

  for (const line of lines) {
    const match = line.match(/^(#{1,3})\s+(.+)/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      results.push({ id, text, level });
    }
  }

  return results;
}

export default function TableOfContents({
  headings,
  activeId,
  theme,
  isOpen,
  onToggle,
}: ToCProps) {
  return (
    <div
      style={{
        position: "relative",
        flexShrink: 0,
        height: "100%",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          position: "absolute",
          top: "16px",
          left: isOpen ? "198px" : "8px",
          zIndex: 5,
          background: theme.colors.bgSecondary,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: "4px",
          color: theme.colors.textMuted,
          cursor: "pointer",
          padding: "3px 7px",
          fontSize: "0.7rem",
          transition: "left 0.25s ease",
          fontFamily: "inherit",
        }}
      >
        {isOpen ? "‹" : "›"}
      </button>

      <div
        style={{
          width: isOpen ? "210px" : "0px",
          minWidth: isOpen ? "210px" : "0px",
          overflow: "hidden",
          transition: "width 0.25s ease, min-width 0.25s ease",
          borderRight: isOpen ? `1px solid ${theme.colors.border}` : "none",
          flexShrink: 0,
          height: "100%",
          overflowY: "auto",
          padding: isOpen ? "20px 14px" : "0",
        }}
      >
        <div
          style={{
            fontSize: "0.68rem",
            color: theme.colors.textMuted,
            letterSpacing: "0.08em",
            marginBottom: "12px",
          }}
        >
          CONTENTS
        </div>

        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            style={{
              display: "block",
              fontSize: "0.74rem",
              color: activeId === heading.id ? theme.colors.primary : theme.colors.textMuted,
              paddingTop: "5px",
              paddingBottom: "5px",
              textDecoration: "none",
              borderLeft:
                activeId === heading.id
                  ? `2px solid ${theme.colors.primary}`
                  : "2px solid transparent",
              paddingLeft: `${(heading.level - 1) * 10 + 8}px`,
              transition: "color 0.15s ease",
              lineHeight: "1.4",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => {
              if (activeId !== heading.id) {
                e.currentTarget.style.color = theme.colors.textDim;
              }
            }}
            onMouseLeave={(e) => {
              if (activeId !== heading.id) {
                e.currentTarget.style.color = theme.colors.textMuted;
              }
            }}
          >
            {heading.text}
          </a>
        ))}
      </div>
    </div>
  );
}
