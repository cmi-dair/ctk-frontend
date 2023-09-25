<script lang="ts">
  import { API_ROUTE } from "$lib/api/constants"
  import Toast from "$lib/components/Toast.svelte"
  import { anonymizedReport, summarizedReport } from "$lib/stores"
  import { Button, Checkbox, Label, P, Spinner, Textarea } from "flowbite-svelte"

  let verified = false
  let correctedAnonymizedDocument = ""

  $: anonymizedPromise = $anonymizedReport
  $: summarizedPromise = $summarizedReport

  async function handleAnonymization() {
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

  async function handleSummarization() {
    summarizedReport.set(
      fetch(`${API_ROUTE}/summarization/summarize_report`, {
        method: "POST",
        body: JSON.stringify({ text: correctedAnonymizedDocument }),
        headers: { "Content-Type": "application/json" }
      }).then(async res => await res.text())
    )
  }
</script>

<p>
  Please upload the clinical report to proceed with the summarization process. The report will be anonymized before
  being sent for summarization.
</p>
<div>
  <Button on:click={handleAnonymization}>Upload</Button>
</div>

{#await anonymizedPromise}
  <Spinner />
{:then anonymizedText}
  <Label for="summary-id">Anonymized Report:</Label>
  <Textarea
    label="Summary"
    rows="10"
    id="summary-id"
    name="summary"
    value={anonymizedText.replace(/\\n/g, "\n").replace(/"/g, "")}
    disabled={anonymizedText === ""}
    bind:correctedAnonymizedDocument
  />
  <Checkbox bind:verified on:click={() => (verified = !verified)} disabled={anonymizedText === ""}>
    I have verified that the anonymization process was successful.</Checkbox
  >
  <Button on:click={handleSummarization} disabled={!verified}>Submit</Button>
{:catch error}
  <Toast open={true} type="error" message={"The following error occurred: " + error.message} />
{/await}

{#await summarizedPromise}
  <Spinner />
{:then summarizedText}
  <Label for="summary-id">Summary:</Label>
  <P id="summary-id">{summarizedText}</P>
{:catch error}
  <Toast open={true} type="error" message={"The following error occurred: " + error.message} />
{/await}
