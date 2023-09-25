<!---
  @component
  @prop {Object} tree - The tree data structure used to render the form.

  ProgressiveForm is a Svelte component that renders a form based on a tree
  data structure. It takes a tree object as a prop and recursively renders each
  level of the tree as a Category component. The user can select options at each
  level, which updates the selections array. The labels array is updated based
  on the current selections, and the text variable is updated with the selected
  options at the deepest level of the tree. The component also includes a
  resetToggles function that resets the toggles array for all levels below the
  current level when a selection is made.
-->
<script lang="ts">
  import { Hr, P } from "flowbite-svelte"
  import Category from "./Category.svelte"
  import { getLabels, getSelections, getText, objectDepth } from "./utils"

  export let tree: { [key: string]: any }

  const maxDepth = objectDepth(tree)
  let toggles: { [key: string]: boolean }[] = Array(maxDepth).fill(undefined)
  let selections: (undefined | string)[] = Array(maxDepth).fill(undefined)
  let hidden = [false, ...Array(maxDepth - 1).fill(true)]
  let labels = [Object.keys(tree), ...Array(maxDepth - 1).fill(undefined)]
  let text: string | undefined = undefined

  /**
   * Resets the toggles array for all levels below the current level when a selection is made.
   * @param {Object[]} toggles - The toggles array.
   * @param {number} depth - The current depth of the tree.
   */
  function resetToggles(toggles: { [key: string]: boolean }[], depth: number) {
    for (let i = depth + 1; i < toggles.length; i++) {
      toggles[i] = {}
    }
  }

  $: {
    selections = getSelections(toggles)
    labels = getLabels(tree, selections)
    text = getText(tree, selections)
    hidden = labels.map(value => value === undefined)
  }
</script>

{#each Array.from({ length: maxDepth }, (_, i) => i) as depth}
  <div>
    {#if !hidden[depth]}
      <Category labels={labels[depth]} bind:toggles={toggles[depth]} on:change={() => resetToggles(toggles, depth)} />
      <Hr />
    {/if}
  </div>
{/each}

{#if text}
  <P>
    {text}
  </P>
{/if}
