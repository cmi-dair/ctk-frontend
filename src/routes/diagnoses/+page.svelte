<script lang="ts">
  import { API_ROUTE } from "$lib/api/constants"
  import ProgressiveForm from "$lib/components/ProgressiveForm/ProgressiveForm.svelte"
  import { diagnosesTree } from "$lib/stores"
  import { Spinner } from "flowbite-svelte"
  import { onMount } from "svelte"

  $: diagnosesPromise = $diagnosesTree

  onMount(async () => {
    diagnosesTree.set(
      fetch(`${API_ROUTE}/diagnoses`)
        .then(async res => await res.json())
        .catch(err => console.error(err))
    )
  })
</script>

{#await diagnosesPromise}
  <Spinner />
{:then diagnoses}
  <ProgressiveForm tree={diagnoses} />
{/await}
