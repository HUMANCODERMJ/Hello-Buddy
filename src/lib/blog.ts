import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  content: string;
}

type BlogFrontmatter = {
  title?: string;
  date?: string;
  readTime?: string;
  excerpt?: string;
  coverImage?: string;
  tags?: string[];
};

function toBlogPost(slug: string, raw: string): BlogPost {
  const { data, content } = matter(raw);
  const frontmatter = data as BlogFrontmatter;

  return {
    slug,
    title: frontmatter.title ?? "Untitled",
    date: frontmatter.date ?? "",
    readTime: frontmatter.readTime ?? "5 min read",
    excerpt: frontmatter.excerpt ?? "",
    coverImage: frontmatter.coverImage ?? "",
    tags: frontmatter.tags ?? [],
    content,
  };
}

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(BLOG_DIR).filter((fileName) => fileName.endsWith(".md"));

  return files
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf-8");
      return toBlogPost(slug, raw);
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf-8");
    return toBlogPost(slug, raw);
  } catch {
    return null;
  }
}
