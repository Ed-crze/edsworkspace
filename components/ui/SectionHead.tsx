import { Fade } from "./Reveal";
import { SplitHeading } from "./SplitHeading";

// Heading with an optional sub line. Same rhythm in every section.
export function SectionHead({
  heading,
  sub,
  align = "center",
}: {
  heading: string;
  sub?: string;
  align?: "center" | "left";
}) {
  const a = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col gap-5 ${a}`}>
      <SplitHeading text={heading} className="max-w-3xl" />
      {sub ? (
        <Fade delay={0.2} y={16}>
          <p className="max-w-[520px] text-muted">{sub}</p>
        </Fade>
      ) : null}
    </div>
  );
}
