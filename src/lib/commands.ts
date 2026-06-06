import aboutData from "@/data/about.json";
import skillsData from "@/data/skills.json";
import experienceData from "@/data/experience.json";
import projectsData from "@/data/projects.json";
import contactData from "@/data/contact.json";
import { OutputBlock, OutputLine, type Availability } from "@/types";

export const PORTFOLIO = {
  username: aboutData.username,
  hostname: aboutData.hostname,
  name: aboutData.name,
  title: aboutData.title,
  tagline: aboutData.tagline,
  resumeUrl: aboutData.resumeUrl,
};

export interface Command {
  name: string;
  description: string;
  aliases?: string[];
  execute: (args: string[]) => OutputBlock[];
}

function block(lines: Array<{ text: string; style?: OutputLine["style"] }>): OutputBlock {
  return { lines };
}

function hr(): { text: string; style: "muted" } {
  return { text: `  ${"─".repeat(50)}`, style: "muted" };
}

function empty(): { text: string } {
  return { text: "" };
}

function boxTop(title: string): { text: string; style: "muted" } {
  const pad = 44 - title.length;
  return { text: `  ╭─ ${title} ${"─".repeat(Math.max(pad, 2))}╮`, style: "muted" };
}

function boxBot(): { text: string; style: "muted" } {
  return { text: `  ╰${"─".repeat(50)}╯`, style: "muted" };
}

