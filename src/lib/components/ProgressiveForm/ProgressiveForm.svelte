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
  import type { TreeNode } from "$lib/utils"
  import { Button, Hr, P } from "flowbite-svelte"
  import Toast from "../Toast.svelte"
  import Category from "./Category.svelte"
  import { getLabelsAndText, getSelections } from "./utils"

  export let tree: TreeNode[]
  const createEmptyArray = <T>(value: T) => Array(maxDepth).fill(value)

  const maxDepth = tree[0].getDepth() + 1

  let toggles = createEmptyArray({})
  let labels = createEmptyArray(undefined)
  let text: string | undefined = undefined
  let triggerCopyToast = false

  export function getToggles() {
    return toggles
  }

  /**
   * Resets the toggles array for all levels below the current level when a selection is made.
   * @param {number} depth - The current depth of the tree.
   */
  function resetToggles(depth: number) {
    toggles = toggles.map((toggle, index) => (index > depth ? {} : toggle))
  }

  /**
   * Function that is called when a button is clicked.
   * @param {string} text - The text to be passed as an argument.
   */
  function onCopyButtonClick(text: string) {
    triggerCopyToast = true
    return () => {
      navigator.clipboard.writeText(text)
    }
  }

  $: {
    ;({ labels, text } = getLabelsAndText(tree, getSelections(toggles)))
  }
</script>

{#each toggles as toggle, depth}
  <div>
    {#if labels[depth]}
      <Category
        labels={labels[depth]}
        bind:toggles={toggle}
        on:change={() => resetToggles(depth)}
        testIdBase={"testid-category-" + depth}
      />
      <Hr />
    {/if}
  </div>
{/each}

{#if text}
  <Button on:click={onCopyButtonClick(text)} aria-label="Copy text to clipboard">Copy</Button>
  <P>
    {text}
  </P>
{/if}

<Toast bind:open={triggerCopyToast} message="Copied to clipboard" type="success" />
