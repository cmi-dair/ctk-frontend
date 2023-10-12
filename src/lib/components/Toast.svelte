<!--
  @component
  @prop {boolean} open - Whether the toast is open or not.
  @prop {string} message - The message to be displayed in the toast.
  @prop {"success" | "error" | "warning"} type - The type of toast to be displayed.

  This component renders a toast notification. It accepts three props:
  - open: a boolean representing whether the toast is open or not.
  - message: a string representing the message to be displayed in the toast.
  - type: a string representing the type of toast to be displayed. This can be
      one of "success", "error", or "warning".

  Example usage:
  <Toast open={true} type="success" message="This is a success message." />
-->
<script lang="ts">
  import { Toast } from "flowbite-svelte"
  import { CheckCircleSolid, CloseCircleSolid, ExclamationCircleSolid } from "flowbite-svelte-icons"

  export let open: boolean
  export let message: string
  export let type: "success" | "error" | "warning"

  var icon: typeof CheckCircleSolid | typeof CloseCircleSolid | typeof ExclamationCircleSolid
  let color: "green" | "red" | "yellow"

  const getIconAndColor = (): [
    typeof CheckCircleSolid | typeof CloseCircleSolid | typeof ExclamationCircleSolid,
    "green" | "red" | "yellow"
  ] => {
    switch (type) {
      case "success":
        return [CheckCircleSolid, "green"]
      case "error":
        return [CloseCircleSolid, "red"]
      case "warning":
        return [ExclamationCircleSolid, "yellow"]
      default:
        console.error("Invalid type provided to Toast component. Falling back to 'success'.")
        return [CheckCircleSolid, "green"]
    }
  }

  $: [icon, color] = getIconAndColor()
</script>

<Toast position="bottom-right" {color} bind:open>
  <svelte:fragment slot="icon">
    <svelte:component this={icon} />
    <span class="sr-only">Icon</span>
  </svelte:fragment>
  {message}
</Toast>
