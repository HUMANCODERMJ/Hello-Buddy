"use client";

import ThemeSwitcher from "@/components/ThemeSwitcher";
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
          gap: "14px",
          alignItems: "flex-start",
          border: `1px solid ${theme.colors.border}`,
          backgroundColor: theme.colors.bgSecondary,
          borderRadius: "12px",
          padding: "20px",
          width: "100%",
          maxWidth: "560px",
        }}
      >
        <h1
          style={{
            margin: 0,
            color: theme.colors.primary,
            fontSize: "22px",
            letterSpacing: "0.02em",
          }}
        >
          Active Theme: {themeName}
        </h1>
        <p style={{ margin: 0, color: theme.colors.textDim, fontSize: "13px" }}>
          Theme system test view (temporary for Phase 2).
        </p>
        <ThemeSwitcher />
      </div>
    </main>
  );
}
