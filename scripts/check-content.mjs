// Content QA: broken internal links, related slugs, frontmatter lengths, AED figures to review.
// Run: node scripts/check-content.mjs
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = path.join(process.cwd(), "content");
const exists = (loc, slug) => fs.existsSync(path.join(ROOT, loc, `${slug || "index"}.md`));
const TOOLS = ["tools/fare-calculator", "tools/which-nol-card"];
let problems = 0;
const warn = (f, m) => { problems++; console.log(`✗ ${f}: ${m}`); };

const amounts = new Map();
for (const loc of ["en", "ar"]) {
  const dir = path.join(ROOT, loc);
  const files = [
    ...fs.readdirSync(dir).filter((f) => f.endsWith(".md")),
    ...fs.readdirSync(path.join(dir, "_tools")).map((f) => `_tools/${f}`),
  ];
  for (const f of files) {
    const id = `${loc}/${f}`;
    const { data, content } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
    for (const k of ["title", "h1", "description", "category"]) if (!data[k]) warn(id, `missing ${k}`);
    if (data.title && data.title.length > 65) warn(id, `title ${data.title.length} chars`);
    if (data.description && (data.description.length < 90 || data.description.length > 170))
      warn(id, `description ${data.description.length} chars`);
    for (const r of data.related || []) if (!exists(loc, r)) warn(id, `related → missing ${loc}/${r}`);
    if (/^#\s/m.test(content)) warn(id, "body contains an H1");
    const links = [...content.matchAll(/\]\((\/[^)\s#]*)|href="(\/[^"#]*)"/g)].map((m) => m[1] || m[2]);
    for (const l of links) {
      const isAr = l === "/ar" || l.startsWith("/ar/");
      if (loc === "ar" && !isAr) warn(id, `Arabic page links to English URL ${l}`);
      const slug = l.replace(/^\/ar/, "").replace(/^\//, "");
      const lloc = isAr ? "ar" : "en";
      if (TOOLS.includes(slug)) continue;
      if (!exists(lloc, slug)) warn(id, `broken link ${l}`);
    }
    for (const m of content.matchAll(/AED\s?[\d,.]+|[\d,.]+\s?(?:درهم|دراهم|درهماً)/g)) {
      const k = m[0].replace(/\s+/g, " ");
      amounts.set(k, (amounts.get(k) || 0) + 1);
    }
  }
}
console.log("\nAmounts used (check against the verified facts):");
console.log([...amounts.entries()].sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ×${v}`).join(" · "));
console.log(problems ? `\n${problems} problem(s)` : "\nNo link/frontmatter problems.");
