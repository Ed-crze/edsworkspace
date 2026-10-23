import { Braces, Database, Monitor, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import { stack } from "@/lib/content";
import { SectionHead } from "./ui/SectionHead";
import { Reveal } from "./ui/Reveal";

const ICONS: Record<string, LucideIcon> = {
  monitor: Monitor,
  database: Database,
  braces: Braces,
  sparkles: Sparkles,
  shield: ShieldCheck,
};

export function Stack() {
  return (
    <section id="stack" aria-label="Stack" className="section">
      <div className="wrap">
        <SectionHead heading={stack.heading} />
        <div className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {stack.groups.map((g, gi) => {
            const Icon = ICONS[g.icon];
            return (
              <Reveal key={g.label} delay={(gi % 3) * 0.08}>
                <h3 className="mb-4 font-mono text-[11px] font-normal text-muted">{g.label}</h3>
                <ul className="grid grid-cols-2 gap-3">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="card flex items-center gap-2.5 px-3 py-3 font-mono text-[12px] leading-snug"
                    >
                      <Icon size={16} className="shrink-0" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
