"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_THEME, THEMES, type Theme, type ThemeName } from "@/lib/themes";

interface ThemeContextValue {
  themeName: ThemeName;
  theme: Theme;
  setTheme: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function isThemeName(value: string): value is ThemeName {
  return Object.keys(THEMES).includes(value);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>(DEFAULT_THEME);

  useEffect(() => {
    const storedTheme = localStorage.getItem("portfolio-theme");
    if (storedTheme && isThemeName(storedTheme)) {
      setThemeName(storedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("portfolio-theme", themeName);
  }, [themeName]);

  const theme = THEMES[themeName];

  const value = useMemo(
    () => ({
      themeName,
      theme,
      setTheme: setThemeName,
    }),
    [themeName, theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return ctx;
}
