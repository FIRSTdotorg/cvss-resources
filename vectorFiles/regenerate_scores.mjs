// Regenerates the *-scores files from their *-vectors counterparts against the pinned reference calculator.
//
// Reference implementation: cvss40.js from RedHatProductSecurity/cvss-v4-calculator at commit d1eafe06859e6610600f772ed98502bc1cd63526, the merge commit of the 2024-11-01 rounding fix (PR #67), sha256 6625cc93aae9f01bc9990e4b36f4b133995b32072da90bb7be369d93db9173aa.
// Fetching that file is the script's only network access, and it refuses to run unless the bytes match the sha256; everything else executes locally.
//
// Line convention (kept from the existing files): the score file aligns line-by-line with the vector file.
// A valid vector line becomes {'vector': ..., 'score': ..., 'severity': ...}; an invalid one becomes an error entry; comment and blank lines are mirrored verbatim.
// Existing error entries are kept as they are when this run also judges the line invalid, since the original messages are more specific than a generic marker.
//
// cvss40.js at the pinned revision validates a vector whose mandatory metrics are truncated (for example a base vector ending at SI) as valid; the specification makes all eleven base metrics mandatory, so this script enforces that count itself.
// Reported upstream.
import { readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import vm from "node:vm";

const COMMIT = "d1eafe06859e6610600f772ed98502bc1cd63526";
const URL = `https://raw.githubusercontent.com/RedHatProductSecurity/cvss-v4-calculator/${COMMIT}/cvss40.js`;
const SHA256 = "6625cc93aae9f01bc9990e4b36f4b133995b32072da90bb7be369d93db9173aa";

const js = await (await fetch(URL)).text();
const digest = createHash("sha256").update(js).digest("hex");
if (digest !== SHA256) throw new Error(`cvss40.js digest mismatch: ${digest}`);

const context = { window: {}, console: { error: () => {} } };
vm.createContext(context);
vm.runInContext(js, context);
const CVSS40 = context.window.CVSS40 ?? context.CVSS40;

const MANDATORY = ["AV", "AC", "AT", "PR", "UI", "VC", "VI", "VA", "SC", "SI", "SA"];

function severity(score) {
  if (score >= 9.0) return "Critical";
  if (score >= 7.0) return "High";
  if (score >= 4.0) return "Medium";
  if (score >= 0.1) return "Low";
  return "None";
}

function scoreLine(vector, existing) {
  const trimmed = vector.trim();
  if (trimmed === "" || trimmed.startsWith("#") || !trimmed.includes("/")) return vector;
  const keys = new Set(trimmed.split("/").map((m) => m.split(":")[0]));
  const complete = MANDATORY.every((k) => keys.has(k));
  let score = null;
  if (complete) {
    try {
      score = new CVSS40(trimmed).score;
    } catch {
      score = null;
    }
  }
  if (score === null) {
    return existing.includes("'error'")
      ? existing
      : `{'vector': '${trimmed}', 'score': 'error', 'severity': 'error', 'error': 'Invalid vector string'}`;
  }
  return `{'vector': '${trimmed}', 'score': ${score}, 'severity': '${severity(score)}'}`;
}

for (const name of ["reference", "base-threat", "macro"]) {
  const vectors = readFileSync(`${name}-vectors`, "utf8").split("\n");
  const existing = readFileSync(`${name}-scores`, "utf8").split("\n");
  const out = vectors.map((v, i) => scoreLine(v, existing[i] ?? ""));
  if (vectors[vectors.length - 1] === "") out[out.length - 1] = "";
  writeFileSync(`${name}-scores`, out.join("\n"));
  console.log(`${name}-scores regenerated`);
}
