"use client";
import Image from "next/image";
import { m, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

export function Portrait({ src, alt }: { src?: string; alt: string }) {
  const reduce = useReducedMotion();
  const frame = "relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line bg-raised";
  const body = src ? (
    <m.div
      className="absolute inset-0"
      initial={reduce ? false : { scale: 1.15 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.2, ease: EASE_OUT }}
    >
      <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 480px, 90vw" className="object-cover" />
    </m.div>
  ) : (
    <div className="flex h-full w-full items-center justify-center" role="img" aria-label={alt}>
      <span className="display text-[96px] text-ink/70">ES</span>
    </div>
  );
  if (reduce) return <div className={frame}>{body}</div>;
  return (
    <m.div
      data-reveal
      className={frame}
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.2, ease: EASE_OUT }}
    >
      {body}
    </m.div>
  );
}
