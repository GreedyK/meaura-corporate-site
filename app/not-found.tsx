import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="not-found">
          <div className="bubble bubble-one" />
          <div className="bubble bubble-two" />
          <div className="bubble bubble-three" />
          <p>PAGE NOT FOUND</p>
          <h1>404</h1>
          <h2>お探しのページは見つかりません。</h2>
          <span>アクセスしようとしたページは、削除されたかURLが変更された可能性があります。</span>
          <Link href="/">TOPページへ戻る <i>→</i></Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
