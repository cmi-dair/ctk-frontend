<!--
    @component
    @prop {TreeNode} node - The current node to render.
    @prop {number} _depth - The current depth of the node in the tree.

    A recursive component that renders a category and its children. The
    component is recursive because it renders itself if the current node has
    children. The component is used to render the category tree.

    Example usage:
    <RecursiveCategory node={root} />
 -->
<script lang="ts">
  import type { DecisionTree } from "$lib/utils"
  import { Hr, Toggle } from "flowbite-svelte"
  import { createEventDispatcher, onMount } from "svelte"

  export let node: DecisionTree
  export let _depth: number = 0

  let child: DecisionTree | undefined = undefined
  let toggles: { [key: string]: boolean } = node.getSelectedInChildren()
  let labels: string[]

  const dispatch = createEventDispatcher()
  const testIdBase: string = "testid-category"

  function shouldRenderChild(childNode: DecisionTree | undefined): boolean {
    if (!childNode) return false
    return childNode.children.length > 1 || childNode.children[0].header
  }

  function onToggleChange(label: string): void {
    const selectedChild = node.children.find(child => child.text === label)
    if (!selectedChild) return
    node.setAllSelected(false)
    node.selected = true
    selectedChild.selected = toggles[label]
    toggles = node.getSelectedInChildren()
    dispatch("change")
  }

  function onChildToggleChange(): void {
    dispatch("change")
  }

  onMount(() => {
    toggles = labels
      .map(label => ({ [label]: false }))
      .reduce((allToggles, currentToggle) => ({ ...allToggles, ...currentToggle }), {})
  })

  $: labels = node.children.map(child => child.text)
  $: toggles, (child = node.children.find(child => toggles[child.text]))
</script>

{#if node.header}
  <div class="columns-2xs">
    {#each labels as label, index}
      <div class="flex items-center mb-2 mr-2">
        <Toggle
          name="tree"
          bind:checked={toggles[label]}
          value={label}
          on:change={() => onToggleChange(label)}
          aria-label={"Toggle: " + label}
          data-testid={`${testIdBase}-${index}`}
        />
        <span>{label}</span>
      </div>
    {/each}
  </div>
{/if}

{#if shouldRenderChild(child)}
  <Hr />
  <svelte:self bind:node={child} _depth={_depth + 1} on:change={() => onChildToggleChange()} />
{/if}
