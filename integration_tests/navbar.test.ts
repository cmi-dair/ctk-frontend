import { expect, test } from "@playwright/test"

test("navbar allows for navigation to the home page", async ({ page }) => {
  await page.goto("/summarization")
  const homeLink = page.getByText("Clinician Toolkit")
  expect(homeLink).toBeTruthy()

  await homeLink.click()

  expect(page.url()).toMatch(/http:\/\/localhost:[0-9]+\/$/)
})
