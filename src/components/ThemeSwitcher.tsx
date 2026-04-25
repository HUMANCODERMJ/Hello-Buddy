"use client";

import { THEMES } from "@/lib/themes";
import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeSwitcher() {
  const { themeName, setTheme, theme } = useTheme();
  const allThemes = Object.values(THEMES);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        flexWrap: "wrap",
      }}
    >
      {allThemes.map((themeOption) => {
        const isActive = themeName === themeOption.name;

        return (
          <button
            key={themeOption.name}
            onClick={() => setTheme(themeOption.name)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 10px",
              borderRadius: "999px",
              border: `1px solid ${
                isActive ? theme.colors.primary : theme.colors.border
              }`,
              backgroundColor: isActive ? theme.colors.bgSecondary : "transparent",
              color: isActive ? theme.colors.primary : theme.colors.textMuted,
              opacity: isActive ? 1 : 0.55,
              cursor: "pointer",
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: "12px",
              transition: "all 0.2s ease",
            }}
            aria-pressed={isActive}
            aria-label={`Switch to ${themeOption.label} theme`}
          >
            <span
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: themeOption.colors.primary,
                border: `1px solid ${themeOption.colors.border}`,
                display: "inline-block",
              }}
            />
            <span>{themeOption.label}</span>
          </button>
        );
      })}
    </div>
  );
}
