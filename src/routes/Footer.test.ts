import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import Footer from "./Footer.svelte"

describe("Footer", () => {
  it("renders the current year", () => {
    const { getByText } = render(Footer)
    const footer = getByText(/[0-9]{4}/)
    const currentYear = new Date().getFullYear()

    expect(footer).toBeTruthy()
    expect(footer.textContent).toContain(currentYear.toString())
  })
})
