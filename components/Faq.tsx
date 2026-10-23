"use client";
import { useState } from "react";
import { m, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { faq } from "@/lib/content";
import { EASE_IN_OUT } from "@/lib/motion";
import { SectionHead } from "./ui/SectionHead";
import { Reveal } from "./ui/Reveal";

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();
  return (
    <section id="faq" aria-label="FAQ" className="section">
      <div className="wrap max-w-[800px]">
        <SectionHead heading={faq.heading} />
        <div className="mt-14 flex flex-col gap-3">
          {faq.items.map((it, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={it.q} delay={(i % 3) * 0.05}>
                <div
                  className={`rounded-xl border border-line transition-colors duration-300 ${
                    isOpen ? "bg-surface" : "bg-surface/60"
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      id={`faq-q-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex min-h-14 w-full items-center justify-between gap-4 rounded-xl px-5 py-4 text-left text-[16px] font-medium"
                    >
                      {it.q}
                      <m.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3, ease: EASE_IN_OUT }}>
                        <Plus size={20} aria-hidden="true" />
                      </m.span>
                    </button>
                  </h3>
                  <m.div
                    id={`faq-a-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                    data-faq-panel
                    inert={!isOpen}
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{
                      height: { duration: reduce ? 0.01 : 0.4, ease: EASE_IN_OUT },
                      opacity: { duration: reduce ? 0.01 : 0.3, delay: isOpen && !reduce ? 0.05 : 0 },
                    }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-[640px] px-5 pb-5 text-[15px] text-muted">{it.a}</p>
                  </m.div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
