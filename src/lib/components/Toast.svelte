<!--
  @component
  @prop {boolean} open - Whether the toast is open or not.
  @prop {string} message - The message to be displayed in the toast.
  @prop {"success" | "error" | "warning"} type - The type of toast to be displayed.
  @prop {number} timeoutSeconds - The number of seconds to wait before closing the toast.

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
  import { onDestroy, onMount } from "svelte"
  import { slide } from "svelte/transition"

  export let open: boolean
  export let message: string
  export let type: "success" | "error" | "warning"
  export let timeoutSeconds: number = 5

  let timeoutId: ReturnType<typeof setTimeout>

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

  const startTimeout = () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      open = false
    }, timeoutSeconds * 1000)
  }

  onMount(() => {
    if (open) startTimeout()
  })

  onDestroy(() => {
    clearTimeout(timeoutId)
  })

  $: if (open) startTimeout()
  $: [icon, color] = getIconAndColor()
</script>

<Toast class="fixed bottom-5 right-5 z-50" {color} bind:open transition={slide}>
  <svelte:fragment slot="icon">
    <svelte:component this={icon} />
    <span class="sr-only">Icon</span>
  </svelte:fragment>
  {message}
</Toast>
