import { createServer } from "node:http";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { resolve, extname } from "node:path";
import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
const root = resolve("dist");
const mime = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".png": "image/png",
};
const server = createServer(async (req, res) => {
  try {
    let file = resolve(root, "." + decodeURIComponent(req.url.split("?")[0]));
    if (!file.startsWith(root)) throw Error("bad path");
    if (!extname(file)) file = resolve(root, "index.html");
    const data = await readFile(file);
    res.setHeader(
      "Content-Type",
      mime[extname(file)] || "application/octet-stream",
    );
    res.end(data);
  } catch {
    res.statusCode = 404;
    res.end("Not found");
  }
});
await new Promise((r) => server.listen(4173, "127.0.0.1", r));
await mkdir("artifacts", { recursive: true });
const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox"],
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
let errors = [];
page.on("pageerror", (e) => errors.push(e.message));
try {
  await page.goto("http://127.0.0.1:4173");
  await page.waitForTimeout(800);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "artifacts/home-desktop.png" });
  for (
    let y = 600;
    y < (await page.evaluate(() => document.body.scrollHeight));
    y += 600
  ) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(70);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: "artifacts/home-full.png", fullPage: true });
  const a11y = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  await writeFile(
    "artifacts/accessibility.json",
    JSON.stringify(a11y.violations, null, 2),
  );
  console.log(
    "Accessibility:",
    a11y.violations.map((v) => `${v.id}: ${v.nodes.length}`).join(", ") ||
      "no violations",
  );
  for (const width of [360, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/shop",
      "/product/iphone-16-pro-max",
      "/compare",
      "/wishlist",
      "/cart",
      "/offers",
      "/brands/apple",
      "/about",
      "/contact",
    ]) {
      await page.goto("http://127.0.0.1:4173" + route);
      await page.waitForTimeout(210);
      await page.locator("main h1, main h2").first().waitFor();
      const sizes = await page.evaluate(() => ({
        width: document.documentElement.clientWidth,
        scroll: document.documentElement.scrollWidth,
      }));
      assert(
        sizes.scroll <= sizes.width + 1,
        `Overflow ${width} ${route}: ${JSON.stringify(sizes)}`,
      );
      const broken = await page
        .locator("img")
        .evaluateAll((imgs) =>
          imgs
            .filter((i) => i.complete && i.naturalWidth === 0)
            .map((i) => i.src),
        );
      assert.equal(broken.length, 0, `Broken images ${route}: ${broken}`);
      if (width === 360 && route === "/") {
        await page.screenshot({ path: "artifacts/home-mobile.png" });
      }
      if (width === 1440 && route === "/shop")
        await page.screenshot({ path: "artifacts/shop-desktop.png" });
      if (width === 1440 && route === "/product/iphone-16-pro-max")
        await page.screenshot({ path: "artifacts/product-desktop.png" });
    }
  }
  console.log("40 route × viewport checks passed.");
  await page.goto("http://127.0.0.1:4173/shop");
  await page
    .getByRole("heading", { name: "Find your extraordinary." })
    .waitFor();
  assert.equal(await page.locator(".product-card").count(), 8);
  await page.getByRole("checkbox", { name: "Apple" }).check();
  assert.equal(await page.locator(".product-card").count(), 2);
  await page.getByRole("button", { name: "Reset", exact: true }).click();
  await page.getByLabel("Search the collection").fill("pixel");
  assert.equal(await page.locator(".product-card").count(), 1);
  await page.getByLabel("Clear search").click();
  await page.getByLabel("Sort products").selectOption("price-low");
  assert(
    (await page.locator(".product-card h3").first().innerText()).includes(
      "Phone (2a)",
    ),
  );
  await page.goto("http://127.0.0.1:4173/product/iphone-16-pro-max");
  await page
    .getByRole("heading", { name: "iPhone 16 Pro Max", exact: true })
    .waitFor();
  await page.getByRole("button", { name: "512GB", exact: true }).click();
  await page
    .getByRole("button", { name: "Natural Titanium", exact: true })
    .click();
  await page.getByLabel("Delivery PIN code").fill("560038");
  await page.locator(".delivery-check button").click();
  await page
    .getByText("Available! Estimated delivery", { exact: false })
    .waitFor();
  await page
    .getByRole("button", { name: "Save to wishlist", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Add to compare", exact: true })
    .click();
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.goto("http://127.0.0.1:4173/wishlist");
  assert.equal(await page.locator(".product-card").count(), 1);
  await page.goto("http://127.0.0.1:4173/compare");
  await page
    .getByRole("button", { name: "Add a phone", exact: false })
    .first()
    .click();
  await page.locator(".compare-picker button").first().click();
  assert.equal(await page.locator(".compare-product").count(), 2);
  assert.equal(await page.locator(".compare-row").count(), 10);
  await page.getByRole("checkbox", { name: "Show differences only" }).check();
  assert((await page.locator(".compare-row").count()) <= 10);
  await page.goto("http://127.0.0.1:4173/cart");
  await page.getByText("512GB · Natural Titanium").waitFor();
  await page.getByLabel("Increase iPhone 16 Pro Max quantity").click();
  assert.equal(await page.locator(".quantity-control>span").innerText(), "2");
  await page.getByLabel("Decrease iPhone 16 Pro Max quantity").click();
  await page.getByLabel("Discount code").fill("AUREA1000");
  await page.getByRole("button", { name: "Apply", exact: true }).click();
  await page.getByText("− ₹1,000", { exact: true }).waitFor();
  await page.getByRole("button", { name: "Continue to demo checkout" }).click();
  const modal = page.getByRole("dialog");
  await modal.getByLabel("Full name").fill("Aarav Sharma");
  await modal.getByLabel("Mobile number").fill("9876543210");
  await modal
    .getByLabel("Email address", { exact: true })
    .fill("aarav@example.com");
  await modal
    .getByLabel("Flat, house number, building & street")
    .fill("12 Palm Grove, 100 Feet Road");
  await modal.getByLabel("City", { exact: true }).fill("Bengaluru");
  await modal.getByLabel("PIN code", { exact: true }).fill("560038");
  await modal.getByLabel("State / Union territory").selectOption("Karnataka");
  await modal.getByRole("button", { name: "Review your demo order" }).click();
  await modal
    .getByRole("button", { name: "Credit / debit card", exact: true })
    .click();
  await modal.getByRole("button", { name: "Complete demo order" }).click();
  await modal.getByText("Demo order reference").waitFor();
  assert.equal(
    JSON.parse(await page.evaluate(() => localStorage.getItem("aurea-cart")))
      .length,
    0,
  );
  await modal.getByLabel("Close dialog").click();
  await page.goto("http://127.0.0.1:4173/contact");
  await page.getByLabel("Your name", { exact: true }).fill("Ananya Kumar");
  await page
    .getByLabel("Email address", { exact: true })
    .fill("ananya@example.com");
  await page
    .getByLabel("A little about what you need")
    .fill("I would like to compare two great camera phones.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Send demo enquiry" }).click();
  await page.getByText("A lovely start, Ananya.").waitFor();
  await page.setViewportSize({ width: 360, height: 850 });
  await page.goto("http://127.0.0.1:4173");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .locator(".mobile-nav")
    .getByRole("link", { name: "New arrivals" })
    .click();
  await page
    .getByRole("heading", { name: "New here. Made for you." })
    .waitFor();
  await page.getByRole("button", { name: "Filters", exact: false }).click();
  await page.getByRole("checkbox", { name: "Google" }).check();
  await page.getByRole("button", { name: "Show 1 phones" }).click();
  assert.equal(await page.locator(".product-card").count(), 1);
  assert.deepEqual(errors, []);
  console.log(
    "All shopping, persistence, comparison, filter, checkout and mobile navigation tests passed. No runtime errors.",
  );
} catch (e) {
  await page.screenshot({ path: "artifacts/test-failure.png", fullPage: true });
  console.error(e);
  process.exitCode = 1;
} finally {
  await browser.close();
  await new Promise((r) => server.close(r));
}
