import fs from "fs";
import path from "path";
import type { NewsPost } from "./types";

const postsDir = path.join(process.cwd(), "content/news/posts");

function loadNewsPosts(): NewsPost[] {
  const files = fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".json"))
    .sort();

  return files
    .map((file) => {
      const slug = path.basename(file, ".json");
      const raw = fs.readFileSync(path.join(postsDir, file), "utf-8");
      const post = JSON.parse(raw) as Omit<NewsPost, "slug">;
      return { ...post, slug };
    })
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export const newsPosts = loadNewsPosts();

export function getNewsPost(slug: string) {
  return newsPosts.find((post) => post.slug === slug);
}

export type { NewsCategory, NewsPost, NewsSection } from "./types";
