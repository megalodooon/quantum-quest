// The artifact host wraps the page in its own <!doctype><html><head><body>,
// so strip those from the single-file build and keep title, links, styles, scripts and body content.
import { readFileSync, writeFileSync } from "node:fs";
let html = readFileSync("dist/index.html", "utf8");
const head = html.match(/<head>([\s\S]*?)<\/head>/)[1];
const body = html.match(/<body>([\s\S]*?)<\/body>/)[1];
const keepHead = head
  .replace(/<meta charset[^>]*>/, "")
  .replace(/<meta name="viewport"[^>]*>/, "");
// move scripts after the body markup so #root exists when they run
const scripts = [];
const headNoScripts = keepHead.replace(/<script\b[\s\S]*?<\/script>/g, (m) => { scripts.push(m.replace('type="module" crossorigin', 'type="module"')); return ""; });
const out = headNoScripts.trim() + "\n" + body.trim() + "\n" + scripts.join("\n");
writeFileSync("dist/quantum-quest.html", out);
console.log("artifact page", (out.length / 1024 / 1024).toFixed(2), "MB");
