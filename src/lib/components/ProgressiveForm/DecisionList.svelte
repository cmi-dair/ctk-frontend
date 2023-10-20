<script lang="ts">
  import Toast from "$lib/components/Toast.svelte"
  import { Listgroup, ListgroupItem, SpeedDial } from "flowbite-svelte"
  import { CopySolid, TrashBinSolid } from "flowbite-svelte-icons"
  import type { Diagnosis } from "./utils"

  export let diagnoses: Diagnosis[]
  let triggerCopyToast = false

  type ListGroupItem = Diagnosis | { specialAction: "copyAll" }

  let itemList: Array<ListGroupItem>

  function removeDiagnosis(diagnosis: Diagnosis): void {
    diagnoses = diagnoses.filter(d => d.text !== diagnosis.text)
  }

  function copyAllDiagnoses(): void {
    const text = diagnoses.map(d => d.text).join("\n\n")
    navigator.clipboard.writeText(text)
    triggerCopyToast = true
  }

  function copyOneDiagnosis(diagnosis: Diagnosis): void {
    navigator.clipboard.writeText(diagnosis.text)
    triggerCopyToast = true
  }

  function getDiagnosisPath(diagnosis: Diagnosis): string {
    return diagnosis.pathString().replace(/^root > /, "")
  }

  $: itemList = [{ specialAction: "copyAll" }, ...diagnoses]
</script>

<SpeedDial placement="top-end" textOutside tooltip="none" trigger="click">
  <Listgroup items={itemList} let:item>
    {#if "specialAction" in item && item.specialAction === "copyAll"}
      <ListgroupItem on:click={copyAllDiagnoses} active>
        <h3 class="p-1 text-center text-lg font-medium text-gray-900 dark:text-white">Copy All</h3>
      </ListgroupItem>
    {:else}
      <ListgroupItem>
        <div class="flex gap- 3 items-center">
          <TrashBinSolid on:click={() => removeDiagnosis(item)} class="cursor-pointer" />
          <CopySolid on:click={() => copyOneDiagnosis(item)} class="cursor-pointer" />
          <span>{getDiagnosisPath(item)}</span>
        </div>
      </ListgroupItem>
    {/if}
  </Listgroup>
</SpeedDial>
<Toast bind:open={triggerCopyToast} message="Copied to clipboard" type="success" />
