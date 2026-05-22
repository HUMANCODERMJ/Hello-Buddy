import { getAllPosts } from "@/lib/blog";
import Terminal from "@/components/Terminal";

export default function Page() {
  const posts = getAllPosts();

  return <Terminal posts={posts} />;
}