export const COMMANDS: Record<string, Command> = {
  help: {
    name: "help",
    description: "List all available commands",
    execute: () => [
      block([
        boxTop("COMMANDS"),
        empty(),
        { text: "  about        →  Who am I", style: "default" },
        { text: "  skills       →  My technical toolkit", style: "default" },
        { text: "  experience   →  Work history", style: "default" },
        { text: "  projects     →  Things I've built", style: "default" },
        { text: "  contact      →  Get in touch", style: "default" },
        { text: "  resume       →  Download my CV", style: "default" },
        { text: "  hire         →  My availability status", style: "default" },
        { text: "  theme        →  Switch color theme", style: "default" },
        { text: "  clear        →  Clear the terminal", style: "default" },
        { text: "  whoami       →  Quick intro", style: "default" },
        empty(),
        { text: "  Tip: Tab autocompletes · ↑↓ navigates history", style: "muted" },
        empty(),
        boxBot(),
      ]),
    ],
  },
  about: {
    name: "about",
    description: "About me",
    execute: () => [
      block([
        boxTop("ABOUT ME"),
        empty(),
        ...aboutData.lines.map((line) =>
          line === "" ? empty() : { text: `  ${line}`, style: "default" as const }
        ),
        empty(),
        boxBot(),
      ]),
    ],
  },
  skills: {
    name: "skills",
    description: "My technical skills",
    execute: () => {
      const lines: Array<{ text: string; style?: OutputLine["style"] }> = [
        boxTop("SKILLS"),
        empty(),
      ];
      for (const category of skillsData.categories) {
        lines.push({ text: `  ▸ ${category.name}`, style: "secondary" });
        lines.push({ text: `    ${category.items.join("  ·  ")}`, style: "dim" });
        lines.push(empty());
      }
      lines.push(boxBot());
      return [block(lines)];
    },
  },
  experience: {
    name: "experience",
    description: "Work experience",
    aliases: ["exp", "work"],
    execute: () => {
      const lines: Array<{ text: string; style?: OutputLine["style"] }> = [
        boxTop("EXPERIENCE"),
        empty(),
      ];
      experienceData.jobs.forEach((job, i) => {
        lines.push({ text: `  ${job.role}`, style: "primary" });
        lines.push({
          text: `  ${job.company}  ·  ${job.period}  ·  ${job.location}`,
          style: "dim",
        });
        lines.push(empty());
        job.highlights.forEach((h) => {
          lines.push({ text: `  ✓  ${h}`, style: "secondary" });
        });
        if (i < experienceData.jobs.length - 1) {
          lines.push(empty());
          lines.push(hr());
          lines.push(empty());
        }
      });
      lines.push(empty());
      lines.push(boxBot());
      return [block(lines)];
    },
  },
  projects: {
    name: "projects",
    description: "My projects",
    aliases: ["portfolio"],
    execute: () => {
      const lines: Array<{ text: string; style?: OutputLine["style"] }> = [
        boxTop("PROJECTS"),
        empty(),
      ];
      projectsData.items.forEach((p) => {
        const badge = p.status === "live" ? "badge-live" : "badge-beta";
        lines.push({ text: `  ${p.name}`, style: "primary" });
        lines.push({ text: `  [${p.status.toUpperCase()}]`, style: badge });
        lines.push({ text: `  ${p.description}`, style: "default" });
        lines.push({ text: `  Stack: ${p.tech.join(" · ")}`, style: "dim" });
        lines.push({ text: `  ${p.url}`, style: "url" });
        lines.push(empty());
      });
      lines.push(boxBot());
      return [block(lines)];
    },
  },
  contact: {
    name: "contact",
    description: "Contact information",
    execute: () => [
      block([
        boxTop("CONTACT"),
        empty(),
        { text: `  ✉  Email     ${contactData.email}`, style: "secondary" },
        { text: `  ⌥  GitHub    ${contactData.github}`, style: "secondary" },
        { text: `  ⊞  LinkedIn  ${contactData.linkedin}`, style: "secondary" },
        { text: `  ◈  Twitter   ${contactData.twitter}`, style: "secondary" },
        empty(),
        {
          text: "  Always open to new opportunities and cool projects.",
          style: "muted",
        },
        empty(),
        boxBot(),
      ]),
    ],
  },
  resume: {
    name: "resume",
    description: "Download / view resume",
    aliases: ["cv"],
    execute: () => [
      block([
        boxTop("RESUME"),
        empty(),
        { text: "  Opening resume in a new tab...", style: "secondary" },
        empty(),
        { text: `  URL: ${aboutData.resumeUrl}`, style: "url" },
        empty(),
        boxBot(),
      ]),
    ],
  },
  hire: {
    name: "hire",
    description: "My availability and what I am looking for",
    aliases: ["available"],
    execute: () => {
      const a = aboutData.availability as Availability;
      const isOpen = a.status === "open";

      return [
        block([
          boxTop("AVAILABILITY"),
          empty(),
          {
            text: `  Status: ${a.statusText}`,
            style: isOpen ? "success" : "error",
          },
          empty(),
          { text: "  Looking for:", style: "secondary" },
          ...a.type.map((t) => ({
            text: `    ·  ${t}`,
            style: "default" as const,
          })),
          empty(),
          { text: "  Preferred roles:", style: "secondary" },
          ...a.preferredRoles.map((r) => ({
            text: `    ·  ${r}`,
            style: "default" as const,
          })),
          empty(),
          {
            text: `  Stack:  ${a.preferredStack.join("  ·  ")}`,
            style: "dim" as const,
          },
          empty(),
          { text: `  Location:  ${a.location}`, style: "dim" as const },
          { text: `  Notice:    ${a.notice}`, style: "dim" as const },
          empty(),
          { text: "  Reach out:", style: "secondary" },
          { text: `    ${a.email}`, style: "url" as const },
          empty(),
          boxBot(),
        ]),
      ];
    },
  },
  whoami: {
    name: "whoami",
    description: "Quick intro",
    execute: () => [
      block([
        { text: `  ${aboutData.name}`, style: "primary" },
        { text: `  ${aboutData.title}`, style: "secondary" },
        { text: `  ${aboutData.tagline}`, style: "dim" },
      ]),
    ],
  },
  theme: {
    name: "theme",
    description: "Switch color theme — usage: theme <name>",
    execute: () => [
      block([
        boxTop("THEMES"),
        empty(),
        { text: "  Usage: theme <name>", style: "default" },
        empty(),
        { text: "  pink    →  Pink/Purple  (default)", style: "secondary" },
        { text: "  green   →  Hacker Green", style: "secondary" },
        { text: "  cyan    →  Cyberpunk Cyan", style: "secondary" },
        { text: "  amber   →  Retro Amber", style: "secondary" },
        { text: "  red     →  Blood Red", style: "secondary" },
        { text: "  white   →  Minimal Light", style: "secondary" },
        empty(),
        {
          text: "  Tip: click the theme badge in the title bar to switch visually",
          style: "muted",
        },
        empty(),
        boxBot(),
      ]),
    ],
  },
  clear: {
    name: "clear",
    description: "Clear the terminal",
    execute: () => [],
  },
  banner: {
    name: "banner",
    description: "Show the title banner",
    execute: () => [],
  },
};

export const ALL_COMMAND_NAMES: string[] = Object.keys(COMMANDS);
