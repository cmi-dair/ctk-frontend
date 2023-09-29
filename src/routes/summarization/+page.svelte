<!--
  This component is responsible for rendering the UI for the summarization page.
  It contains a button to upload the clinical report, a textarea to display the anonymized report,
  a checkbox to verify that the anonymization process was successful, and a button to submit the
  anonymized report for summarization.
-->

<script lang="ts">
  import Toast from "$lib/components/Toast.svelte"
  import { anonymizedReport, summarizedReport } from "$lib/stores"
  import { Button, Checkbox, Label, P, Spinner, Textarea } from "flowbite-svelte"
  import { handleAnonymization, handleSummarization } from "./requests"

  let verified = false
  let correctedAnonymizedDocument: string = ""

  $: anonymizedPromise = $anonymizedReport
  $: summarizedPromise = $summarizedReport

  /**
   * This function handles the input event for the anonymized document textarea.
   * It sets the value of the correctedAnonymizedDocument variable to the value of the textarea.
   * @param {Event} e - The input event.
   * @returns {void}
   */
  function handleInput(e: Event): void {
    if (!(e instanceof InputEvent)) return
    const target = e.target as HTMLTextAreaElement
    correctedAnonymizedDocument = target.value
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
    on:input={e => handleInput(e)}
  />
  <Checkbox bind:verified on:click={() => (verified = !verified)} disabled={anonymizedText === ""}>
    I have verified that the anonymization process was successful.</Checkbox
  >
  <Button on:click={() => handleSummarization(correctedAnonymizedDocument)} disabled={!verified}>Submit</Button>
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
