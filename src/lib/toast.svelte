<script lang="ts">
  import { Toast } from "flowbite-svelte"
  import { CheckCircleSolid, CloseCircleSolid, ExclamationCircleSolid } from "flowbite-svelte-icons"

  export let open: boolean
  export let message: string
  export let type: "success" | "error" | "warning"

  var icon: typeof CheckCircleSolid | typeof CloseCircleSolid | typeof ExclamationCircleSolid

  if (type === "success") {
    icon = CheckCircleSolid
  } else if (type === "error") {
    icon = CloseCircleSolid
  } else if (type === "warning") {
    icon = ExclamationCircleSolid
  } else {
    throw new Error("Invalid type")
  }
</script>

<Toast position="bottom-right" bind:open>
  <svelte:fragment slot="icon">
    <svelte:component this={icon} />
    <span class="sr-only">Icon</span>
  </svelte:fragment>
  {message}
</Toast>
