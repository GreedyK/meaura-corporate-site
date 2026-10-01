import type { Metadata } from "next";
import { Noto_Sans_JP, Outfit } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://meaura.jp"),
  title: {
    default: "MeAURA株式会社｜自分をアップデートし、未来を輝かせる。",
    template: "%s｜MeAURA株式会社",
  },
  description:
    "MeAURAは、自分を知り、新しい可能性に気づく体験を通して、一人ひとりが自分らしく輝ける未来をつくります。",
  openGraph: {
    title: "MeAURA株式会社",
    description: "自分をアップデートし、未来を輝かせる。",
    type: "website",
    locale: "ja_JP",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ja"
      data-scroll-behavior="smooth"
      className={`${notoSansJP.variable} ${outfit.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          本文へスキップ
        </a>
        {children}
      </body>
    </html>
  );
}
