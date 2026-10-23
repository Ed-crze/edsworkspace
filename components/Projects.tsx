import { projects, projectsSection } from "@/lib/content";
import { SectionHead } from "./ui/SectionHead";
import { ProjectCard } from "./ProjectCard";

const WIDE = new Set(["tiny-sparkles", "chat-app"]);

export function Projects() {
  const list = projects.filter((p) => p.group === "featured");
  return (
    <section id="projects" aria-label="Projects" className="section">
      <div className="wrap">
        <SectionHead heading={projectsSection.heading} />
        <div className="mt-14 grid gap-5 [grid-auto-flow:dense] md:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <ProjectCard
              key={p.slug}
              p={p}
              index={i % 3}
              compact={WIDE.has(p.slug)}
              className={WIDE.has(p.slug) ? "lg:col-span-2" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
