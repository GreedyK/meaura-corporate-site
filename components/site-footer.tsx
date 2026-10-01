import Link from "next/link";
import { company, navigation } from "@/content/site";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-glow" />
      <div className="footer-inner">
        <div className="footer-brand">
          <Logo />
          <p>
            {company.postalCode}
            <br />
            {company.address}
          </p>
          <a href={`mailto:${company.email}`}>{company.email}</a>
        </div>
        <nav className="footer-nav" aria-label="フッターナビゲーション">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/contact">お問い合わせ</Link>
          <Link href="/privacy">プライバシーポリシー</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>{company.copyright}</span>
        <span>UPDATE YOURSELF, ILLUMINATE THE FUTURE.</span>
      </div>
    </footer>
  );
}
