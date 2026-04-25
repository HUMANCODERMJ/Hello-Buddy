import { OutputBlock } from "@/types";

export interface Command {
  name: string;
  description: string;
  aliases?: string[];
  execute: (args: string[]) => OutputBlock[];
}

export const COMMANDS: Record<string, Command> = {
  help: {
    name: "help",
    description: "List available commands",
    execute: () => [
      { lines: [{ text: "  commands coming in phase 5", style: "muted" }] },
    ],
  },
  clear: {
    name: "clear",
    description: "Clear terminal",
    execute: () => [],
  },
};

export const ALL_COMMAND_NAMES: string[] = Object.keys(COMMANDS);
