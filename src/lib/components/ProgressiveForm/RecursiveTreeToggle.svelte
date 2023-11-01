<!--
@component

@prop {boolean} checked - Whether the toggle is checked or not.
@prop {string} value - The name of the toggle.

This component renders a toggle switch. On change it emits a change event with
the following payload:

{
  checked: boolean,
  value: string
}

-->

<script lang="ts">
  import { Toggle } from "flowbite-svelte"
  import { createEventDispatcher } from "svelte"

  export let checked: boolean
  export let value: string

  const dispatch = createEventDispatcher()

  function onToggleChange(): void {
    dispatch("change", { checked, value })
  }
</script>

<div class="flex items-center mb-2 mr-2">
  <Toggle name="tree" bind:checked bind:value on:change={onToggleChange} aria-label={"Toggle: " + value} />
  <span>{value}</span>
</div>
