import Image from "next/image";

const orbitLabels = [
  { text: "自分を知る", start: "75%" },
  { text: "つながる", start: "0%" },
  { text: "可能性が広がる", start: "25%" },
  { text: "未来を選ぶ", start: "50%" },
] as const;

export function AboutOrbit() {
  return (
    <div
      className="about-orbit"
      aria-label="自分を知る・つながる・可能性が広がる・未来を選ぶ"
    >
      <svg className="about-orbit-ring" viewBox="0 0 420 420" aria-hidden="true">
        <ellipse cx="210" cy="210" rx="178" ry="128" />
      </svg>
      <div className="about-orbit-core-stage" aria-hidden="true">
        <Image
          className="about-orbit-core"
          src="/images/light_bubble.png"
          alt=""
          width={1672}
          height={941}
        />
      </div>
      <div className="about-orbit-labels" aria-hidden="true">
        {orbitLabels.map(({ text, start }) => (
          <span
            className="about-orbit-pill"
            key={text}
            style={{ "--orbit-start": start } as React.CSSProperties}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
