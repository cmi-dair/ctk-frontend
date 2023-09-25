import { API_ROUTE } from "$lib/api/constants"
import { anonymizedReport, summarizedReport } from "$lib/stores"

export async function handleAnonymization() {
  const input = document.createElement("input")
  input.type = "file"
  input.accept = ".docx"
  input.multiple = false
  input.onchange = async () => {
    if (!input.files) return
    const file = input.files[0]
    const formData = new FormData()
    formData.append("docx_file", file)
    anonymizedReport.set(
      fetch(`${API_ROUTE}/summarization/anonymize_report`, {
        method: "POST",
        body: formData
      }).then(async res => await res.text())
    )
  }
  input.click()
}

export async function handleSummarization(anonymizedDocument: string) {
  summarizedReport.set(
    fetch(`${API_ROUTE}/summarization/summarize_report`, {
      method: "POST",
      body: JSON.stringify({ text: anonymizedDocument }),
      headers: { "Content-Type": "application/json" }
    }).then(async res => await res.text())
  )
}
