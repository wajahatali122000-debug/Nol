// Writes scripts/keyfacts.json into each page's frontmatter as `keyfacts:` (replaces an existing block).
import fs from "node:fs";
const data = JSON.parse(fs.readFileSync("scripts/keyfacts.json", "utf8"));
const q = (s) => JSON.stringify(s);
for (const [loc, pages] of Object.entries(data)) {
  for (const [slug, facts] of Object.entries(pages)) {
    const f = `content/${loc}/${slug}.md`;
    let s = fs.readFileSync(f, "utf8");
    s = s.replace(/\nkeyfacts:\n(?:  - .*\n(?:    .*\n)*)*/g, "\n");
    const block = "keyfacts:\n" + facts.map(([l, v]) => `  - label: ${q(l)}\n    value: ${q(v)}`).join("\n") + "\n";
    const end = s.indexOf("\n---", 4);
    s = s.slice(0, end + 1) + block + s.slice(end + 1);
    fs.writeFileSync(f, s);
  }
}
console.log("ok");
