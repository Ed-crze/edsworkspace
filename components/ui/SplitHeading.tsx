"use client";
import { m, useReducedMotion } from "motion/react";
import { EASE_OUT, STAGGER } from "@/lib/motion";

type Props = {
  as?: "h1" | "h2";
  text: string;
  italic?: string; // emphasised final phrase
  className?: string;
  delay?: number;
  duration?: number;
  go?: boolean; // when set, animate on this flag instead of on scroll
};

// Words rise from a mask. Real text and real spaces stay in the DOM, so screen readers read one sentence.
export function SplitHeading({ as = "h2", text, italic, className = "", delay = 0, duration = 0.8, go }: Props) {
  const reduce = useReducedMotion();
  const Tag = as;
  const words = [
    ...text.split(" ").map((w) => ({ w, it: false })),
    ...(italic ? italic.split(" ").map((w) => ({ w, it: true })) : []),
  ];
  const base = `display ${as === "h1" ? "h1" : "h2"} text-balance ${className}`;

  if (reduce) {
    return (
      <Tag className={base}>
        {text}
        {italic ? <> <em>{italic}</em></> : null}
      </Tag>
    );
  }

  return (
    <Tag className={base}>
      {words.map(({ w, it }, i) => (
        <span key={`${w}-${i}`}>
          <span className="inline-block overflow-hidden pr-[0.04em] pb-[0.14em] -mb-[0.14em] align-bottom">
            <m.span
              data-reveal
              className={`inline-block ${it ? "italic" : ""}`}
              initial={{ y: "110%" }}
              {...(go === undefined
                ? { whileInView: { y: 0 }, viewport: { once: true, margin: "-80px" } }
                : { animate: { y: go ? 0 : "110%" } })}
              transition={{ duration, delay: delay + i * STAGGER.word, ease: EASE_OUT }}
            >
              {w}
            </m.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
