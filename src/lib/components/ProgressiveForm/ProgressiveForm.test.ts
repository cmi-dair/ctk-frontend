import { DecisionTree } from "$lib/utils"
import { fireEvent, render } from "@testing-library/svelte"
import ProgressiveForm from "./ProgressiveForm.svelte"

describe("ProgressiveForm component", () => {
  const mockTree = [
    new DecisionTree({
      header: true,
      text: "Root",
      children: [
        { header: true, text: "Child 1", children: [{ header: false, text: "Paragraph", children: [] }] },
        {
          header: true,
          text: "Child 2",
          children: [
            { header: true, text: "Grandchild 1", children: [] },
            { header: true, text: "Grandchild 2", children: [] }
          ]
        }
      ]
    })
  ]

  test("renders root of the tree", () => {
    const { getAllByTestId } = render(ProgressiveForm, { tree: mockTree })

    const categories = getAllByTestId("testid-category-0-0")

    expect(categories.length).toBe(1)
    expect((categories[0] as HTMLInputElement).value).toBe("Child 1")
  })

  test("copies text to clipboard when copy button is clicked", async () => {
    const { getByText, getByTestId } = render(ProgressiveForm, { tree: mockTree })
    Object.assign(navigator, {
      clipboard: {
        writeText: vitest.fn()
      }
    })
    await fireEvent.click(getByTestId("testid-category-0-0"))

    await fireEvent.click(getByText("Copy"))

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("Paragraph")
  })
})
