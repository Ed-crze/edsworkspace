"use client";
import { useRef } from "react";
import { m, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { showcase } from "@/lib/content";
import { EASE_OUT } from "@/lib/motion";
import { useIsMobile, usePointerFine } from "@/lib/hooks";
import { SectionHead } from "./ui/SectionHead";

// Syntax colours come from CSS variables (light and dark), all at least 4.5:1 on the window background.
const C = { c: "var(--code-c)", k: "var(--code-k)", s: "var(--code-s)", i: "var(--code-i)" };
type Tok = [keyof typeof C, string];
const CODE: Tok[][] = [
  [["c", "// building and securing software"]],
  [["k", "const "], ["i", "edwin = {"]],
  [["i", "  role: "], ["s", "'Software Developer'"], ["i", ","]],
  [["i", "  stack: ["]],
  [["i", "    "], ["s", "'Next.js'"], ["i", ", "], ["s", "'TypeScript'"], ["i", ","]],
  [["i", "    "], ["s", "'Node.js'"], ["i", ", "], ["s", "'Supabase'"], ["i", ","]],
  [["i", "  ],"]],
  [["i", "  also: ["], ["s", "'IT Support'"], ["i", ", "], ["s", "'Security'"], ["i", "],"]],
  [["i", "  open: "], ["k", "true"]],
  [["i", "}"]],
];

export function Showcase() {
  const reduce = useReducedMotion();
  const fine = usePointerFine();
  const mobile = useIsMobile();
  const panelRef = useRef<HTMLDivElement>(null);
  const secRef = useRef<HTMLElement>(null);
  const active = useInView(panelRef, { margin: "200px" });
  const seen = useInView(panelRef, { once: true, margin: "-120px" });

  // Scrubbed: the panel opens up as it scrolls in, the window drifts across the section.
  const { scrollYProgress: enter } = useScroll({ target: panelRef, offset: ["start end", "center center"] });
  const clip = useTransform(enter, [0, 1], ["inset(8% 6% 8% 6% round 24px)", "inset(0% 0% 0% 0% round 24px)"]);
  const { scrollYProgress: pass } = useScroll({ target: secRef, offset: ["start end", "end start"] });
  const parY = useTransform(pass, [0, 1], [-40, 40]);

  // 3D tilt toward the pointer
  const rx = useSpring(useMotionValue(0), { stiffness: 260, damping: 30 });
  const ry = useSpring(useMotionValue(0), { stiffness: 260, damping: 30 });
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || !fine) return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 12);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 12);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <section ref={secRef} aria-label="Featured" className="section">
      <div className="wrap">
        <SectionHead heading={showcase.heading} sub={showcase.sub} />
        <div ref={panelRef} data-active={active} className="mt-14">
          <m.div
            className="amber relative flex items-center justify-center px-4 py-12 md:min-h-[560px] md:py-16"
            style={reduce || mobile ? undefined : { clipPath: clip }}
            onPointerMove={onMove}
            onPointerLeave={onLeave}
          >
            <div aria-hidden="true" className="absolute inset-0">
              <div className="blob left-[8%] top-[10%] h-72 w-72 bg-amber-1/80" />
              <div className="blob right-[10%] top-[30%] h-80 w-80 bg-amber-2/70" style={{ animationDelay: "-8s" }} />
              <div className="blob bottom-[-10%] left-[35%] h-72 w-96 bg-[#9a5b1a]/60" style={{ animationDelay: "-14s" }} />
              <div className="grain" />
            </div>

            <div className="relative w-full max-w-[560px]" style={{ perspective: 1200 }}>
              <m.div style={reduce ? undefined : { y: parY, rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}>
                <div className="rounded-2xl border border-line bg-surface shadow-[0_30px_80px_rgba(74,45,18,0.35)]">
                  <div className="flex items-center gap-2 border-b border-line px-4 py-3">
                    <span className="flex gap-1.5" aria-hidden="true">
                      {[0, 1, 2].map((i) => (
                        <span key={i} className="h-2.5 w-2.5 rounded-full bg-line" />
                      ))}
                    </span>
                    <span className="ml-2 font-mono text-[12px] text-muted">{showcase.filename}</span>
                  </div>
                  <pre className="overflow-x-auto px-4 py-4 font-mono text-[11.5px] leading-6 sm:text-[12px] md:px-5 md:py-5 md:text-[13px] md:leading-7">
                    <code>
                      {CODE.map((line, i) => (
                        <m.span
                          key={i}
                          data-reveal
                          className="block whitespace-pre"
                          initial={reduce ? false : { opacity: 0, y: 8 }}
                          animate={seen || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                          transition={{ duration: 0.5, delay: 0.3 + i * 0.12, ease: EASE_OUT }}
                        >
                          {line.map(([k, t], j) => (
                            <span key={j} style={{ color: C[k] }}>
                              {t}
                            </span>
                          ))}
                        </m.span>
                      ))}
                    </code>
                  </pre>
                </div>

              </m.div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
