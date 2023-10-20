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
  import type { DecisionTree } from "$lib/utils"
  import { Hr } from "flowbite-svelte"
  import DecisionList from "./DecisionList.svelte"
  import RecursiveTree from "./RecursiveTree.svelte"
  import TemplateTextBox from "./TemplateTextBox.svelte"
  import { Diagnosis } from "./utils"

  export let tree: DecisionTree[]

  let root = tree[0]
  let selectedBranch = root
  let selectedPath: string[] = []
  let selectedText: string | undefined = undefined
  let diagnoses: Diagnosis[] = []

  function onToggleChange(): void {
    selectedBranch = root.getSelection()
    selectedPath = root.getPath()
    if (selectedBranch.children[0].isLeaf()) {
      selectedText = selectedBranch.text
    } else {
      selectedText = undefined
    }
  }

  function saveDiagnosis(): void {
    if (!selectedText) return
    const diagnosis = new Diagnosis(selectedText, selectedPath)
    if (diagnoses.find(d => d.text === diagnosis.text)) return
    diagnoses = [...diagnoses, diagnosis]
  }
</script>

<RecursiveTree bind:node={root} on:change={onToggleChange} />
{#if selectedText}
  <Hr />
  <TemplateTextBox bind:text={selectedText} on:save={saveDiagnosis} />
{/if}

{#if diagnoses.length > 0}
  <DecisionList bind:diagnoses />
{/if}
