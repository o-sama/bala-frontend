import { expect, test } from "@playwright/test"

// Deterministic browser integration checks; device audio quality needs listening on the actual phone.
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    const speech = { spoken: [] as string[], cancellations: 0 }
    Object.assign(window, { __balaSpeech: speech })
    Object.defineProperty(window, "SpeechSynthesisUtterance", {
      value: class { text: string; constructor(text: string) { this.text = text } }, configurable: true,
    })
    const synthesis = Object.assign(new EventTarget(), {
      getVoices: () => [
        { name: "English", voiceURI: "english", lang: "en-CA", default: true },
        { name: "Arabic", voiceURI: "arabic", lang: "ar-SA", default: false },
      ],
      cancel: () => { speech.cancellations += 1 },
      speak: (utterance: SpeechSynthesisUtterance) => { speech.spoken.push(utterance.text) },
    })
    Object.defineProperty(window, "speechSynthesis", { value: synthesis, configurable: true })
  })
})

test("keeps the demo fallback and hides owner setup", async ({ page }) => {
  await page.goto("/#/p/nonexistent-demo")
  await expect(page.getByText("Alex Morgan", { exact: true })).toBeVisible()
  await page.goto("/#/owner/talia")
  await expect(page.getByText("Talia", { exact: true })).toBeVisible()
  await expect(page).toHaveURL(/#\/p\/talia$/)
})

test("preserves the selected section and large text in staff mode", async ({ page }) => {
  await page.goto("/#/p/alex-demo")
  await page.getByRole("button", { name: "Large text", exact: true }).click()
  await page.getByRole("tab", { name: "Medicine allergies" }).click()
  await expect(page.getByText("Hives and itching")).toBeVisible()
  await page.getByRole("button", { name: "Show to staff" }).click()
  await expect(page).toHaveURL(/staff\/medicine$/)
  await expect(page.getByRole("heading", { name: "Medicine allergy — do not administer" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Safe preparation checklist" })).toHaveCount(0)
  await expect(page.getByRole("button", { name: "Large text", exact: true })).toHaveAttribute("aria-pressed", "true")
  await page.getByRole("button", { name: "Back", exact: true }).click()
  await expect(page.getByRole("tab", { name: "Medicine allergies" })).toHaveAttribute("aria-selected", "true")
})

test("Arabic large text reflows without clipped content and survives reload", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 })
  await page.goto("/#/p/alex-demo")
  await page.getByRole("combobox", { name: "Language" }).click()
  await page.getByRole("option", { name: "العربية" }).click()
  await page.getByRole("button", { name: "نص كبير", exact: true }).click()
  await page.reload()
  await expect(page.locator("html")).toHaveAttribute("lang", "ar")
  await expect(page.getByRole("heading", { level: 1 })).toHaveCSS("direction", "rtl")
  await expect(page.getByRole("tabpanel")).toHaveCSS("direction", "rtl")
  await expect(page.getByRole("tablist")).toHaveCSS("direction", "rtl")
  await expect(page.getByRole("button", { name: "نص كبير", exact: true })).toHaveAttribute("aria-pressed", "true")
  const clipped = await page.locator("main").evaluate((main) => [...main.querySelectorAll("*")]
    .filter((element) => element.clientWidth > 0 && element.scrollWidth > element.clientWidth + 3)
    .map((element) => element.textContent?.slice(0, 80)))
  expect(clipped).toEqual([])
})

test("staff allergies precede emergency information and shortcut keeps the route", async ({ page }) => {
  await page.goto("/#/p/alex-demo/staff/food")
  const allergy = page.getByRole("heading", { name: "Allergies — strict avoidance" })
  const emergency = page.getByRole("heading", { name: "Emergency information" })
  const allergyBox = await allergy.boundingBox()
  const emergencyBox = await emergency.boundingBox()
  if (page.viewportSize()!.width < 900) expect(allergyBox!.y).toBeLessThan(emergencyBox!.y)
  else expect(allergyBox!.x).toBeLessThan(emergencyBox!.x)
  await page.getByRole("link", { name: "Emergency information", exact: true }).click()
  await expect(emergency).toBeFocused()
  await expect(page).toHaveURL(/staff\/food$/)
})

test("tab changes cancel old speech and read only the selected profile section", async ({ page }) => {
  await page.goto("/#/p/alex-demo")
  await page.getByRole("button", { name: "Read aloud", exact: true }).click()
  await expect(page.getByRole("button", { name: "Stop reading", exact: true })).toBeVisible()
  await page.getByRole("tab", { name: "Medicine allergies" }).click()
  await expect(page.getByRole("button", { name: "Read aloud", exact: true })).toBeVisible()
  await page.getByRole("button", { name: "Read aloud", exact: true }).click()
  const speech = await page.evaluate(() => (window as unknown as { __balaSpeech: { spoken: string[]; cancellations: number } }).__balaSpeech)
  expect(speech.cancellations).toBeGreaterThan(1)
  expect(speech.spoken[0]).toContain("Avoid wheat, barley, rye")
  expect(speech.spoken[1]).toContain("Recorded reaction: Hives and itching")
  expect(speech.spoken[1]).not.toContain("Walnuts")
})
