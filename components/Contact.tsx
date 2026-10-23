"use client";
import { useRef, useState, type FormEvent } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./ui/Brand";
import { contact, site } from "@/lib/content";
import { contactSchema } from "@/lib/validation";
import { EASE_OUT } from "@/lib/motion";
import { MagneticButton } from "./ui/MagneticButton";

type Status = "idle" | "sending" | "success" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const field =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-[15px] outline-none transition-colors focus:border-ink focus-visible:outline-2 focus-visible:outline-offset-2";

export function Contact() {
  const reduce = useReducedMotion();
  const secRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const { scrollYProgress } = useScroll({ target: secRef, offset: ["start end", "end start"] });
  const grainY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  const validate = (data: Record<string, string>): Errors => {
    const r = contactSchema.safeParse(data);
    if (r.success) return {};
    const out: Errors = {};
    for (const issue of r.error.issues) {
      const k = issue.path[0] as keyof Errors;
      if (k && !out[k]) out[k] = issue.message;
    }
    return out;
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const form = e.currentTarget.form;
    if (!form) return;
    const name = e.currentTarget.name as keyof Errors;
    const all = validate(Object.fromEntries(new FormData(form)) as Record<string, string>);
    setErrors((cur) => ({ ...cur, [name]: all[name] }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  };

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <span id={`${k}-err`} className="mt-1 block text-[13px] text-danger">
        {errors[k]}
      </span>
    ) : null;

  return (
    <section ref={secRef} id="contact" aria-label="Contact" className="section">
      <div className="wrap">
        <div className="amber px-4 py-12 md:px-10 md:py-20">
          <m.div aria-hidden="true" className="absolute inset-0" style={reduce ? undefined : { y: grainY }}>
            <div className="grain" />
          </m.div>
          <m.div
            data-reveal
            className="relative mx-auto max-w-[560px] rounded-2xl border border-line bg-surface p-6 shadow-[0_30px_80px_rgba(74,45,18,0.35)] md:p-10"
            initial={reduce ? false : { opacity: 0, scale: 0.96, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
          >
            <m.div
              animate={status === "error" && !reduce ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="display h2 text-center">{contact.heading}</h2>
              <p className="mt-3 text-center font-mono text-[11px] text-muted">{contact.line}</p>

              <form onSubmit={onSubmit} noValidate className="mt-8 flex flex-col gap-4">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-[14px] font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    className={field}
                    onBlur={onBlur}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-err" : undefined}
                  />
                  {err("name")}
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-[14px] font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={field}
                    onBlur={onBlur}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-err" : undefined}
                  />
                  {err("email")}
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-[14px] font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className={`${field} resize-y`}
                    onBlur={onBlur}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-err" : undefined}
                  />
                  {err("message")}
                </div>

                {/* Honeypot: hidden from people and screen readers, bots fill it in. */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="company">Company</label>
                  <input id="company" name="company" tabIndex={-1} autoComplete="off" />
                </div>

                <MagneticButton type="submit" disabled={status === "sending"} className="relative mt-2 w-full overflow-hidden">
                  {status === "sending" ? (
                    <m.span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-full origin-left bg-on-ink/20"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 0.9 }}
                      transition={{ duration: 6, ease: EASE_OUT }}
                    />
                  ) : null}
                  <span className="relative flex items-center gap-2">
                    {status === "success" ? (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <m.path d="M5 13l4 4L19 7" initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, ease: EASE_OUT }} />
                        </svg>
                        Sent
                      </>
                    ) : status === "sending" ? (
                      "Sending"
                    ) : (
                      contact.button
                    )}
                  </span>
                </MagneticButton>

                <p aria-live="polite" className="min-h-6 text-center text-[14px]">
                  {status === "success" ? contact.success : null}
                  {status === "error" ? (
                    <span className="text-danger">
                      {contact.error}{" "}
                      <a href={`mailto:${site.email}`} className="underline underline-offset-4">
                        {site.email}
                      </a>
                    </span>
                  ) : null}
                </p>
              </form>

              <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-[14px]">
                <li>
                  <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center gap-2 underline-offset-4 hover:underline">
                    <Mail size={16} aria-hidden="true" /> Email
                  </a>
                </li>
                <li>
                  <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 underline-offset-4 hover:underline">
                    <LinkedinIcon /> LinkedIn
                  </a>
                </li>
                {site.github ? (
                  <li>
                    <a href={site.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 underline-offset-4 hover:underline">
                      <GithubIcon /> GitHub
                    </a>
                  </li>
                ) : null}
              </ul>
            </m.div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
