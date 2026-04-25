"use client";

import PixelTitle from "@/components/PixelTitle";
import { useTheme } from "@/contexts/ThemeContext";
import useTerminal from "@/hooks/useTerminal";

export default function Home() {
  const { themeName, theme } = useTheme();
  const { history, input, setInput, handleKeyDown, inputRef, bottomRef } =
    useTerminal();

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: theme.colors.bg,
        color: theme.colors.text,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: '"JetBrains Mono", monospace',
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <PixelTitle theme={theme} />
        <h1
          style={{
            margin: 0,
            color: theme.colors.primary,
            fontSize: "20px",
            letterSpacing: "0.02em",
          }}
        >
          Active Theme: {themeName}
        </h1>
        <p style={{ margin: 0, color: theme.colors.textDim, fontSize: "13px" }}>
          {theme.description}
        </p>
        <div
          style={{
            width: "100%",
            maxWidth: "680px",
            border: `1px solid ${theme.colors.border}`,
            backgroundColor: theme.colors.bgSecondary,
            borderRadius: "10px",
            padding: "12px",
            textAlign: "left",
          }}
        >
          <div
            style={{
              minHeight: "120px",
              maxHeight: "220px",
              overflowY: "auto",
              marginBottom: "12px",
              fontSize: "13px",
              color: theme.colors.textDim,
              whiteSpace: "pre-wrap",
            }}
          >
            {history.map((entry) => {
              if (entry.kind === "input") {
                return <div key={entry.id}>$ {entry.text}</div>;
              }
              if (entry.kind === "output") {
                return (
                  <div key={entry.id}>
                    {entry.blocks.map((block, blockIdx) => (
                      <div key={`${entry.id}-${blockIdx}`}>
                        {block.lines.map((line, lineIdx) => (
                          <div key={`${entry.id}-${blockIdx}-${lineIdx}`}>
                            {line.text}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                );
              }
              if (entry.kind === "banner") {
                return (
                  <div key={entry.id} style={{ color: theme.colors.secondary }}>
                    --- banner ---
                  </div>
                );
              }
              return (
                <div key={entry.id} style={{ color: theme.colors.textMuted }}>
                  Welcome
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type a command..."
            style={{
              background: "transparent",
              border: "1px solid #2d1f4e",
              color: "#f0e6ff",
              fontFamily: "monospace",
              padding: "8px 12px",
              width: "400px",
              outline: "none",
            }}
          />
        </div>
      </div>
    </main>
  );
}
