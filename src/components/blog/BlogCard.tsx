"use client";

import { useState } from "react";
import type { BlogPost } from "@/lib/blog";
import type { Theme } from "@/lib/themes";

export interface BlogCardProps {
  post: BlogPost;
  theme: Theme;
  index: number;
  onClick: () => void;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";

  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function CalendarIcon({ color }: { color: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 2v3M17 2v3M3.5 9h17M5.5 5h13A2.5 2.5 0 0 1 21 7.5v11A2.5 2.5 0 0 1 18.5 21h-13A2.5 2.5 0 0 1 3 18.5v-11A2.5 2.5 0 0 1 5.5 5Z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon({ color }: { color: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BlogCard({ post, theme, index, onClick }: BlogCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: hovered ? theme.colors.bgSecondary : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? theme.colors.secondary : theme.colors.border}`,
        borderRadius: "8px",
        padding: "20px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        transition: "border-color 0.2s ease, background-color 0.2s ease",
        animationName: "cardFadeIn",
        animationDuration: "0.4s",
        animationTimingFunction: "ease",
        animationFillMode: "both",
        animationDelay: `${index * 60}ms`,
      }}
    >
      {post.coverImage ? (
        <img
          src={post.coverImage}
          alt={post.title}
          style={{
            width: "100%",
            height: "140px",
            objectFit: "cover",
            borderRadius: "6px",
            marginBottom: "4px",
          }}
        />
      ) : null}

      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <span style={{ fontSize: "0.72rem", color: theme.colors.textMuted, display: "flex", alignItems: "center", gap: "5px" }}>
          <CalendarIcon color={theme.colors.textMuted} />
          {formatDate(post.date)}
        </span>
        <span style={{ fontSize: "0.72rem", color: theme.colors.textMuted, display: "flex", alignItems: "center", gap: "5px" }}>
          <ClockIcon color={theme.colors.textMuted} />
          {post.readTime}
        </span>
      </div>

      <div
        style={{
          fontSize: "0.95rem",
          fontWeight: "500",
          color: hovered ? theme.colors.accent : theme.colors.text,
          lineHeight: "1.4",
          transition: "color 0.2s ease",
          fontFamily: "inherit",
        }}
      >
        {post.title}
      </div>

      <div
        style={{
          fontSize: "0.78rem",
          color: theme.colors.textDim,
          lineHeight: "1.6",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          fontFamily: "inherit",
        }}
      >
        {post.excerpt}
      </div>

      {post.tags.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "2px" }}>
          {post.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "0.65rem",
                padding: "2px 8px",
                borderRadius: "10px",
                border: `1px solid ${theme.colors.border}`,
                color: theme.colors.textMuted,
                display: "inline-block",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <div style={{ fontSize: "0.78rem", color: theme.colors.secondary, marginTop: "auto" }}>
        Read More →
      </div>
    </div>
  );
}
