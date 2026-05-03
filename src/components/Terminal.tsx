"use client";

import PixelTitle from "@/components/PixelTitle";
import OutputRenderer from "@/components/OutputRenderer";
import { useTheme } from "@/contexts/ThemeContext";
import useTerminal from "@/hooks/useTerminal";
import { PORTFOLIO } from "@/lib/commands";

export default function Terminal() {
  const { theme } = useTheme();
  const { history, input, setInput, handleKeyDown, inputRef, bottomRef, focusInput } =
    useTerminal();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        backgroundColor: theme.colors.bg,
        color: theme.colors.text,
        fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
        fontSize: "0.875rem",
        cursor: "text",
        overflow: "hidden",
        transition: "background-color 0.35s ease, color 0.35s ease",
      }}
      onClick={focusInput}
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
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#ff5f57",
            }}
          />
          <span
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#febc2e",
            }}
          />
          <span
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#28c840",
            }}
          />
        </div>

        <div
          style={{
            color: theme.colors.textMuted,
            fontSize: "0.78rem",
            letterSpacing: "0.04em",
          }}
        >
          terminal - buddy@portfolio
        </div>

        <div
          style={{
            padding: "3px 12px",
            borderRadius: "20px",
            border: `1px solid ${theme.colors.badgeBorder}`,
            backgroundColor: theme.colors.badgeBg,
            color: theme.colors.badgeText,
            fontSize: "0.7rem",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginRight: "4px",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: theme.colors.badgeText,
            }}
          />
          <span>{theme.label}</span>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "24px 28px",
          display: "flex",
          flexDirection: "column",
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
  );
}
