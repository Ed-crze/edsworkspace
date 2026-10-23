"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useScroll, useSpring, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/lib/content";
import { EASE_OUT, SPRING } from "@/lib/motion";
import { getLenis } from "@/lib/lenis";
import { MagneticButton } from "./ui/MagneticButton";
import { Roll } from "./ui/Roll";
import { ThemeToggle } from "./ui/ThemeToggle";

export function Navbar() {
  const reduce = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const focusWithin = useRef(false);
  const menuBtn = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    if (y < 80 || focusWithin.current) setHidden(false);
    else if (y > prev + 2) setHidden(true);
    else if (y < prev - 2) setHidden(false);
  });

  // Active section while scrolling
  useEffect(() => {
    const els = nav.map((n) => document.getElementById(n.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
          else setActive((cur) => (cur === e.target.id ? null : cur));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Mobile menu: Escape closes, Lenis and body scroll pause while open.
  useEffect(() => {
    if (!open) return;
    getLenis()?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      getLenis()?.start();
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    menuBtn.current?.focus({ preventScroll: true });
  };

  const linkCls = "roll-host relative z-10 block px-3 py-2 text-[11px] font-medium uppercase tracking-[0.08em] text-ink";

  return (
    <m.header
      className="fixed inset-x-0 top-3 z-50 px-3 md:px-6"
      animate={{ y: hidden && !open ? "-140%" : 0 }}
      transition={{ duration: 0.4, ease: EASE_OUT }}
      onFocusCapture={() => {
        focusWithin.current = true;
        setHidden(false);
      }}
      onBlurCapture={() => {
        focusWithin.current = false;
      }}
    >
      <div
        className={`relative mx-auto flex max-w-[1200px] items-center justify-between overflow-hidden rounded-2xl border border-line bg-surface/85 backdrop-blur-[12px] transition-[padding,box-shadow] duration-300 ${
          scrolled ? "px-3 py-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.05),0_12px_30px_rgba(0,0,0,0.08)]" : "px-4 py-2.5"
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5 rounded-lg" aria-label="Edwin Safo, back to top">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-[12px] font-semibold text-on-ink">
            ES
          </span>
          <span className="text-[15px] font-semibold">{site.name}</span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="relative flex items-center">
            {nav.map((n) => (
              <li key={n.id} className="relative">
                {active === n.id ? (
                  <m.span
                    layoutId="nav-pill"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-raised"
                    transition={SPRING}
                  />
                ) : null}
                <a
                  href={`#${n.id}`}
                  aria-current={active === n.id ? "true" : undefined}
                  className={linkCls}
                >
                  <Roll>{n.label}</Roll>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 md:gap-2">
          <ThemeToggle />
          <span className="ml-1 hidden md:block">
            <MagneticButton href="#contact" label="Let's talk" />
          </span>
          <button
            ref={menuBtn}
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>

        <m.div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-ink"
          style={{ scaleX: reduce ? 0 : progress }}
        />
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            className="fixed inset-0 -z-10 flex flex-col justify-center bg-background px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav aria-label="Mobile">
              <ul className="flex flex-col gap-2">
                {[...nav, { label: "Let's talk", id: "contact" }].map((n, i) => (
                  <m.li
                    key={`${n.id}-${i}`}
                    initial={{ y: 28, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.06, ease: EASE_OUT }}
                  >
                    <a href={`#${n.id}`} onClick={close} className="display block min-h-11 py-1 text-[44px]">
                      {n.label}
                    </a>
                  </m.li>
                ))}
              </ul>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </m.header>
  );
}
