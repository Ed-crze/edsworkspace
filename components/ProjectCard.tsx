import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/content";
import { SpotCard } from "./ui/SpotCard";
import { Reveal } from "./ui/Reveal";
import { LineArt } from "./ui/LineArt";


export function ProjectCard({
  p,
  index = 0,
  compact = false,
  className = "",
}: {
  p: Project;
  index?: number;
  compact?: boolean;
  className?: string;
}) {
  const hasLinks = Boolean(p.liveUrl || p.repoUrl);
  const link = "link-arrow inline-flex min-h-11 items-center gap-1.5 text-[14px] font-medium";
  return (
    <Reveal delay={index * 0.08} className={className}>
      <SpotCard interactive={hasLinks} className="flex h-full flex-col p-6">
        <div className="flex items-center gap-2">
          <span className="eyebrow">
            {p.tags.length ? p.tags.join(", ") : "Project"}
            {p.status === "in-progress" ? " · In progress" : ""}
          </span>
        </div>

        <div className={`mt-4 overflow-hidden rounded-xl bg-background/60 ${compact ? "h-28" : "h-40"}`}>
          {p.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.image} alt={`${p.name} screenshot`} loading="lazy" width={640} height={400} className="h-full w-full object-cover" />
          ) : (
            <LineArt variant={p.art} />
          )}
        </div>

        <h3 className="mt-5 text-[20px] font-semibold leading-snug">{p.name}</h3>
        <p className="mt-2 line-clamp-2 text-[14px] text-muted">{p.summary}</p>

        {p.tags.length ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <li key={t} className="rounded-full border border-line bg-raised px-2.5 py-1 font-mono text-[11px]">
                {t}
              </li>
            ))}
          </ul>
        ) : null}

        {hasLinks ? (
          <div className="mt-auto flex gap-5 pt-4">
            {p.liveUrl ? (
              <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className={link}>
                View project <ArrowRight size={15} className="arrow" aria-hidden="true" />
              </a>
            ) : null}
            {p.repoUrl ? (
              <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className={link}>
                View code <ArrowRight size={15} className="arrow" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        ) : null}
      </SpotCard>
    </Reveal>
  );
}
