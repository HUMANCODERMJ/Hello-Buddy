"use client";

import PixelTitle from "@/components/PixelTitle";
import { useTheme } from "@/contexts/ThemeContext";

export default function Home() {
  const { themeName, theme } = useTheme();

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
      </div>
    </main>
  );
}
