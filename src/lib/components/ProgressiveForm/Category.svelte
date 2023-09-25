<!--
  @component
  @prop {string[]} labels - The labels for the toggles.
  @prop {Object} toggles - Whether the toggles are checked or not.

  @event {string} change - The label of the toggle that was changed.

  This component renders a list of toggles with labels. It accepts two props:
  - labels: an array of strings representing the labels for the toggles.
  - toggles: an object representing whether the toggles are checked or not, with the keys being the labels and the values being booleans.

  This component emits a 'change' event with the label of the toggle that was changed.

  Example usage:
  <Category labels={['Option 1', 'Option 2', 'Option 3']} toggles={{'Option 1': true, 'Option 2': false, 'Option 3': false}} on:change={handleToggleChange} />
-->
<script lang="ts">
  import { createEventDispatcher } from "svelte"

  import { Toggle } from "flowbite-svelte"

  export let labels: string[]
  export let toggles: { [key: string]: boolean } = {}

  const dispatch = createEventDispatcher()

  toggles = labels.map(label => ({ [label]: false })).reduce((acc, curr) => ({ ...acc, ...curr }), {})

  /**
   * Function that triggers when the category label is changed.
   * @param {string} label - The label of the category that was changed.
   */
  function onChange(label: string): void {
    toggleOthers(label)
    dispatch("change", label)
  }

  /**
   * Toggles all other keys in the `toggles` object to false except for the given key.
   *
   * @param {string} key - The key to exclude from toggling to false.
   */
  function toggleOthers(key: string): void {
    for (const toggleKey in toggles) {
      if (toggleKey !== key) {
        toggles[toggleKey] = false
      }
    }
  }
</script>

<div class="flex flex-wrap">
  {#each labels as label}
    <div class="flex items-center mb-2 mr-2">
      <Toggle
        name="tree"
        bind:checked={toggles[label]}
        value={label}
        on:change={() => onChange(label)}
        aria-label={"Toggle: " + label}
      />
      <span>{label}</span>
    </div>
  {/each}
</div>
