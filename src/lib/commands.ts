import { OutputBlock, OutputLine } from "@/types";

export const PORTFOLIO = {
  username: "buddy",
  hostname: "portfolio",
  name: "Hi Buddy",
  title: "Full Stack Developer & AI Enthusiast",
  tagline: "I build things that live on the internet ✨",

  about: [
    "Hey there! 👋 I'm a full-stack developer who loves crafting",
    "beautiful, performant web experiences.",
    "",
    "I geek out over clean code, great design, and the intersection",
    "of AI with everyday applications.",
    "",
    "Currently open to exciting opportunities and collaborations.",
    'Type "contact" to reach out — let\'s build something amazing!',
  ],

  skills: {
    Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    Backend: ["Node.js", "Python", "FastAPI", "Express.js", "GraphQL"],
    Database: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Supabase"],
    "AI / ML": ["LangChain", "OpenAI API", "Claude API", "HuggingFace"],
    DevOps: ["Docker", "GitHub Actions", "Vercel", "AWS", "Linux"],
    Tools: ["Git", "VS Code", "Figma", "Postman"],
  },

  experience: [
    {
      role: "Senior Full Stack Developer",
      company: "TechCorp India",
      period: "2023 – Present",
      location: "Bangalore, India",
      highlights: [
        "Led development of a real-time analytics dashboard (50K+ users)",
        "Reduced API response times by 60% via caching & query optimization",
        "Mentored 4 junior developers and established code review culture",
      ],
    },
    {
      role: "Full Stack Developer",
      company: "StartupXYZ",
      period: "2021 – 2023",
      location: "Remote",
      highlights: [
        "Built an AI-powered recommendation engine using Python & LangChain",
        "Architected microservices handling 1M+ daily requests",
        "Shipped 12+ features end-to-end from design to deployment",
      ],
    },
    {
      role: "Frontend Developer Intern",
      company: "DigitalAgency",
      period: "2020 – 2021",
      location: "Delhi, India",
      highlights: [
        "Developed responsive UIs for 5 client projects using React",
        "Improved page load performance by 40% across client sites",
      ],
    },
  ],

  projects: [
    {
      name: "NeuralChat",
      description:
        "AI-powered chat platform with real-time translation & sentiment analysis",
      tech: ["Next.js", "OpenAI", "WebSockets", "Redis"],
      status: "live" as const,
      url: "github.com/buddy/neuralchat",
    },
    {
      name: "CodeCanvas",
      description: "Collaborative code editor with AI-assisted pair programming",
      tech: ["React", "Monaco Editor", "Node.js", "Claude API"],
      status: "live" as const,
      url: "github.com/buddy/codecanvas",
    },
    {
      name: "PixelForge",
      description: "Generative art tool powered by diffusion models & WebGL",
      tech: ["Three.js", "Stable Diffusion", "FastAPI", "WebGL"],
      status: "beta" as const,
      url: "github.com/buddy/pixelforge",
    },
    {
      name: "TaskFlow",
      description: "Minimalist task manager with natural language processing",
      tech: ["Next.js", "Prisma", "PostgreSQL", "NLP"],
      status: "live" as const,
      url: "github.com/buddy/taskflow",
    },
  ],

  contact: {
    email: "hello@hibuddy.dev",
    github: "github.com/buddy",
    linkedin: "linkedin.com/in/hibuddy",
    twitter: "@hibuddy_dev",
  },

  resumeUrl: "https://hibuddy.dev/resume.pdf",
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
        { text: "  theme        →  Switch color theme (coming soon)", style: "default" },
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
        ...PORTFOLIO.about.map((line) =>
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
      for (const [category, items] of Object.entries(PORTFOLIO.skills)) {
        lines.push({ text: `  ▸ ${category}`, style: "secondary" });
        lines.push({ text: `    ${items.join("  ·  ")}`, style: "dim" });
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
      PORTFOLIO.experience.forEach((job, i) => {
        lines.push({ text: `  ${job.role}`, style: "primary" });
        lines.push({
          text: `  ${job.company}  ·  ${job.period}  ·  ${job.location}`,
          style: "dim",
        });
        lines.push(empty());
        job.highlights.forEach((h) => {
          lines.push({ text: `  ✓  ${h}`, style: "secondary" });
        });
        if (i < PORTFOLIO.experience.length - 1) {
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
      PORTFOLIO.projects.forEach((p) => {
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
        { text: `  ✉  Email     ${PORTFOLIO.contact.email}`, style: "secondary" },
        { text: `  ⌥  GitHub    ${PORTFOLIO.contact.github}`, style: "secondary" },
        { text: `  ⊞  LinkedIn  ${PORTFOLIO.contact.linkedin}`, style: "secondary" },
        { text: `  ◈  Twitter   ${PORTFOLIO.contact.twitter}`, style: "secondary" },
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
        { text: `  URL: ${PORTFOLIO.resumeUrl}`, style: "url" },
        empty(),
        boxBot(),
      ]),
    ],
  },
  whoami: {
    name: "whoami",
    description: "Quick intro",
    execute: () => [
      block([
        { text: `  ${PORTFOLIO.name}`, style: "primary" },
        { text: `  ${PORTFOLIO.title}`, style: "secondary" },
        { text: `  ${PORTFOLIO.tagline}`, style: "dim" },
      ]),
    ],
  },
  theme: {
    name: "theme",
    description: "Switch color theme",
    execute: () => [
      block([
        boxTop("THEMES"),
        empty(),
        { text: "  Usage: theme <name>", style: "default" },
        empty(),
        { text: "  pink    →  Pink/Purple  (active)", style: "secondary" },
        { text: "  green   →  Hacker Green          (coming soon)", style: "muted" },
        { text: "  cyan    →  Cyberpunk Cyan         (coming soon)", style: "muted" },
        { text: "  amber   →  Retro Amber            (coming soon)", style: "muted" },
        { text: "  red     →  Blood Red              (coming soon)", style: "muted" },
        { text: "  white   →  Minimal Light          (coming soon)", style: "muted" },
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
