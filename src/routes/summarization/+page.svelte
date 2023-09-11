<script lang="ts">
  import { Button } from "flowbite-svelte";
  import { API_ROUTE } from "../../api/constants";

  let anonymizedDocument: Promise<string> | string | undefined = undefined;

  function handleUpload() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".docx";
    input.multiple = false;
    input.onchange = () => {
      if (!input.files) return;
      const file = input.files[0];
      const formData = new FormData();
      formData.append("file", file);
      anonymizedDocument = fetch(`${API_ROUTE}/anonymize-docx`, {
        method: "POST",
        body: formData,
      }).then((res) => res.text());
    };
    input.click();
  }
</script>

<p>
  Welcome to our Clinical Report Upload Page! Here, you can securely submit
  clinical reports for summarization, tailored for parents' understanding. These
  reports will undergo an anonymization process to ensure patient privacy and
  confidentiality. Please note that the final responsibility for verifying the
  effectiveness of anonymization lies with you. Once anonymized, the report can
  be sent to GPT-4 for generating clear and parent-friendly summaries. These
  summaries aim to provide parents with easy-to-understand information about
  their child's health.
</p>
<div>
  <Button on:click={handleUpload}>Upload</Button>
</div>

{#if anonymizedDocument !== undefined}
  {#await anonymizedDocument}
    <p>Uploading...</p>
  {:then}
    {anonymizedDocument}
  {:catch error}
    Something went wrong. Error code: <p style="color: red">{error.message}</p>
  {/await}
{/if}
