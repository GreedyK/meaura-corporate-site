import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="MeAURA ホーム">
      <Image src="/images/logo.png" alt="" width={955} height={146} priority />
    </Link>
  );
}
