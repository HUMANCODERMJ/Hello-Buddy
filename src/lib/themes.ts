export type ThemeName = "pink" | "green" | "cyan" | "amber" | "red" | "white";

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
  green: {
    name: "green",
    label: "Hacker Green",
    description: "Classic terminal green — old school cool",
    colors: {
      bg: "#030a03",
      bgSecondary: "#060f06",
      primary: "#00ff41",
      secondary: "#00cc33",
      accent: "#39ff14",
      text: "#ccffcc",
      textDim: "#88dd88",
      textMuted: "#2a5a2a",
      border: "#0d3b0d",
      cursor: "#00ff41",
      prompt: "#00cc33",
      titleGradientFrom: "#00ff41",
      titleGradientMid: "#00cc33",
      titleGradientTo: "#009922",
      badgeBg: "rgba(0,255,65,0.1)",
      badgeBorder: "#00ff41",
      badgeText: "#00ff41",
      selectionBg: "rgba(0,255,65,0.15)",
    },
  },
  cyan: {
    name: "cyan",
    label: "Cyberpunk Cyan",
    description: "Neon blue-cyan on deep navy — blade runner nights",
    colors: {
      bg: "#020818",
      bgSecondary: "#040d22",
      primary: "#00d4ff",
      secondary: "#0080ff",
      accent: "#00ffff",
      text: "#cce8ff",
      textDim: "#7ab8d8",
      textMuted: "#1a3a5c",
      border: "#0a2a4a",
      cursor: "#00d4ff",
      prompt: "#0080ff",
      titleGradientFrom: "#00ffff",
      titleGradientMid: "#00d4ff",
      titleGradientTo: "#0080ff",
      badgeBg: "rgba(0,212,255,0.1)",
      badgeBorder: "#00d4ff",
      badgeText: "#00d4ff",
      selectionBg: "rgba(0,212,255,0.15)",
    },
  },
  amber: {
    name: "amber",
    label: "Retro Amber",
    description: "Warm amber phosphor glow — vintage terminal warmth",
    colors: {
      bg: "#0c0800",
      bgSecondary: "#130e00",
      primary: "#ffb300",
      secondary: "#ff8c00",
      accent: "#ffd700",
      text: "#fff3cc",
      textDim: "#ddb060",
      textMuted: "#5a3e00",
      border: "#2a1f00",
      cursor: "#ffb300",
      prompt: "#ff8c00",
      titleGradientFrom: "#ffd700",
      titleGradientMid: "#ffb300",
      titleGradientTo: "#ff8c00",
      badgeBg: "rgba(255,179,0,0.1)",
      badgeBorder: "#ffb300",
      badgeText: "#ffb300",
      selectionBg: "rgba(255,179,0,0.15)",
    },
  },
  red: {
    name: "red",
    label: "Blood Red",
    description: "Deep crimson on black — danger mode activated",
    colors: {
      bg: "#0d0000",
      bgSecondary: "#150000",
      primary: "#ff2244",
      secondary: "#cc0022",
      accent: "#ff6680",
      text: "#ffd0d8",
      textDim: "#dd8899",
      textMuted: "#4a1020",
      border: "#2d0010",
      cursor: "#ff2244",
      prompt: "#cc0022",
      titleGradientFrom: "#ff6680",
      titleGradientMid: "#ff2244",
      titleGradientTo: "#cc0022",
      badgeBg: "rgba(255,34,68,0.1)",
      badgeBorder: "#ff2244",
      badgeText: "#ff6680",
      selectionBg: "rgba(255,34,68,0.15)",
    },
  },
  white: {
    name: "white",
    label: "Minimal Light",
    description: "Clean white terminal — for the minimalists",
    colors: {
      bg: "#f8f8f8",
      bgSecondary: "#f0f0f0",
      primary: "#1a1a2e",
      secondary: "#4a4a6a",
      accent: "#6b6b9b",
      text: "#1a1a2e",
      textDim: "#4a4a6a",
      textMuted: "#9a9ab0",
      border: "#d8d8e8",
      cursor: "#1a1a2e",
      prompt: "#4a4a6a",
      titleGradientFrom: "#1a1a2e",
      titleGradientMid: "#4a4a6a",
      titleGradientTo: "#6b6b9b",
      badgeBg: "rgba(26,26,46,0.08)",
      badgeBorder: "#1a1a2e",
      badgeText: "#1a1a2e",
      selectionBg: "rgba(26,26,46,0.1)",
    },
  },
};

export const DEFAULT_THEME: ThemeName = "pink";
