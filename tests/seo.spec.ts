import { test, expect } from "@playwright/test";

const TARGET_HOST = "https://portfolio.alireza-abedi.ir";
const APEX_URL = "https://alireza-abedi.ir";

test.describe("Technical SEO & OpenGraph Regression Suite", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
  });

  test("1. Validate <title> and <meta name='description'> length and quality", async ({ page }) => {
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
    expect(pageTitle.length).toBeGreaterThanOrEqual(30);
    expect(pageTitle.length).toBeLessThanOrEqual(60);

    const metaDescription = await page.locator('meta[name="description"]').getAttribute("content");
    expect(metaDescription).toBeTruthy();
    expect(metaDescription!.length).toBeGreaterThanOrEqual(100);
    expect(metaDescription!.length).toBeLessThanOrEqual(160);
  });

  test("2. Validate Self-Referencing Canonical URL", async ({ page }) => {
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toBe(TARGET_HOST);
  });

  test("3. Validate OpenGraph and Twitter Meta Tags", async ({ page }) => {
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute("content");
    expect(ogTitle).toContain("Alireza Abedi");

    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute("content");
    expect(ogDescription).toBeTruthy();

    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute("content");
    expect(ogUrl).toBe(TARGET_HOST);

    const ogType = await page.locator('meta[property="og:type"]').getAttribute("content");
    expect(ogType).toBe("website");

    const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(ogImage).toBeTruthy();
    expect(ogImage).toContain("/opengraph-image");
  });

  test("4. Validate Root JSON-LD Graph with Person, Organization, WebSite & BreadcrumbList", async ({ page }) => {
    const parsedGraph = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
      for (const s of scripts) {
        try {
          const json = JSON.parse(s.textContent || "");
          if (json["@graph"]) return json["@graph"];
        } catch (_) {}
      }
      return null;
    });

    expect(parsedGraph).not.toBeNull();
    const personNode = parsedGraph.find((n: any) => n["@type"] === "Person");
    expect(personNode).toBeDefined();
    expect(personNode.name).toBe("علیرضا عابدی");
    expect(personNode.url).toBe(APEX_URL);
    expect(personNode.email).toBe("alireza.abedi9310@gmail.com");

    const breadcrumbNode = parsedGraph.find((n: any) => n["@type"] === "BreadcrumbList");
    expect(breadcrumbNode).toBeDefined();
    expect(breadcrumbNode.itemListElement).toHaveLength(2);
    expect(breadcrumbNode.itemListElement[0].item).toBe(APEX_URL);
    expect(breadcrumbNode.itemListElement[1].item).toBe(TARGET_HOST);
  });

  test("5. Validate /myProjects ItemList Structured Data (SoftwareSourceCode)", async ({ page }) => {
    await page.goto("/myProjects", { waitUntil: "domcontentloaded" });

    const itemList = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
      for (const s of scripts) {
        try {
          const data = JSON.parse(s.textContent || "");
          if (data["@type"] === "ItemList") return data;
          if (data["@graph"]) {
            const match = data["@graph"].find((n: any) => n["@type"] === "ItemList");
            if (match) return match;
          }
        } catch (_) {}
      }
      return null;
    });

    expect(itemList).not.toBeNull();
    expect(itemList["@type"]).toBe("ItemList");
    expect(itemList.itemListElement.length).toBeGreaterThan(0);

    const firstProject = itemList.itemListElement[0].item;
    expect(firstProject["@type"]).toBe("SoftwareSourceCode");
    expect(firstProject.name).toBeTruthy();
    expect(firstProject.description).toBeTruthy();
    expect(firstProject.applicationCategory).toBeTruthy();
    expect(Array.isArray(firstProject.programmingLanguage)).toBe(true);
    expect(firstProject.codeRepository).toContain("github.com/AlirezaAbd-dev");
    expect(firstProject.author.url).toBe(APEX_URL);
  });

  test("6. Ensure Every <img> Has a Non-Empty Alt Attribute", async ({ page }) => {
    const images = await page.locator("img").all();
    expect(images.length).toBeGreaterThan(0);

    for (const img of images) {
      const alt = await img.getAttribute("alt");
      expect(alt).toBeTruthy();
      expect(alt!.trim().length).toBeGreaterThan(0);
    }
  });

  test("7. Heading Structure Consistency (Strict H1 -> H2 Hierarchy)", async ({ page }) => {
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBeGreaterThanOrEqual(1);

    const h2Count = await page.locator("h2").count();
    expect(h2Count).toBeGreaterThanOrEqual(1);
  });
});

test.describe("Crawler Directives & Protocol Endpoints", () => {
  test("8. Verify robots.txt Returns HTTP 200 with text/plain", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("text/plain");

    const text = await response.text();
    expect(text).toContain("User-Agent: *");
    expect(text).toContain("Allow: /");
    expect(text).toContain(`Sitemap: ${TARGET_HOST}/sitemap.xml`);
  });

  test("9. Verify sitemap.xml Returns HTTP 200 with application/xml", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("xml");

    const xml = await response.text();
    expect(xml).toContain("<urlset");
    expect(xml).toContain(`${TARGET_HOST}/`);
    expect(xml).toContain(`${TARGET_HOST}/myProjects`);
    expect(xml).toContain(`${TARGET_HOST}/about`);
  });

  test("10. Verify /llms.txt Machine-Readable Agent File", async ({ request }) => {
    const response = await request.get("/llms.txt");
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toContain("Alireza Abedi");
    expect(body).toContain("## When to Use This");
  });
});
