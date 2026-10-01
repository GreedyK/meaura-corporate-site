export type NewsCategory = "お知らせ" | "プロジェクト" | "コラム";

export type NewsSection = {
  heading: string;
  paragraphs: string[];
  points?: string[];
};

export type NewsPost = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  category: NewsCategory;
  sections: NewsSection[];
};
