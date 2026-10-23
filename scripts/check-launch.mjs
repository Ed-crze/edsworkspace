// Pre-launch check: finds TODO text in content and missing public files.
// Warns by default. Set STRICT_LAUNCH=1 to fail (for example in CI before production).
import { readFileSync, existsSync } from "node:fs";

const problems = [];
const content = readFileSync("lib/content.ts", "utf8");
content.split("\n").forEach((line, i) => {
  if (line.includes("TODO")) problems.push(`lib/content.ts:${i + 1} ${line.trim()}`);
});
for (const f of ["public/Edwin-Safo-CV.pdf", "public/edwin.jpg"]) {
  if (!existsSync(f)) problems.push(`Missing file: ${f}`);
}
if (problems.length === 0) {
  console.log("Launch check passed.");
} else {
  console.log(`Launch check: ${problems.length} item(s) to finish before going live:\n- ` + problems.join("\n- "));
  if (process.env.STRICT_LAUNCH === "1") process.exit(1);
}
