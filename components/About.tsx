import { about, facts } from "@/lib/content";
import { publicFileExists } from "@/lib/assets";
import { SplitHeading } from "./ui/SplitHeading";
import { ScrubText } from "./ui/ScrubText";
import { Reveal } from "./ui/Reveal";
import { Portrait } from "./ui/Portrait";
import { Counter } from "./ui/Counter";

export function About() {
  const hasPhoto = publicFileExists("edwin.jpg");
  return (
    <section id="about" aria-label="About" className="section">
      <div className="wrap">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SplitHeading text={about.heading} />
            <div className="mt-8 flex max-w-[600px] flex-col gap-5 text-[16px] text-muted">
              <ScrubText text={about.paragraphs[0]} />
              {about.paragraphs.slice(1).map((p) => (
                <Reveal key={p}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="mx-auto w-full max-w-[480px] lg:ml-auto">
            <Portrait src={hasPhoto ? "/edwin.jpg" : undefined} alt={about.portraitAlt} />
          </div>
        </div>

        <ul className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {facts.map((f, i) => (
            <li key={f.caption} className="contents">
              <Reveal delay={(i % 3) * 0.08} className="h-full">
                <div className="card flex h-full flex-col justify-between gap-3 p-6">
                  <p className="display text-[44px] md:text-[56px]">
                    {typeof f.value === "number" ? <Counter value={f.value} /> : f.value}
                  </p>
                  <p className="text-[14px] text-muted">{f.caption}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
