"use client";
import { useRef } from "react";
import { m, useReducedMotion, useScroll, useSpring } from "motion/react";
import { experience } from "@/lib/content";
import { EASE_OUT, SPRING } from "@/lib/motion";
import { SplitHeading } from "./ui/SplitHeading";
import { ExplodedDocs } from "./ui/LineArt";

export function Experience() {
  const reduce = useReducedMotion();
  const secRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress: pass } = useScroll({ target: secRef, offset: ["start end", "end start"] });
  const { scrollYProgress: line } = useScroll({ target: lineRef, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(line, { stiffness: 120, damping: 30 });

  return (
    <section ref={secRef} id="experience" aria-label="Experience and training" className="section bg-raised">
      <div className="wrap">
        <SplitHeading text={experience.heading} className="mx-auto max-w-3xl text-center" />
        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div className="hidden lg:block">
            <div className="sticky top-28 mx-auto h-[420px] max-w-[300px]">
              <ExplodedDocs progress={reduce ? undefined : pass} />
            </div>
          </div>

          <ol ref={lineRef} className="relative ml-3 flex flex-col gap-10 border-l-0 pl-8">
            <span aria-hidden="true" className="absolute bottom-0 left-0 top-1 w-px bg-line" />
            <m.span
              aria-hidden="true"
              className="absolute bottom-0 left-0 top-1 w-px origin-top bg-ink"
              style={{ scaleY: reduce ? 1 : scaleY }}
            />
            {experience.items.map((it) => (
              <li key={it.title} className="relative">
                <m.span
                  aria-hidden="true"
                  className="absolute -left-[37px] top-[7px] h-[11px] w-[11px] rounded-full border-2 border-ink bg-raised"
                  initial={reduce ? false : { scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "0px 0px -35% 0px" }}
                  transition={SPRING}
                />
                <m.div
                  data-reveal
                  initial={reduce ? false : { opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "0px 0px -30% 0px" }}
                  transition={{ duration: 0.7, ease: EASE_OUT }}
                >
                  <h3 className="text-[18px] font-semibold leading-snug">
                    {it.url ? (
                      <a href={it.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                        {it.title}
                      </a>
                    ) : (
                      it.title
                    )}
                  </h3>
                  {it.meta ? <p className="mt-1 font-mono text-[12px] text-muted">{it.meta}</p> : null}
                  {it.body ? <p className="mt-2 max-w-[520px] text-[15px] text-muted">{it.body}</p> : null}
                </m.div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
