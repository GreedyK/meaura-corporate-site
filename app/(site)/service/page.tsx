import type { Metadata } from "next";
import Image from "next/image";
import { StoreButtons } from "@/components/store-buttons";
import { Aurora, ContactBanner, SectionLabel, Sparkles } from "@/components/ui";
import { serviceCopy } from "@/content/site";

function ServiceTitle({ title }: { title: string }) {
  const [lead, ...rest] = title.split("、");
  if (rest.length === 0) return <>{title}</>;

  return (
    <>
      {lead}、<br />
      {rest.join("、")}
    </>
  );
}

export const metadata: Metadata = {
  title: "事業内容",
  description: "じぶんメーカーと、開発・AIサービスについてご紹介します。",
};

export default function ServicePage() {
  const { pageTitle, jibunMaker, development } = serviceCopy;

  return (
    <>
      <section className="service-page-jibun">
        <Aurora compact />
        <Sparkles />
        <div className="service-page-jibun-inner">
          <SectionLabel en={pageTitle.en} as="h1" bordered>
            {pageTitle.ja}
          </SectionLabel>

          <div className="service-page-block">
            <div className="service-page-copy">
              <span className="number">{jibunMaker.number}</span>
              <h2 className="service-gradient-title">{jibunMaker.name}</h2>
              <div className="jibun-badge">
                <Image
                  src={jibunMaker.badge.icon}
                  alt=""
                  width={48}
                  height={48}
                  aria-hidden="true"
                />
                <span>{jibunMaker.badge.label}</span>
              </div>
              <h3 className="service-catch">
                <ServiceTitle title={jibunMaker.title} />
              </h3>
              <p className="lead">{jibunMaker.lead}</p>
              <StoreButtons />
            </div>

            <div className="phone-stage service-phone-tilt">
              <Image
                src="/images/jibun-maker.png"
                alt="じぶんメーカーのスマートフォン画面"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="development-service">
        <div className="development-service-inner">
          <div className="development-copy">
            <p className="development-eyebrow">{development.eyebrow}</p>
            <h2>{development.heading}</h2>
            <h3 className="service-catch">
              <ServiceTitle title={development.title} />
            </h3>
            <p>{development.description}</p>
          </div>

          <div className="laptop-stage">
            <Image
              src={development.image}
              alt="開発・AIサービスのイメージ"
              width={920}
              height={580}
            />
          </div>
        </div>
      </section>

      <ContactBanner />
    </>
  );
}
