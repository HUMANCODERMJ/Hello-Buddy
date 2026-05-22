"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ViewMode = "terminal" | "blog-grid" | "blog-article";

export interface ViewContextValue {
  viewMode: ViewMode;
  activeSlug: string | null;
  openBlogGrid: () => void;
  openBlogArticle: (slug: string) => void;
  exitToTerminal: () => void;
  exitToBlogGrid: () => void;
}

const ViewContext = createContext<ViewContextValue | null>(null);

export function ViewProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>("terminal");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const value = useMemo(
    () => ({
      viewMode,
      activeSlug,
      openBlogGrid: () => {
        setViewMode("blog-grid");
        setActiveSlug(null);
      },
      openBlogArticle: (slug: string) => {
        setViewMode("blog-article");
        setActiveSlug(slug);
      },
      exitToTerminal: () => {
        setViewMode("terminal");
        setActiveSlug(null);
      },
      exitToBlogGrid: () => {
        setViewMode("blog-grid");
        setActiveSlug(null);
      },
    }),
    [viewMode, activeSlug]
  );

  return (
    <ViewContext.Provider value={value}>{children}</ViewContext.Provider>
  );
}

export function useView(): ViewContextValue {
  const ctx = useContext(ViewContext);
  if (!ctx) {
    throw new Error("useView must be used inside ViewProvider");
  }
  return ctx;
}
