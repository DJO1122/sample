// Smoke test against a running production build (npm run build && npm start).
// Fails on: broken internal links, horizontal overflow, page errors,
// and any axe-core WCAG 2.1 A/AA or best-practice violation.
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const PAGES = ["/", "/plans", "/contact", "/privacy", "/terms"];
const WIDTHS = [1280, 390, 320];
const failures = [];
const internal = new Set(PAGES);

const browser = await chromium.launch();
for (const width of WIDTHS) {
  const context = await browser.newContext({ viewport: { width, height: 800 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  for (const path of PAGES) {
    const res = await page.goto(BASE + path, { waitUntil: "networkidle" });
    if (!res || res.status() !== 200) failures.push(`${path} returned ${res?.status()}`);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 0) failures.push(`[${width}px] ${path} scrolls sideways by ${overflow}px`);
    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"])
      .analyze();
    for (const v of violations) {
      failures.push(`[${width}px] ${path} axe ${v.impact} ${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(" | ")}`);
    }
    for (const href of await page.$$eval("a[href^='/']", (as) => as.map((a) => a.getAttribute("href")))) internal.add(href);
  }
  errors.forEach((e) => failures.push(`[${width}px] page error: ${e}`));
  await context.close();
}

const notFound = await browser.newPage();
const nf = await notFound.goto(BASE + "/this-page-does-not-exist");
if (nf?.status() !== 404) failures.push(`unknown route returned ${nf?.status()}, expected 404`);

const request = (await browser.newContext()).request;
for (const href of internal) {
  const status = (await request.get(BASE + href)).status();
  if (status !== 200) failures.push(`link ${href} returned ${status}`);
}
await browser.close();

console.log(`Checked ${PAGES.length} pages at ${WIDTHS.join(", ")}px and ${internal.size} internal links.`);
if (failures.length) {
  console.error(failures.map((f) => `  ✗ ${f}`).join("\n"));
  process.exit(1);
}
console.log("All smoke checks passed.");
