"use client";

import { useEffect, useState } from "react";
import PixelTitle from "@/components/PixelTitle";
import OutputRenderer from "@/components/OutputRenderer";
import { useTheme } from "@/contexts/ThemeContext";
import { useView } from "@/contexts/ViewContext";
import useTerminal from "@/hooks/useTerminal";
import { PORTFOLIO } from "@/lib/commands";

const SOCIAL_LINKS = {
  github: "https://github.com/buddy",
  twitter: "https://x.com/hibuddy_dev",
  linkedin: "https://linkedin.com/in/hibuddy",
};

export default function Terminal() {
  const { theme } = useTheme();
  const { viewMode } = useView();
  const { history, input, setInput, handleKeyDown, inputRef, bottomRef, focusInput } =
    useTerminal();
  const [time, setTime] = useState("");

  useEffect(() => {
    function updateTime() {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      });
      setTime(`${timeStr} (GMT+5:30) Patiala, India`);
    }

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "var(--app-vh)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "transparent",
      }}
      onClick={focusInput}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1180px",
          height: "calc(var(--app-vh) - 48px)",
          display: "flex",
          flexDirection: "column",
          backgroundColor: theme.colors.bg,
          border: `1px solid var(--accent-soft)`,
          borderRadius: "var(--radius)",
          overflow: "hidden",
          transition: "background-color 0.35s ease",
          position: "relative",
        }}
      >
        <div
          style={{
            height: "40px",
            backgroundColor: theme.colors.bgSecondary,
            borderBottom: `1px solid ${theme.colors.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
            position: "sticky",
            top: 0,
            zIndex: 10,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              color: theme.colors.badgeText,
              fontSize: "0.72rem",
              fontFamily: "inherit",
              letterSpacing: "0.02em",
              userSelect: "none",
            }}
          >
            {time}
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                color: theme.colors.textMuted,
                fontSize: "0.78rem",
                letterSpacing: "0.04em",
              }}
            >
              terminal
            </span>
            <div
              style={{
                padding: "2px 10px",
                borderRadius: "20px",
                border: `1px solid ${theme.colors.badgeBorder}`,
                backgroundColor: theme.colors.badgeBg,
                color: theme.colors.badgeText,
                fontSize: "0.68rem",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: theme.colors.badgeText,
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              {theme.label}
            </div>
          </div>

          <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: theme.colors.textMuted,
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                transition: "color 0.2s ease",
                padding: "4px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.colors.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = theme.colors.textMuted;
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>

            <a
              href={SOCIAL_LINKS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: theme.colors.textMuted,
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                transition: "color 0.2s ease",
                padding: "4px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.colors.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = theme.colors.textMuted;
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: theme.colors.textMuted,
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                transition: "color 0.2s ease",
                padding: "4px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.colors.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = theme.colors.textMuted;
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>

        {viewMode === "terminal" && (
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "24px 28px",
              display: "flex",
              flexDirection: "column",
              color: theme.colors.text,
              fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
              fontSize: "0.875rem",
              cursor: "text",
              transition: "color 0.35s ease",
            }}
            onClick={focusInput}
          >
            {history.map((entry) => {
              if (entry.kind === "banner") {
                return (
                  <div key={entry.id} style={{ marginBottom: "20px" }}>
                    <PixelTitle theme={theme} />
                    <div
                      style={{
                        color: theme.colors.text,
                        fontSize: "0.9rem",
                        marginTop: "6px",
                      }}
                    >
                      {PORTFOLIO.title}
                    </div>
                    <div style={{ color: theme.colors.textMuted, fontSize: "0.8rem" }}>
                      {PORTFOLIO.tagline}
                    </div>
                  </div>
                );
              }

              if (entry.kind === "welcome") {
                return (
                  <div key={entry.id} style={{ marginBottom: "16px" }}>
                    <div style={{ color: theme.colors.textDim, fontSize: "0.85rem" }}>
                      Welcome. Type "help" to see available commands.
                    </div>
                    <div
                      style={{
                        color: theme.colors.textMuted,
                        fontSize: "0.78rem",
                        marginTop: "4px",
                      }}
                    >
                      Use Tab to autocomplete · ↑↓ to navigate history
                    </div>
                  </div>
                );
              }

              if (entry.kind === "input") {
                return (
                  <div
                    key={entry.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginTop: "4px",
                    }}
                  >
                    <span
                      style={{
                        color: theme.colors.prompt,
                        userSelect: "none",
                        flexShrink: 0,
                      }}
                    >
                      {PORTFOLIO.username}@{PORTFOLIO.hostname}
                    </span>
                    <span style={{ color: theme.colors.textMuted, userSelect: "none" }}>›</span>
                    <span style={{ color: theme.colors.text }}>{entry.text}</span>
                  </div>
                );
              }

              return (
                <div key={entry.id} style={{ marginTop: "2px", marginBottom: "10px" }}>
                  <OutputRenderer blocks={entry.blocks} theme={theme} />
                </div>
              );
            })}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "8px",
                paddingBottom: "16px",
              }}
            >
              <span
                style={{
                  color: theme.colors.prompt,
                  userSelect: "none",
                  flexShrink: 0,
                }}
              >
                {PORTFOLIO.username}@{PORTFOLIO.hostname}
              </span>
              <span style={{ color: theme.colors.textMuted, userSelect: "none" }}>›</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: theme.colors.text,
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  caretColor: theme.colors.cursor,
                  padding: 0,
                }}
              />
            </div>
            <div ref={bottomRef} />
          </div>
        )}

        {(viewMode === "blog-grid" || viewMode === "blog-article") && (
          <div
            style={{
              flex: 1,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "24px 28px",
                color: theme.colors.textMuted,
                fontFamily: "inherit",
              }}
            >
              {viewMode === "blog-grid" && <p>[ Blog grid coming in Phase C ]</p>}
              {viewMode === "blog-article" && <p>[ Blog article coming in Phase D ]</p>}
            </div>

            <div
              style={{
                height: "35px",
                flexShrink: 0,
                borderTop: `1px solid ${theme.colors.border}`,
                backgroundColor: theme.colors.bgSecondary,
                display: "flex",
                alignItems: "center",
                padding: "0 16px",
                gap: "12px",
              }}
            >
              <span
                style={{
                  color: theme.colors.prompt,
                  fontSize: "0.78rem",
                  fontFamily: "inherit",
                  userSelect: "none",
                }}
              >
                buddy@portfolio ›
              </span>
              <span
                style={{
                  color: theme.colors.textMuted,
                  fontSize: "0.72rem",
                  fontFamily: "inherit",
                }}
              >
                Press Esc to exit
              </span>
            </div>
          </div>
        )}

        {viewMode === "terminal" && (
          <div
            style={{
              height: "36px",
              backgroundColor: theme.colors.bgSecondary,
              borderTop: `1px solid ${theme.colors.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 16px",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              {[
                { key: "Tab", label: "complete" },
                { key: "↑↓", label: "history" },
                { key: "Ctrl+C", label: "cancel" },
                { key: "Ctrl+L", label: "clear" },
              ].map((hint) => (
                <div key={hint.key} style={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{
                      color: theme.colors.textDim,
                      border: `1px solid ${theme.colors.border}`,
                      borderRadius: "3px",
                      padding: "1px 5px",
                      fontSize: "0.68rem",
                      marginRight: "4px",
                    }}
                  >
                    {hint.key}
                  </span>
                  <span style={{ color: theme.colors.textMuted, fontSize: "0.68rem" }}>
                    {hint.label}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ color: theme.colors.textMuted, fontSize: "0.7rem" }}>
              /help for commands
            </div>
          </div>
        )}


        <div
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 999,
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.025) 2px, rgba(0,0,0,0.025) 4px)",
          }}
        />
      </div>
    </div>
  );
}