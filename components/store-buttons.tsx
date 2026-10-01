import Image from "next/image";
import { serviceCopy } from "@/content/site";

const { downloads, storeBadges } = serviceCopy.jibunMaker;

export function StoreButtons() {
  return (
    <div className="store-buttons" aria-label="アプリのダウンロード">
      <a href={downloads.appStore} target="_blank" rel="noopener noreferrer">
        <Image
          src={storeBadges.appStore}
          alt="App Storeからダウンロード"
          width={135}
          height={40}
        />
      </a>
      <a href={downloads.googlePlay} target="_blank" rel="noopener noreferrer">
        <Image
          src={storeBadges.googlePlay}
          alt="Google Playで手に入れよう"
          width={564}
          height={168}
        />
      </a>
    </div>
  );
}
