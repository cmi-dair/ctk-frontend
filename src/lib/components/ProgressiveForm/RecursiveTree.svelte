<!--
    @component
    @prop {TreeNode} node - The current node to render.
    @prop {number} isRoot - Whether the current node is the root node or not.

    A wrapper for the RecursiveTreeBranch, allowing for a recursive accordion menu.

    Example usage:
    <RecursiveCategory node={root} />
 -->

<script lang="ts">
  import type { DecisionTree } from "$lib/utils"
  import { Accordion } from "flowbite-svelte"
  import { createEventDispatcher } from "svelte"
  import RecursiveTree from "./RecursiveTreeBranch.svelte"

  export let node: DecisionTree

  const dispatch = createEventDispatcher()

  function onChange(): void {
    dispatch("change")
  }
</script>

<Accordion>
  <RecursiveTree bind:node on:change={onChange} />
</Accordion>
