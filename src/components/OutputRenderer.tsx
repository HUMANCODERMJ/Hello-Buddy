"use client";

import type { CSSProperties, ReactNode } from "react";
import type { OutputBlock, OutputLine } from "@/types";
import type { Theme } from "@/lib/themes";

const FADE_KEYFRAMES = `
@keyframes terminal-output-fade-in {
  from {
    opacity: 0;
    transform: translateY(3px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

interface Props {
  blocks: OutputBlock[];
  theme: Theme;
}

function lineColor(style: OutputLine["style"] | undefined, theme: Theme): string {
  switch (style) {
    case "primary":
      return theme.colors.primary;
    case "secondary":
      return theme.colors.secondary;
    case "muted":
      return theme.colors.textMuted;
    case "dim":
      return theme.colors.textDim;
    case "error":
      return "#ff4444";
    case "success":
      return theme.colors.badgeText;
    case "url":
      return theme.colors.textDim;
    case "badge-live":
    case "badge-beta":
      return theme.colors.text;
    case "default":
    default:
      return theme.colors.text;
  }
}

const badgeLiveSpanStyle = (theme: Theme): CSSProperties => ({
  backgroundColor: theme.colors.badgeBg,
  border: `1px solid ${theme.colors.badgeBorder}`,
  color: theme.colors.badgeText,
  fontSize: "0.72em",
  padding: "1px 6px",
  borderRadius: "3px",
  marginLeft: "6px",
});

const badgeBetaSpanStyle: CSSProperties = {
  backgroundColor: "rgba(255, 179, 0, 0.1)",
  border: "1px solid #ffb300",
  color: "#ffb300",
  fontSize: "0.72em",
  padding: "1px 6px",
  borderRadius: "3px",
  marginLeft: "6px",
};

function LiveBadgeSpan({
  children,
  theme,
}: {
  children: ReactNode;
  theme: Theme;
}) {
  return <span style={badgeLiveSpanStyle(theme)}>{children}</span>;
}

function BetaBadgeSpan({ children }: { children: ReactNode }) {
  return <span style={badgeBetaSpanStyle}>{children}</span>;
}

/** Split text and wrap [LIVE]/[live] and [BETA]/[beta] segments for inline badges on non-badge-only lines */
function renderWithInlineBadges(
  text: string,
  baseColor: string,
  theme: Theme,
  underline?: boolean
): ReactNode {
  const parts = text.split(/(\[LIVE\]|\[live\]|\[BETA\]|\[beta\])/gi);
  return parts.map((part, i) => {
    const upper = part.toUpperCase();
    if (upper === "[LIVE]") {
      return (
        <LiveBadgeSpan key={i} theme={theme}>
          {part}
        </LiveBadgeSpan>
      );
    }
    if (upper === "[BETA]") {
      return <BetaBadgeSpan key={i}>{part}</BetaBadgeSpan>;
    }
    return (
      <span
        key={i}
        style={{
          color: baseColor,
          textDecorationLine: underline ? "underline" : undefined,
        }}
      >
        {part}
      </span>
    );
  });
}

/** Match standalone word "live" as badge (case-insensitive), preserving spacing */
function renderWithLiveWordBadges(
  text: string,
  baseColor: string,
  theme: Theme,
  underline?: boolean
): ReactNode {
  const segments = text.split(/(\blive\b)/gi);
  return segments.map((seg, i) => {
    if (/^live$/i.test(seg)) {
      return (
        <LiveBadgeSpan key={i} theme={theme}>
          {seg}
        </LiveBadgeSpan>
      );
    }
    return renderWithInlineBadges(seg, baseColor, theme, underline);
  });
}

function OutputLineRow({
  line,
  theme,
}: {
  line: OutputLine;
  theme: Theme;
}) {
  if (line.text === "") {
    return <div style={{ height: "0.6rem" }} />;
  }

  const baseStyle = line.style;

  if (baseStyle === "badge-live") {
    return (
      <div style={{ whiteSpace: "pre", fontFamily: "inherit", lineHeight: "1.7" }}>
        <LiveBadgeSpan theme={theme}>{line.text}</LiveBadgeSpan>
      </div>
    );
  }

  if (baseStyle === "badge-beta") {
    return (
      <div style={{ whiteSpace: "pre", fontFamily: "inherit", lineHeight: "1.7" }}>
        <BetaBadgeSpan>{line.text}</BetaBadgeSpan>
      </div>
    );
  }

  const color = lineColor(baseStyle, theme);
  const isUrl = baseStyle === "url";

  const needsBadgeSplit = /\[LIVE\]|\[live\]|\[BETA\]|\[beta\]|\blive\b/i.test(
    line.text
  );

  return (
    <div
      style={{
        whiteSpace: "pre",
        fontFamily: "inherit",
        lineHeight: "1.7",
        color: needsBadgeSplit ? undefined : color,
        textDecorationLine: needsBadgeSplit ? undefined : isUrl ? "underline" : undefined,
      }}
    >
      {needsBadgeSplit ? (
        renderWithLiveWordBadges(line.text, color, theme, isUrl)
      ) : (
        line.text
      )}
    </div>
  );
}

export default function OutputRenderer({ blocks, theme }: Props) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: FADE_KEYFRAMES }} />
      {blocks.map((blockItem, blockIndex) => (
        <div
          key={`block-${blockIndex}`}
          style={{
            animation: "terminal-output-fade-in 120ms ease-out forwards",
            opacity: 0,
          }}
        >
          {blockItem.lines.map((line, lineIndex) => (
            <OutputLineRow
              key={`${blockIndex}-${lineIndex}-${line.text.slice(0, 16)}`}
              line={line}
              theme={theme}
            />
          ))}
        </div>
      ))}
    </>
  );
}
