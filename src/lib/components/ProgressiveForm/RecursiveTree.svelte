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
  import type { TreeNode } from "$lib/utils"
  import { Hr } from "flowbite-svelte"
  import { onMount } from "svelte"
  import Node from "./Node.svelte"
  import { diagnosisText } from "./componentStore"

  export let node: TreeNode
  export let _depth: number = 0

  let child: TreeNode | undefined = undefined
  let toggles: { [key: string]: boolean } = {}
  let labels: string[]

  /**
   * Determines whether a child node should be rendered. The final node should
   * not be rendered, but all other nodes should be rendered.
   * @param {TreeNode | undefined} childNode - The child node to check.
   * @returns {boolean} - Whether the child node should be rendered.
   */
  function shouldRenderChild(childNode: TreeNode | undefined): boolean {
    if (!childNode) return false
    return childNode.children.length > 1 || childNode.children[0].header
  }

  /**
   * Sets the diagnosis text based on the current child node. If the child node
   * is the final node, the diagnosis text is set to the text of the child node.
   * If the child node is not the final node, the diagnosis text is set to
   * undefined.
   */
  function setDiagnosisText(): void {
    if (!child) return
    if (!shouldRenderChild(child)) {
      diagnosisText.set(child.children[0].text)
      return
    }
    diagnosisText.set(undefined)
  }

  onMount(() => {
    toggles = labels
      .map(label => ({ [label]: false }))
      .reduce((allToggles, currentToggle) => ({ ...allToggles, ...currentToggle }), {})
  })

  $: labels = node.children.map(child => child.text)
  $: child = node.children.find(child => toggles[child.text])
  $: {
    if (child) {
      setDiagnosisText()
    }
  }
</script>

{#if node.header}
  <Node {labels} bind:toggles testIdBase={"testid-category-" + _depth} />

  {#if shouldRenderChild(child)}
    <Hr />
    <svelte:self bind:node={child} _depth={_depth + 1} />
  {/if}
{/if}
