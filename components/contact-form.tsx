"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setSent(true);
    const instant = window.matchMedia("(max-width: 900px)").matches;
    window.scrollTo({ top: 0, behavior: instant ? "auto" : "smooth" });
  }

  if (sent) {
    return (
      <div className="form-complete" role="status">
        <span>THANK YOU</span>
        <h2>お問い合わせを受け付けました。</h2>
        <p>
          こちらはデモ送信です。現在、実際のメール送信機能は接続されていません。
        </p>
        <button type="button" className="submit-button" onClick={() => setSent(false)}>
          フォームに戻る
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <FormField label="お名前" id="name" required>
        <input id="name" name="name" type="text" required placeholder="山田 花子" />
      </FormField>
      <FormField label="メールアドレス" id="email" required>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="example@meaura.jp"
        />
      </FormField>
      <FormField label="会社名・組織名" id="company">
        <input id="company" name="company" type="text" placeholder="MeAURA株式会社" />
      </FormField>
      <FormField label="お問い合わせ種別" id="type" required>
        <select id="type" name="type" required defaultValue="">
          <option value="" disabled>
            選択してください
          </option>
          <option>じぶんメーカーについて</option>
          <option>開発・受託のご相談</option>
          <option>取材・協業について</option>
          <option>その他</option>
        </select>
      </FormField>
      <FormField label="お問い合わせ内容" id="message" required>
        <textarea id="message" name="message" required rows={7} placeholder="お問い合わせ内容をご記入ください。" />
      </FormField>
      <label className="privacy-check">
        <input type="checkbox" required />
        <span>
          <Link href="/privacy">プライバシーポリシー</Link>に同意する
        </span>
      </label>
      <button type="submit" className="submit-button">
        送信する（デモ）
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}

function FormField({
  label,
  id,
  required,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="form-row">
      <label htmlFor={id}>
        {label}
        <span>{required ? "必須" : "任意"}</span>
      </label>
      {children}
    </div>
  );
}
