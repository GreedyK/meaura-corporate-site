import Image from "next/image";
import Link from "next/link";
import { newsPosts } from "@/content/news";
import { heroCopy, visionCopy } from "@/content/site";
import { AboutOrbit } from "@/components/about-orbit";
import { StoreButtons } from "@/components/store-buttons";
import { ArrowLink, Aurora, ContactBanner, SectionHeading, Sparkles } from "@/components/ui";

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <Aurora />
        <Sparkles />
        <div className="hero-copy">
          <p className="hero-kicker">UPDATE YOURSELF</p>
          <h1>{heroCopy.title[0]}<br /><em>{heroCopy.title[1]}</em></h1>
          <p className="hero-description">
            MeAURAは、自分を知り、新しい可能性に気づく体験を通して、<br className="desktop-only" />
            一人ひとりが自分らしく輝ける未来をつくります。
          </p>
        </div>
        <div className="hero-visual">
          <div className="portrait-halo" />
          <Image src="/images/portrait-hero.svg" alt="光を見上げる女性" width={740} height={1024} priority />
          <p><span>ME</span><span>AURA</span></p>
        </div>
        <a href="#about" className="scroll-cue" aria-label="私たちについてへスクロール"><span>SCROLL</span><i /></a>
      </section>

      <section className="about-section" id="about">
        <div className="orb orb-one" />
        <SectionHeading en="ABOUT">私たちについて</SectionHeading>
        <div className="about-grid">
          <div className="about-content">
            <h3>一人一人の可能性が<br />未来をつくる。</h3>
            <div className="about-copy">
              {visionCopy.paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
              <ArrowLink href="/company">会社について見る</ArrowLink>
            </div>
          </div>
          <div className="about-visual">
            <AboutOrbit />
          </div>
        </div>
      </section>

      <section className="service-preview">
        <Aurora compact />
        <div className="service-preview-inner">
          <SectionHeading en="SERVICE">事業内容</SectionHeading>
          <div className="service-grid">
            <div className="phone-stage">
              <Image src="/images/jibun-maker.png" alt="じぶんメーカーのスマートフォン画面" width={500} height={500} />
            </div>
            <div className="service-copy">
              <span className="number">01</span>
              <p className="eyebrow">じぶんメーカー</p>
              <h3>AIがあなたらしさを分析し、<br />“もう一人のじぶん”をつくる。</h3>
              <p>性格・価値観・好みをもとに、あなただけの「分身」を生成。分身同士がつながる新しいSNSや、ファッション・コスメ・ライフスタイルなど、一人ひとりに合った「似合う」や「好き」を提案します。</p>
              <StoreButtons />
              <ArrowLink href="/service">詳細をもっと見る</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <section className="news-preview">
        <div className="news-heading-row"><SectionHeading en="NEWS">お知らせ</SectionHeading><ArrowLink href="/news">一覧を見る</ArrowLink></div>
        <div className="news-list">
          {newsPosts.slice(0, 3).map((post, index) => (
            <Link href={`/news#${post.slug}`} className="news-row" key={post.slug}>
              <span className="news-index">0{index + 1}</span><time>{post.date}</time><strong>{post.title}</strong><i aria-hidden="true">→</i>
            </Link>
          ))}
        </div>
      </section>
      <ContactBanner />
    </>
  );
}
