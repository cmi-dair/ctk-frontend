<script lang="ts">
  import Toast from "$lib/components/Toast.svelte"
  import { anonymizedReport, summarizedReport } from "$lib/stores"
  import { Button, Checkbox, Label, P, Spinner, Textarea } from "flowbite-svelte"
  import { handleAnonymization, handleSummarization } from "./requests"

  let verified = false
  let correctedAnonymizedDocument: string = ""

  $: anonymizedPromise = $anonymizedReport
  $: summarizedPromise = $summarizedReport
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
