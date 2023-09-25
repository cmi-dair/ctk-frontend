<script lang="ts">
  import { Toast } from "flowbite-svelte"
  import { CheckCircleSolid, CloseCircleSolid, ExclamationCircleSolid } from "flowbite-svelte-icons"

  export let open: boolean
  export let message: string
  export let type: "success" | "error" | "warning"

  var icon: typeof CheckCircleSolid | typeof CloseCircleSolid | typeof ExclamationCircleSolid
  let color: "green" | "red" | "yellow"

  if (type === "success") {
    icon = CheckCircleSolid
    color = "green"
  } else if (type === "error") {
    icon = CloseCircleSolid
    color = "red"
  } else if (type === "warning") {
    icon = ExclamationCircleSolid
    color = "yellow"
  } else {
    throw new Error("Invalid type")
  }
</script>

<Toast position="bottom-right" {color} bind:open>
  <svelte:fragment slot="icon">
    <svelte:component this={icon} />
    <span class="sr-only">Icon</span>
  </svelte:fragment>
  {message}
</Toast>
