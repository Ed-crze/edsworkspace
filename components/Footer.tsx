import { footer, nav, site } from "@/lib/content";
import { publicFileExists } from "@/lib/assets";
import { Bars } from "./Bars";

export function Footer() {
  const year = new Date().getFullYear();
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
  const elsewhere = [
    { label: "LinkedIn", href: site.linkedin, external: true },
    ...(site.github ? [{ label: "GitHub", href: site.github, external: true }] : []),
    { label: "Email", href: `mailto:${site.email}`, external: false },
    ...(publicFileExists("Edwin-Safo-CV.pdf") ? [{ label: "CV", href: site.cv, external: false }] : []),
  ];
  return (
    <footer className="border-t border-line bg-background">
      <div className="mx-auto max-w-[1200px] px-6 pt-16 md:px-16">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <p className="text-[15px] font-semibold">{site.name}</p>
            <p className="mt-1 font-mono text-[11px] text-muted">{footer.tagline}</p>
          </div>
          <nav aria-label="Footer navigate">
            <p className="mb-3 font-mono text-[11px] text-muted">Navigate</p>
            <ul className="flex flex-col gap-1 text-[14px]">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="wipe inline-flex min-h-8 items-center">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Footer elsewhere">
            <p className="mb-3 font-mono text-[11px] text-muted">Elsewhere</p>
            <ul className="flex flex-col gap-1 text-[14px]">
              {elsewhere.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    aria-label={l.label === "Email" ? "Email Edwin Safo" : l.label === "CV" ? "Download CV" : `${l.label} profile`}
                    className="wipe inline-flex min-h-8 items-center"
                    {...(l.external ? ext : {})}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mt-14 pb-6 text-[13px] text-muted">
          &copy; {year} {site.name}
        </p>
      </div>
      <Bars trigger="view" />
    </footer>
  );
}
