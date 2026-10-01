import Link from "next/link";
import { useId, type ReactNode } from "react";
import { contactCopy } from "@/content/site";

type SectionLabelProps = {
  en: string;
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  bordered?: boolean;
};

export function SectionLabel({
  en,
  children,
  as: Tag = "h2",
  bordered = false,
}: SectionLabelProps) {
  return (
    <div className={bordered ? "section-label section-label--bordered" : "section-label"}>
      <p className="section-label-en">{en}</p>
      <Tag className="section-label-ja">{children}</Tag>
    </div>
  );
}

export function Aurora({ compact = false }: { compact?: boolean }) {
  const filterId = `aurora-wave-${useId().replace(/:/g, "")}`;

  return (
    <div className={compact ? "aurora aurora-compact" : "aurora"} aria-hidden="true">
      <svg className="aurora-filters" width="0" height="0" focusable="false">
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.0035 0.01"
            numOctaves="2"
            seed="3"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="50s"
              values="0.0035 0.01;0.007 0.016;0.0035 0.01"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="20"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      <span className="aurora-wash" />
      <span className="light-halo" />
      <span className="light-bubble" />
      <span className="light-aura">
        <span className="light-aura-wave" style={{ filter: `url(#${filterId})` }} />
      </span>
    </div>
  );
}

export function Sparkles() {
  return (
    <div className="sparkles" aria-hidden="true">
      {Array.from({ length: 14 }, (_, index) => (
        <i key={index} style={{ "--i": index } as React.CSSProperties} />
      ))}
    </div>
  );
}

export function SectionHeading({
  en,
  children,
}: {
  en: string;
  children: ReactNode;
}) {
  return (
    <SectionLabel en={en} as="h2">
      {children}
    </SectionLabel>
  );
}

export function ArrowLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <Link className={light ? "arrow-link light" : "arrow-link"} href={href}>
      <span>{children}</span>
      <i aria-hidden="true">↗</i>
    </Link>
  );
}

export function PageHero({ en, title }: { en: string; title: string }) {
  return (
    <section className="page-hero">
      <Aurora compact />
      <Sparkles />
      <div className="page-hero-inner">
        <SectionLabel en={en} as="h1" bordered>
          {title}
        </SectionLabel>
      </div>
    </section>
  );
}

export function ContactBanner() {
  return (
    <section className="contact-banner">
      <Aurora compact />
      <div>
        <p className="eyebrow">CONTACT</p>
        <h2>お問い合わせ</h2>
        {contactCopy.paragraphs.map((text) => (
          <p className="contact-banner-lead" key={text}>
            {text}
          </p>
        ))}
      </div>
      <ArrowLink href="/contact" light>
        {contactCopy.cta}
      </ArrowLink>
    </section>
  );
}
