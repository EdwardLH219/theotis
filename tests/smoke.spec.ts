import { test, expect } from "@playwright/test";
import { lawyers } from "../content/lawyers";

test.describe("smoke", () => {
  test("home renders hero headline", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", {
        name: /Counsel for Zambia/i,
        level: 1,
      }),
    ).toBeVisible();
  });

  test("expertise mega-menu opens from primary nav", async ({ page, browserName }) => {
    test.skip(browserName !== "chromium", "Hover is most reliable in chromium.");
    await page.goto("/");
    const expertiseLink = page
      .getByRole("link", { name: "Expertise", exact: true })
      .first();
    await expertiseLink.hover();
    await expect(
      page.getByRole("heading", {
        name: /Three departments/i,
      }),
    ).toBeVisible();
  });

  test("contact form requires a longer message", async ({ page }) => {
    await page.goto("/contact");
    await page.fill("#name", "A B");
    await page.fill("#email", "test@example.com");
    await page.fill("#message", "too short");
    await page.getByRole("button", { name: /Send enquiry/i }).click();
    await expect(
      page.getByText(/Tell us a little more about your matter/i),
    ).toBeVisible();
  });

  test("each lawyer page resolves with a heading", async ({ page }) => {
    for (const lawyer of lawyers) {
      const res = await page.goto(`/people/${lawyer.slug}`);
      expect(res?.status(), `${lawyer.slug} HTTP`).toBeLessThan(400);
      await expect(
        page.getByRole("heading", { name: lawyer.name, level: 1 }),
      ).toBeVisible();
    }
  });

  test("sitemap.xml lists all key paths", async ({ page }) => {
    const res = await page.goto("/sitemap.xml");
    const text = (await res?.text()) ?? "";
    expect(text).toContain("/about");
    expect(text).toContain("/expertise/litigation");
    expect(text).toContain("/people/anne-desiree-armanda-theotis");
  });
});
