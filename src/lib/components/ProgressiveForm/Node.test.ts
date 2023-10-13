import { fireEvent, render } from "@testing-library/svelte"
import Node from "./Node.svelte"

describe("TreeNode component", () => {
  test("should render with provided labels", () => {
    const labels = ["Option 1", "Option 2", "Option 3"]
    const { getByText } = render(Node, { labels })

    labels.forEach(label => {
      expect(getByText(label)).toBeInTheDocument()
    })
  })

  test("should toggle other options off when one is toggled on", async () => {
    const labels = ["Option 1", "Option 2", "Option 3"]
    const toggles = { "Option 1": false, "Option 2": true, "Option 3": false }
    const { component, getByLabelText } = render(Node, { labels, toggles })
    const firstToggle = getByLabelText("Toggle: Option 1")

    await fireEvent.click(firstToggle)

    expect(component.toggles["Option 1"]).toBe(true)
    expect(component.toggles["Option 2"]).toBe(false)
    expect(component.toggles["Option 3"]).toBe(false)
  })

  test("should emit change event with correct label", async () => {
    const labels = ["Option 1", "Option 2", "Option 3"]
    const toggles = { "Option 1": false, "Option 2": false, "Option 3": false }
    const { component, getByLabelText } = render(Node, { labels, toggles })
    const firstToggle = getByLabelText("Toggle: Option 1")
    const changeHandler = vitest.fn()
    component.$on("change", changeHandler)

    await fireEvent.click(firstToggle)

    expect(changeHandler).toHaveBeenCalledTimes(1)
    expect(changeHandler).toHaveBeenCalledWith(expect.objectContaining({ detail: "Option 1" }))
  })
})
