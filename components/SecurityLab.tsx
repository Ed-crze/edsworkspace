import { projects, securityLab } from "@/lib/content";
import { SectionHead } from "./ui/SectionHead";
import { Fade } from "./ui/Reveal";
import { ProjectCard } from "./ProjectCard";

export function SecurityLab() {
  const list = projects.filter((p) => p.group === "security");
  return (
    <section id="security-lab" aria-label="Security lab" className="section bg-raised">
      <div className="wrap">
        <SectionHead heading={securityLab.heading} sub={securityLab.sub} />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {list.map((p, i) => (
            <ProjectCard key={p.slug} p={p} index={i} compact />
          ))}
        </div>
        <Fade className="mt-10" y={16}>
          <p className="text-center text-[15px] text-muted">{securityLab.note}</p>
        </Fade>
      </div>
    </section>
  );
}
