import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

const origin = process.env.SITE_URL || "https://mahmoud-salama.vercel.app";
const pages = [
  "/", "/portfolio.html", "/projects.html", "/mediq.html", "/experience.html",
  "/architecture.html", "/technologies.html", "/governance.html", "/contributions.html",
  "/evidence.html", "/contact.html", "/flagship-cases.html", "/architecture-map.html",
  "/questions.html", "/card.html"
];
const viewports = [
  { name: "desktop-1440", width: 1440, height: 1100, isMobile: false },
  { name: "mobile-390", width: 390, height: 844, isMobile: true }
];

await mkdir("artifacts/visual-qa", { recursive: true });
const browser = await chromium.launch({ headless: true });
const findings = [];

for (const viewport of viewports) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    isMobile: viewport.isMobile,
    hasTouch: viewport.isMobile
  });

  for (const path of pages) {
    const page = await context.newPage();
    const errors = [];
    const badResponses = [];
    page.on("console", message => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", error => errors.push(error.message));
    page.on("response", response => {
      if (response.status() >= 400 && response.url().startsWith(origin)) {
        badResponses.push({ status: response.status(), url: response.url() });
      }
    });

    const url = origin + path;
    try {
      const response = await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
      await page.screenshot({
        path: `artifacts/visual-qa/${viewport.name}-${path === "/" ? "home" : path.slice(1, -5)}.png`,
        fullPage: true
      });

      const metrics = await page.evaluate(() => ({
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
        horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
        images: Array.from(document.images).filter(image => !image.complete || image.naturalWidth === 0)
          .map(image => ({ src: image.currentSrc || image.src, alt: image.alt })),
        buttonsWithoutName: Array.from(document.querySelectorAll("button, summary")).filter(element =>
          !element.getAttribute("aria-label") && !element.textContent.trim()
        ).length,
        linksWithoutName: Array.from(document.querySelectorAll("a")).filter(element =>
          !element.getAttribute("aria-label") && !element.textContent.trim() &&
          !element.querySelector("img[alt]")
        ).length,
        mainCount: document.querySelectorAll("main").length,
        h1Count: document.querySelectorAll("h1").length
      }));

      const issueTypes = [];
      if (!response || !response.ok()) issueTypes.push("page-response");
      if (metrics.horizontalOverflow) issueTypes.push("horizontal-overflow");
      if (metrics.images.length) issueTypes.push("image-load");
      if (metrics.buttonsWithoutName) issueTypes.push("unnamed-control");
      if (metrics.linksWithoutName) issueTypes.push("unnamed-link");
      if (metrics.mainCount !== 1) issueTypes.push("main-landmark");
      if (metrics.h1Count !== 1) issueTypes.push("h1-structure");
      if (errors.length) issueTypes.push("console-error");
      if (badResponses.length) issueTypes.push("bad-resource-response");
      if (issueTypes.length) findings.push({ viewport: viewport.name, path, issueTypes, metrics, errors, badResponses });
    } catch (error) {
      findings.push({ viewport: viewport.name, path, issueTypes: ["navigation-failure"], error: error.message });
    } finally {
      await page.close();
    }
  }
  await context.close();
}
await browser.close();
await writeFile("artifacts/visual-qa/report.json", JSON.stringify({
  origin, generatedAt: new Date().toISOString(), pages: pages.length, viewports: viewports.map(({ name }) => name), findings
}, null, 2));
if (findings.length) process.exitCode = 1;
