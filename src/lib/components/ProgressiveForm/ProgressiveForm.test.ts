import { TreeNode } from "$lib/utils"
import { fireEvent, render } from "@testing-library/svelte"
import ProgressiveForm from "./ProgressiveForm.svelte"

describe("ProgressiveForm component", () => {
  const mockTree = [
    new TreeNode({
      text: "Root",
      children: [
        { text: "Child 1", children: [{ text: "Paragraph", children: [] }] },
        {
          text: "Child 2",
          children: [
            { text: "Grandchild 1", children: [] },
            { text: "Grandchild 2", children: [] }
          ]
        }
      ]
    })
  ]

  test("renders root of the tree", () => {
    const { getAllByTestId } = render(ProgressiveForm, { tree: mockTree })

    const categories = getAllByTestId("testid-category-0-0")

    expect(categories.length).toBe(1)
    expect((categories[0] as HTMLInputElement).value).toBe("Root")
  })

  test("adjusts the toggle state when a selection is made", async () => {
    const { getByTestId, component } = render(ProgressiveForm, { tree: mockTree })

    await fireEvent.click(getByTestId("testid-category-0-0"))

    expect(component.getToggles()[0]).toEqual({ Root: true })
  })

  test("shows deeper toggles when parent is clicked", async () => {
    const { getByTestId, queryByTestId } = render(ProgressiveForm, { tree: mockTree })

    await fireEvent.click(getByTestId("testid-category-0-0"))

    expect(getByTestId("testid-category-1-0")).toBeVisible()
    expect(queryByTestId("testid-category-2-0")).toBeNull() // Grand children.
  })

  test("copies text to clipboard when copy button is clicked", async () => {
    const { getByText, getByTestId } = render(ProgressiveForm, { tree: mockTree })
    Object.assign(navigator, {
      clipboard: {
        writeText: vitest.fn()
      }
    })
    await fireEvent.click(getByTestId("testid-category-0-0"))
    await fireEvent.click(getByTestId("testid-category-1-0"))

    await fireEvent.click(getByText("Copy"))

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("Paragraph")
  })
})
