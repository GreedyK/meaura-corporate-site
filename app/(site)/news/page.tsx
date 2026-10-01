import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { NewsList } from "@/components/news-list";
import { newsPosts } from "@/content/news";

export const metadata: Metadata = {
  title: "お知らせ",
  description: "MeAURA株式会社からのお知らせとコラムをご覧いただけます。",
};

export default function NewsPage() {
  return (
    <>
      <PageHero en="NEWS" title="お知らせ・ブログ" />
      <section className="news-page">
        <NewsList posts={newsPosts} />
      </section>
    </>
  );
}
