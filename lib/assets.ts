import { existsSync } from "node:fs";
import path from "node:path";

export function publicFileExists(name: string): boolean {
  return existsSync(path.join(process.cwd(), "public", name));
}
