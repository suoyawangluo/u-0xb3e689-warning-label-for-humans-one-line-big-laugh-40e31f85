import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The entry: one single-line safety warning label for humans, 119 characters.
const LINE =
  "WARNING: This human contains opinions formed in under five seconds and defended for the rest of its life. Do not shake.";

const chars = [...LINE].length;
if (chars < 1 || chars > 160) {
  throw new Error(`entry must be 1-160 characters, got ${chars}`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const path = `${outDir}/entry.txt`;
writeFileSync(path, LINE, "utf8");

// Read it back and verify the file holds exactly the entry, byte for byte.
const back = readFileSync(path, "utf8");
if (back !== LINE) {
  throw new Error("entry.txt does not match the entry line");
}
console.log(`wrote ${path} (${chars} code points)`);
