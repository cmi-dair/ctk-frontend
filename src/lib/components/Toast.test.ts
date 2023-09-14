import { render } from "@testing-library/svelte"

import Toast from "./Toast.svelte"

describe("Toast component", () => {
  it("should render with success type", () => {
    const { getByText, getByTestId } = render(Toast, {
      open: true,
      message: "Success message",
      type: "success"
    })

    expect(getByText("Success message")).toBeInTheDocument()
  })

  it("should render with error type", () => {
    const { getByText, getByTestId } = render(Toast, {
      open: true,
      message: "Error message",
      type: "error"
    })

    expect(getByText("Error message")).toBeInTheDocument()
  })

  it("should render with warning type", () => {
    const { getByText, getByTestId } = render(Toast, {
      open: true,
      message: "Warning message",
      type: "warning"
    })

    expect(getByText("Warning message")).toBeInTheDocument()
  })
})
