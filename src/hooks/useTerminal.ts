"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { HistoryEntry, OutputBlock } from "@/types";
import { useTheme } from "@/contexts/ThemeContext";
import { useView } from "@/contexts/ViewContext";
import { ALL_COMMAND_NAMES, COMMANDS } from "@/lib/commands";
import { PORTFOLIO } from "@/lib/commands";

function makeId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export default function useTerminal() {
  const { theme } = useTheme();
  const { viewMode, openBlogGrid, exitToTerminal, exitToBlogGrid } = useView();

  const [history, setHistory] = useState<HistoryEntry[]>([
    { id: "init-banner", kind: "banner" },
    { id: "init-welcome", kind: "welcome" },
  ]);
  const [input, setInput] = useState<string>("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  function scrollToBottom(): void {
    setTimeout(
      () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
      40
    );
  }

  const focusInput = useCallback(() => inputRef.current?.focus(), []);

  function pushOutput(blocks: OutputBlock[]) {
    setHistory((prev) => [...prev, { id: makeId(), kind: "output", blocks }]);
    scrollToBottom();
  }

  function resetInput() {
    setInput("");
    setHistoryIdx(-1);
    scrollToBottom();
  }

  function findByAlias(name: string) {
    return Object.values(COMMANDS).find((c) => c.aliases?.includes(name)) ?? null;
  }

  const executeCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;

      const parts = trimmed.toLowerCase().split(/\s+/);
      const cmdName = parts[0];
      const args = parts.slice(1);

      if (cmdName === "blog") {
        openBlogGrid();
        resetInput();
        return;
      }

      setHistory((prev) => [...prev, { id: makeId(), kind: "input", text: trimmed }]);

      if (cmdName === "clear") {
        setHistory([{ id: makeId(), kind: "banner" }]);
        resetInput();
        return;
      }

      if (cmdName === "theme" && args.length > 0) {
        const blocks: OutputBlock[] = [
          {
            lines: [
              { text: "  Theme switching coming soon!", style: "secondary" },
              { text: `  Currently running: ${theme.name}`, style: "muted" },
            ],
          },
        ];
        pushOutput(blocks);
        setCmdHistory((prev) => [trimmed, ...prev]);
        resetInput();
        return;
      }

      if (cmdName === "resume" || cmdName === "cv") {
        window.open(PORTFOLIO.resumeUrl, "_blank", "noopener,noreferrer");
      }

      let blocks: OutputBlock[];
      const cmd = COMMANDS[cmdName] ?? findByAlias(cmdName);

      if (cmd) {
        blocks = cmd.execute(args);
      } else {
        blocks = [
          {
            lines: [
              { text: `  command not found: ${cmdName}`, style: "error" },
              { text: '  type "help" to see available commands', style: "muted" },
            ],
          },
        ];
      }

      pushOutput(blocks);
      setCmdHistory((prev) => [trimmed, ...prev]);
      resetInput();
    },
    [theme.name]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        if (viewMode === "blog-article") {
          exitToBlogGrid();
        } else if (viewMode === "blog-grid") {
          exitToTerminal();
        }
        return;
      }

      if (e.key === "Enter") {
        executeCommand(input);
        return;
      }

      if (e.key === "Tab") {
        e.preventDefault();
        if (!input.trim()) return;
        const lower = input.toLowerCase();
        const matches = ALL_COMMAND_NAMES.filter((c) => c.startsWith(lower));
        if (matches.length === 1) {
          setInput(matches[0]);
        } else if (matches.length > 1) {
          pushOutput([{ lines: [{ text: `  ${matches.join("   ")}`, style: "muted" }] }]);
          scrollToBottom();
        }
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        const next = Math.min(historyIdx + 1, cmdHistory.length - 1);
        setHistoryIdx(next);
        setInput(cmdHistory[next] ?? "");
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = Math.max(historyIdx - 1, -1);
        setHistoryIdx(next);
        setInput(next === -1 ? "" : cmdHistory[next]);
        return;
      }

      if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
        setHistory([{ id: makeId(), kind: "banner" }]);
        setInput("");
        setHistoryIdx(-1);
        return;
      }

      if (e.key === "c" && e.ctrlKey) {
        e.preventDefault();
        setHistory((prev) => [
          ...prev,
          { id: makeId(), kind: "input", text: `${input}^C` },
        ]);
        setInput("");
        setHistoryIdx(-1);
        scrollToBottom();
        return;
      }
    },
    [input, historyIdx, cmdHistory, executeCommand, viewMode, exitToTerminal, exitToBlogGrid]
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return {
    history,
    input,
    setInput,
    handleKeyDown,
    inputRef,
    bottomRef,
    focusInput,
  };
}
