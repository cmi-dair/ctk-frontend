import { fireEvent, render } from "@testing-library/svelte"
import TemplateTextBox from "./TemplateTextBox.svelte"
import { diagnosisText } from "./componentStore"

// Mock navigator.clipboard.writeText
Object.defineProperty(navigator, "clipboard", {
  value: {
    writeText: vitest.fn()
  }
})

describe("TemplateTextBox", () => {
  it("renders the textarea if $diagnosisText is set", async () => {
    diagnosisText.set("Test diagnosis text")
    const { getByText } = render(TemplateTextBox)

    expect(getByText("Template Text")).toBeInTheDocument()
    expect(getByText("Copy")).toBeInTheDocument()
  })

  it("does not render the textarea if $diagnosisText is empty", () => {
    diagnosisText.set("")
    const { queryByText } = render(TemplateTextBox)

    expect(queryByText("Template Text")).toBeNull()
  })

  it("copies text to clipboard on click of copy button", async () => {
    diagnosisText.set("Test diagnosis text")
    const { getByText } = render(TemplateTextBox)

    const copyButton = getByText("Copy")
    await fireEvent.click(copyButton)

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("Test diagnosis text")
  })

  it("shows toast on successful copy", async () => {
    diagnosisText.set("Test diagnosis text")
    const { getByText } = render(TemplateTextBox)

    const copyButton = getByText("Copy")
    await fireEvent.click(copyButton)

    expect(getByText("Copied to clipboard")).toBeInTheDocument()
  })
})
