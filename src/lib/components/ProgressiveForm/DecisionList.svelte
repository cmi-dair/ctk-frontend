<script lang="ts">
  import Toast from "$lib/components/Toast.svelte"
  import { Button, Listgroup } from "flowbite-svelte"
  import { TrashBinSolid } from "flowbite-svelte-icons"
  import type { Diagnosis } from "./utils"

  export let diagnoses: Diagnosis[]
  let triggerCopyToast = false

  function removeDiagnosis(diagnosis: Diagnosis): void {
    diagnoses = diagnoses.filter(d => d.text !== diagnosis.text)
  }

  function copyAllDiagnoses(): void {
    const text = diagnoses.map(d => d.text).join("\n\n")
    navigator.clipboard.writeText(text)
    triggerCopyToast = true
  }
</script>

<Button color="green" on:click={copyAllDiagnoses}>Copy All</Button>
<Button color="red" on:click={() => (diagnoses = [])}>Clear All</Button>
<Listgroup items={diagnoses} let:item>
  {#if diagnoses.length > 0}
    <div class="flex gap-3">
      <TrashBinSolid on:click={() => removeDiagnosis(item)} />{item.pathString()}
    </div>
  {/if}
</Listgroup>

<Toast bind:open={triggerCopyToast} message="Copied to clipboard" type="success" />
