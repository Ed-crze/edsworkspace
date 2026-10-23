"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { hero } from "@/lib/content";
import { introShouldPlay } from "@/lib/intro";
import { Fade } from "./ui/Reveal";
import { SplitHeading } from "./ui/SplitHeading";
import { MagneticButton } from "./ui/MagneticButton";
import { Bars } from "./Bars";

export function Hero({ hasCv, cvHref }: { hasCv: boolean; cvHref: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  // The hero starts when the intro overlay is about 60% gone (0.3s delay + 0.8s slide * 0.6).
  const [delay] = useState(() => (introShouldPlay() ? 0.78 : 0));
  const [go, setGo] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setGo(true), delay * 1000);
    return () => window.clearTimeout(t);
  }, [delay]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section
      ref={ref}
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-svh flex-col items-center overflow-hidden px-5 pb-[170px] pt-32 sm:px-6 md:px-16 md:pb-[200px] md:pt-40"
    >
      {/* Background photo, with a dark scrim so the white text stays readable */}
      <m.div aria-hidden="true" className="absolute inset-x-0 -top-24 bottom-0" style={reduce ? undefined : { y: imgY }}>
        <Image
          src="/hero.jpg"
          alt=""
          fill
          priority
          quality={75}
          sizes="100vw"
          className="object-cover object-[50%_0%] md:object-[50%_22%]"
        />
      </m.div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-transparent" />
      {/* Fade the photo into the page background so the hero blends into the next section */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-b from-transparent via-background/70 to-background" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <SplitHeading
          as="h1"
          text={hero.before}
          italic={hero.italic}
          go={go}
          duration={0.9}
          className="max-w-4xl text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.35)]"
        />
        <Fade go={go} y={16} delay={0.6} className="mt-6">
          <p className="mx-auto max-w-[520px] text-[16px] text-white/90 md:text-[17px]">{hero.sub}</p>
        </Fade>
        <Fade go={go} y={16} delay={0.7} className="mt-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <MagneticButton href="#projects" label={hero.primary} variant="light" arrow />
            {hasCv ? <MagneticButton href={cvHref} download variant="glass" label={hero.secondary} /> : null}
          </div>
        </Fade>
      </div>
      <m.div className="absolute inset-x-0 bottom-0" style={reduce ? undefined : { y }}>
        <Bars trigger="mount" delay={delay + 0.2} interactive />
      </m.div>
    </section>
  );
}
