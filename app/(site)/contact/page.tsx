import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/ui";
import { company } from "@/content/site";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "MeAURA株式会社へのお問い合わせはこちらから。",
};

export default function ContactPage() {
  return (
    <>
      <PageHero en="CONTACT" title="お問い合わせ" />
      <section className="contact-page">
        <div className="contact-intro">
          <p className="eyebrow">LET&apos;S TALK</p>
          <h2>新しい可能性について、<br />一緒にお話ししませんか。</h2>
          <p>サービスや開発のご相談、取材・協業など、お気軽にお問い合わせください。</p>
          <a href={`mailto:${company.email}`}>{company.email}</a>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
