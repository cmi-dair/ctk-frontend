<!--
    @component
    @prop {DecisionTree} node - The current node to render.

    A recursive component that renders a category and its children. The
    component is recursive because it renders itself if the current node has
    children. The component is used to render the diagnosis tree. It is
    recommended to not call this component directly, but rather to use the
    RecursiveTreeRoot component.

    Example usage:
    <RecursiveCategory node={root} />
 -->
<script lang="ts">
  import type { DecisionTree } from "$lib/utils"
  import { AccordionItem } from "flowbite-svelte"
  import { createEventDispatcher, onMount } from "svelte"
  import RecursiveTreeToggle from "./RecursiveTreeToggle.svelte"

  export let node: DecisionTree

  let child: DecisionTree | undefined = undefined
  let toggles: { [key: string]: boolean } = node.getSelectedInChildren()
  let labels: string[]
  let open: boolean = true
  let selectedLabel: string | undefined = undefined

  const dispatch = createEventDispatcher()

  function shouldRenderChild(childNode: DecisionTree | undefined): boolean {
    if (!childNode) return false
    return childNode.children.length > 1 || childNode.children[0].header
  }

  function onToggleChange(checked: boolean, label: string | undefined): void {
    if (!label) return
    const selectedChild = node.children.find(child => child.text === label)
    if (!selectedChild || !checked) {
      selectedLabel = undefined
      return
    }
    node.setAllSelected(false)
    node.selected = true
    selectedChild.selected = toggles[label]
    selectedLabel = selectedChild.text
    open = false
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
  $: selectedLabel, (open = !selectedLabel)
</script>

{#if node.header}
  <AccordionItem bind:open>
    <span slot="header">
      {#if selectedLabel}
        <RecursiveTreeToggle
          bind:checked={toggles[selectedLabel]}
          value={selectedLabel}
          on:change={event => onToggleChange(event.detail.checked, event.detail.value)}
        />
      {:else}
        Current Selection
      {/if}
    </span>
    <div class="columns-2xs">
      {#each labels as label}
        <RecursiveTreeToggle
          bind:checked={toggles[label]}
          value={label}
          on:change={event => onToggleChange(event.detail.checked, event.detail.value)}
        />
      {/each}
    </div>
  </AccordionItem>
{/if}

{#if shouldRenderChild(child)}
  <svelte:self bind:node={child} on:change={() => onChildToggleChange()} />
{/if}
