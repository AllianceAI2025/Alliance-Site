// Rebuild the checked-in Word draft from the same content as the chat artifact.
// Requires python-docx. Pass --python <executable> to select a document runtime.
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { buildMatterBrief } from "../src/demo/matterBrief.js";

const args = process.argv.slice(2);
const python = args[0] === "--python" ? args[1] : process.env.PYTHON || "python";
if (!python || args.length && !(args.length === 2 && args[0] === "--python")) throw new Error("Usage: node scripts/generate-legal-brief.mjs [--python <executable>]");
const output = fileURLToPath(new URL("../public/demo/northstar-matter-assessment.docx", import.meta.url));
execFileSync(python, [fileURLToPath(new URL("./write-legal-brief.py", import.meta.url)), output], { input: JSON.stringify(buildMatterBrief(true)), stdio: ["pipe", "inherit", "inherit"] });
