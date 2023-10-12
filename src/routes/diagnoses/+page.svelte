<!--
  The page for selecting diagnoses. It contains a form that allows the user to select a diagnosis from a tree of
  diagnoses. Once a diagnosis is selected, a text will appear that can be copied and pasted into the report.
-->

<script lang="ts">
  import { API_ROUTE } from "$lib/api"
  import ProgressiveForm from "$lib/components/ProgressiveForm/ProgressiveForm.svelte"
  import { diagnosesTree } from "$lib/stores"
  import { TreeNode } from "$lib/utils"
  import { P, Spinner } from "flowbite-svelte"
  import { onMount } from "svelte"

  onMount(async () => {
    const response = await fetch(`${API_ROUTE}/diagnoses`)
    const diagnoses = await response.json()
    const tree = diagnoses.map((diagnosis: any) => new TreeNode(diagnosis))
    diagnosesTree.set(tree)
  })
</script>

<P class="mb-5">
  Please select a diagnosis that applies to your patient. Once you have selected a diagnosis, a text will appear that
  you can copy and paste into your report.
</P>
{#if !$diagnosesTree}
  <Spinner />
{:else}
  <ProgressiveForm tree={$diagnosesTree} />
{/if}
