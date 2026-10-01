"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/content/site";
import { Logo } from "./logo";

function isNavCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <header className={open ? "site-header menu-is-open" : "site-header"}>
      <button
        className={open ? "nav-backdrop is-visible" : "nav-backdrop"}
        type="button"
        aria-label="メニューを閉じる"
        tabIndex={open ? 0 : -1}
        onClick={() => setOpen(false)}
      />
      <div className="header-inner">
        <Logo />
        <button
          className={open ? "menu-button is-open" : "menu-button"}
          type="button"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
        <nav className={open ? "global-nav is-open" : "global-nav"} aria-label="メインナビゲーション">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isNavCurrent(pathname, item.href) ? "is-current" : ""}
              onClick={() => setOpen(false)}
            >
              <small>{item.en}</small>
              {item.label}
            </Link>
          ))}
          <Link className="header-contact" href="/contact" onClick={() => setOpen(false)}>
            お問い合わせ
            <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
