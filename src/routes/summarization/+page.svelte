<script lang="ts">
  import { API_ROUTE } from "$lib/api/constants"
  import Toast from "$lib/toast.svelte"
  import { Button, Checkbox, Label, P, Textarea } from "flowbite-svelte"

  let anonymizedDocumentPromise: Promise<string> | undefined = undefined
  let summarizedDocumentPromise: Promise<string> | undefined = undefined
  let verified = false
  let correctedAnonymizedDocument = ""
  let errorUnverifiedSubmission = false
  let errorBadAnonymizationRequest = false

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
      anonymizedDocumentPromise = fetch(`${API_ROUTE}/summarization/anonymize_report`, {
        method: "POST",
        body: formData
      }).then(async res => await res.text())
    }
    input.click()
  }

  async function handleSummarization() {
    if (!verified) {
      errorUnverifiedSubmission = true
      return
    }
    const formData = new FormData()
    formData.append("report", correctedAnonymizedDocument)
    summarizedDocumentPromise = fetch(`${API_ROUTE}/summarization/summarize_report`, {
      method: "POST",
      body: formData
    }).then(async res => await res.text())
  }
</script>

<p>
  Please upload the clinical report to proceed with the summarization process. The report will be anonymized before
  being sent for summarization.
</p>
<div>
  <Button on:click={handleAnonymization}>Upload</Button>
</div>

{#if anonymizedDocumentPromise !== undefined}
  {#await anonymizedDocumentPromise}
    <p>Processing...</p>
  {:then anonymizedDocument}
    <Label for="summary-id">Anonymized Report:</Label>
    <Textarea
      label="Summary"
      rows="10"
      id="summary-id"
      name="summary"
      value={anonymizedDocument.replace(/\\n/g, "\n").replace(/"/g, "")}
      bind:correctedAnonymizedDocument
    />
    <Checkbox bind:verified>I have verified that the anonymization process was successful.</Checkbox>
    <Button on:click={handleSummarization}>Submit</Button>
  {:catch error}
    <Toast
      bind:open={errorBadAnonymizationRequest}
      type="error"
      message={"The following error occurred: " + error.message}
    />
  {/await}
{/if}

{#if summarizedDocumentPromise !== undefined}
  {#await summarizedDocumentPromise}
    <p>Processing...</p>
  {:then summarizedDocument}
    <Label for="summary-id">Summary:</Label>
    <P id="summary-id">{summarizedDocument}</P>
  {:catch error}
    <Toast
      bind:open={errorBadAnonymizationRequest}
      type="error"
      message={"The following error occurred: " + error.message}
    />
  {/await}
{/if}

<Toast
  bind:open={errorUnverifiedSubmission}
  type="error"
  message="Please verify that the anonymization process was successful."
/>
