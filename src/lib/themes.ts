export type ThemeName = "pink";

export interface ThemeColors {
  bg: string;
  bgSecondary: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  textDim: string;
  textMuted: string;
  border: string;
  cursor: string;
  prompt: string;
  titleGradientFrom: string;
  titleGradientMid: string;
  titleGradientTo: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  selectionBg: string;
}

export interface Theme {
  name: ThemeName;
  label: string;
  description: string;
  colors: ThemeColors;
}

export const THEMES: Record<ThemeName, Theme> = {
  pink: {
    name: "pink",
    label: "Pink/Purple",
    description: "Dreamy pink-to-purple — the default vibe",
    colors: {
      bg: "#0d0d14",
      bgSecondary: "#12121e",
      primary: "#ff6eb4",
      secondary: "#a78bfa",
      accent: "#f472b6",
      text: "#f0e6ff",
      textDim: "#c4b5fd",
      textMuted: "#6b5e8a",
      border: "#2d1f4e",
      cursor: "#ff6eb4",
      prompt: "#a78bfa",
      titleGradientFrom: "#ff6eb4",
      titleGradientMid: "#c084fc",
      titleGradientTo: "#818cf8",
      badgeBg: "rgba(34,197,94,0.12)",
      badgeBorder: "#22c55e",
      badgeText: "#4ade80",
      selectionBg: "rgba(167,139,250,0.2)",
    },
  },
};

export const DEFAULT_THEME: ThemeName = "pink";
