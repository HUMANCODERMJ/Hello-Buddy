// A single line of output — a string with optional semantic type
export interface OutputLine {
  text: string;
  style?:
    | "default"
    | "primary"
    | "secondary"
    | "muted"
    | "dim"
    | "error"
    | "success"
    | "url"
    | "badge-live"
    | "badge-beta";
}

// A rendered block of output from a command
export interface OutputBlock {
  lines: OutputLine[];
}

export interface Availability {
  status: "open" | "busy" | "not-looking";
  statusText: string;
  type: string[];
  notice: string;
  preferredRoles: string[];
  preferredStack: string[];
  location: string;
  email: string;
}

// One entry in the terminal's visible history
export type HistoryEntry =
  | { id: string; kind: "banner" }
  | { id: string; kind: "input"; text: string }
  | { id: string; kind: "output"; blocks: OutputBlock[] }
  | { id: string; kind: "welcome" };
