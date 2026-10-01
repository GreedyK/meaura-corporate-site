"use client";

import { useEffect, useState } from "react";
import type { NewsPost } from "@/content/news";

const filters = ["ALL", "お知らせ", "プロジェクト", "コラム"] as const;

function NewsCardBody({ post }: { post: NewsPost }) {
  return (
    <div className="news-card-body" id={`${post.slug}-body`}>
      {post.sections.map((section) => (
        <section key={section.heading}>
          <h3>{section.heading}</h3>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.points && (
            <ul>
              {section.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}

export function NewsList({ posts }: { posts: NewsPost[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("ALL");
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const visiblePosts =
    filter === "ALL" ? posts : posts.filter((post) => post.category === filter);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash || !posts.some((post) => post.slug === hash)) return;

    setExpandedSlug(hash);
    requestAnimationFrame(() => {
      const instant =
        window.matchMedia("(max-width: 900px)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById(hash)?.scrollIntoView({
        behavior: instant ? "auto" : "smooth",
        block: "start",
      });
    });
  }, [posts]);

  function togglePost(slug: string) {
    setExpandedSlug((current) => (current === slug ? null : slug));
  }

  return (
    <>
      <div className="news-filter" aria-label="記事カテゴリー">
        {filters.map((item) => (
          <button
            type="button"
            key={item}
            className={filter === item ? "active" : ""}
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="news-cards" aria-live="polite">
        {visiblePosts.map((post) => {
          const artIndex = posts.findIndex((item) => item.slug === post.slug) + 1;
          const expanded = expandedSlug === post.slug;

          return (
            <article
              id={post.slug}
              key={post.slug}
              className={`news-card${expanded ? " expanded" : ""}`}
            >
              <div className="news-card-main">
                <div className={`news-art art-${artIndex}`}>
                  <span>{post.category}</span>
                  <i />
                </div>
                <button
                  type="button"
                  className="news-card-copy"
                  aria-expanded={expanded}
                  aria-controls={`${post.slug}-body`}
                  onClick={() => togglePost(post.slug)}
                >
                  <div>
                    <time dateTime={post.date.replace(/\./g, "-")}>{post.date}</time>
                    <span>{post.category}</span>
                  </div>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <i aria-hidden="true">{expanded ? "−" : "+"}</i>
                </button>
              </div>
              {expanded && <NewsCardBody post={post} />}
            </article>
          );
        })}
      </div>
    </>
  );
}
