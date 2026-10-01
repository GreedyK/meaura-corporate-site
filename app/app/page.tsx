import type { Metadata } from "next";
import Image from "next/image";
import { serviceCopy } from "@/content/site";

export const metadata: Metadata = {
  title: "じぶんメーカーのダウンロード",
  description:
    "じぶんメーカーを、お使いの端末に合わせて App Store または Google Play からダウンロードできます。",
};

export default function AppDownloadPage() {
  const { downloads } = serviceCopy.jibunMaker;

  return (
    <main id="main" className="dl-page">
      <div className="dl-sheet">
        <Image
          className="dl-logo"
          src="/images/logo.png"
          alt="MeAURA"
          width={955}
          height={146}
          priority
        />
        <h1>じぶんメーカー</h1>
        <p className="dl-lead">じぶんの分身生成アプリ</p>
        <p className="dl-copy">
          あなたの中にある、
          <br />
          もうひとりのじぶんに出会える。
        </p>

        <div className="dl-phone">
          <div className="dl-phone-glow" aria-hidden="true" />
          <div className="dl-phone-screen">
            <Image src="/images/logo-mark.png" alt="" width={258} height={146} />
            <p>
              じぶんを、
              <br />
              もっと自由に。
            </p>
          </div>
          <Image
            className="dl-phone-frame"
            src="/images/smartphone-frame.png"
            alt=""
            fill
            priority
            sizes="460px"
          />
        </div>

        <p className="dl-note">
          ご利用の端末に合わせて、
          <br />
          下のストアからダウンロードしてください。
        </p>

        <p className="dl-platforms">
          <span>iPhone / Android 対応</span>
        </p>

        <div className="dl-stores">
          <a href={downloads.appStore} target="_blank" rel="noopener noreferrer">
            <AppleMark />
            <span>
              <strong>App Store</strong>
              でダウンロード
            </span>
          </a>
          <a href={downloads.googlePlay} target="_blank" rel="noopener noreferrer">
            <PlayMark />
            <span>
              <strong>Google Play</strong>
              でダウンロード
            </span>
          </a>
        </div>

        <ul className="dl-points">
          <li>
            <PersonIcon />
            じぶんを知る
          </li>
          <li>
            <SparkIcon />
            新しい可能性
          </li>
          <li>
            <HeartIcon />
            もっと自分らしく
          </li>
        </ul>

        <p className="dl-sign">MeAURA</p>
      </div>
      <Wave />
    </main>
  );
}

function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.37 12.55c-.03-2.35 1.92-3.48 2.01-3.53-1.1-1.6-2.8-1.82-3.4-1.84-1.45-.15-2.83.85-3.57.85-.74 0-1.88-.83-3.09-.81-1.59.03-3.06.93-3.88 2.35-1.65 2.87-.42 7.11 1.19 9.44.79 1.14 1.73 2.42 2.96 2.37 1.19-.05 1.64-.77 3.08-.77s1.84.77 3.1.74c1.28-.02 2.09-1.16 2.87-2.31.9-1.32 1.28-2.6 1.3-2.67-.03-.01-2.49-.96-2.52-3.82zM14.54 6.1c.65-.79 1.09-1.89.97-2.98-.94.04-2.08.63-2.75 1.42-.6.7-1.13 1.82-.99 2.89 1.05.08 2.12-.53 2.77-1.33z"
      />
    </svg>
  );
}

function PlayMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#ea4335" d="M3.2 2.4c-.2.3-.3.7-.3 1.2v16.8c0 .5.1.9.3 1.2l.1.1 9.4-9.4v-.2L3.3 2.3l-.1.1z" />
      <path fill="#fbbc04" d="M15.8 15.1 12.7 12 3.2 21.6c.5.5 1.2.6 2 .1l10.6-6.6z" />
      <path fill="#4285f4" d="M19.7 10.6 15.8 8.3 12.5 11.6l3.3 3.3 3.9-2.3c1.1-.6 1.1-1.7 0-2z" />
      <path fill="#34a853" d="M3.2 2.4 12.5 11.6 15.8 8.3 5.2 1.7c-.8-.5-1.5-.4-2 .7z" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="11" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8.2 24.2c1.3-3.4 4-5.2 7.8-5.2s6.5 1.8 7.8 5.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M16 5.5 17.6 12.2 24.5 14 17.6 15.8 16 22.5 14.4 15.8 7.5 14 14.4 12.2 16 5.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M24 18.5 24.7 21.1 27.4 21.8 24.7 22.5 24 25.1 23.3 22.5 20.6 21.8 23.3 21.1 24 18.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M16 24.2s-7.2-4.4-7.2-9.2a3.9 3.9 0 0 1 7.2-1.8 3.9 3.9 0 0 1 7.2 1.8c0 4.8-7.2 9.2-7.2 9.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Wave() {
  return (
    <svg className="dl-wave" viewBox="0 0 430 140" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="dl-wave-a" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#bef3fe" stopOpacity="0.85" />
          <stop offset="0.5" stopColor="#c4b3fe" stopOpacity="0.75" />
          <stop offset="1" stopColor="#f1b0fe" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="dl-wave-b" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#f1b0fe" stopOpacity="0.45" />
          <stop offset="1" stopColor="#bef3fe" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <path
        fill="url(#dl-wave-b)"
        d="M0 78c52-28 92 8 150-2 48-8 70-34 126-28 42 4 78 22 154 6v86H0V78Z"
      />
      <path
        fill="url(#dl-wave-a)"
        d="M0 98c48-22 96 6 156-6 50-10 72-28 122-18 40 8 86 16 152-8v74H0V98Z"
      />
    </svg>
  );
}
