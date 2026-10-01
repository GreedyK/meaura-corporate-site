import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { company } from "@/content/site";

export const metadata: Metadata = { title: "プライバシーポリシー" };

const clauses = [
  ["1. 収集される個人情報", "当社は、お名前、連絡先情報（電話番号、メールアドレスなど）、会社名・役職・所属部署などの職業関連情報、ウェブサイトの利用履歴・Cookie・IPアドレスなどのオンライン情報を取得する場合があります。"],
  ["2. 個人情報の利用目的", "お預かりした個人情報は、お問い合わせや要望への対応、サービスの提供や契約の履行、ウェブサイトの改善、法的要件や規制の遵守のために利用します。"],
  ["3. 個人情報の第三者への提供", "当社は、法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供しません。"],
  ["4. 個人情報の保護とセキュリティ", "当社は、個人情報への不正アクセス、紛失、破損、改ざん、漏えいを防止するため、合理的かつ適切な安全管理措置を講じます。"],
  ["5. Cookieの使用", "当社のウェブサイトでは、トラフィック解析、利用状況の測定、体験の改善のためCookieを使用する場合があります。ブラウザの設定によりCookieを拒否できますが、一部の機能が制限される場合があります。"],
  ["6. 個人情報の保持期間", "当社は、利用目的を達成するために必要な期間だけ個人情報を保持し、不要となった場合には適切に破棄または匿名化します。"],
  ["7. プライバシーポリシーの変更", "当社は必要に応じて本ポリシーを変更することがあります。変更した場合は、本ウェブサイト上でお知らせします。"],
  ["8. お問い合わせ", `ご不明な点や個人情報に関するお問い合わせは、下記までお気軽にご連絡ください。\n${company.name}\n${company.postalCode} ${company.address}\nMail：${company.email}`],
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero en="PRIVACY POLICY" title="プライバシーポリシー" />
      <article className="privacy-page">
        <p className="privacy-lead">MeAURA株式会社（以下「当社」）は、お客様の個人情報を適切に取り扱い、保護することが重要であると認識しています。本ポリシーは、当社が取得した個人情報の収集、利用、保護に関する方針を定めるものです。</p>
        {clauses.map(([heading, body]) => (
          <section key={heading}>
            <h2>{heading}</h2>
            {body.split("\n").map((line) => (
              <p key={line}>{line}</p>
            ))}
          </section>
        ))}
      </article>
    </>
  );
}
