import type { Metadata } from "next";
import Image from "next/image";
import { ContactBanner, PageHero, SectionHeading } from "@/components/ui";
import { company, messageCopy } from "@/content/site";

export const metadata: Metadata = {
  title: "会社概要",
  description: "MeAURA株式会社の代表挨拶と会社情報をご紹介します。",
};

const rows = [
  ["会社名", company.name],
  ["所在地", `${company.postalCode}\n${company.address}`],
  ["設立", company.established],
  ["代表取締役", company.representative],
  ["資本金", company.capital],
  ["事業内容", company.business.join("\n")],
];

export default function CompanyPage() {
  return (
    <>
      <PageHero en="COMPANY" title="会社概要" />
      <section className="message-section">
        <SectionHeading en="MESSAGE">代表挨拶</SectionHeading>
        <div className="message-grid">
          <div className="message-portrait">
            <Image src="/images/portrait.png" alt="代表取締役 池田智恵" width={880} height={1080} priority />
          </div>
          <div className="message-copy">
            <h2>{messageCopy.title}</h2>
            {messageCopy.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
            <div className="signature">
              <span>{messageCopy.role}</span>
              <strong>{messageCopy.name}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="company-profile">
        <SectionHeading en="PROFILE">会社情報</SectionHeading>
        <dl>
          {rows.map(([term, value]) => (
            <div key={term}><dt>{term}</dt><dd>{value.split("\n").map((line) => <span key={line}>{line}</span>)}</dd></div>
          ))}
        </dl>
      </section>
      <ContactBanner />
    </>
  );
}
