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
  import Toast from "$lib/components/Toast.svelte"
  import type { DecisionTree } from "$lib/utils"
  import { Button, Hr } from "flowbite-svelte"
  import DiagnosisCheckout from "./DiagnosisCheckout.svelte"
  import RecursiveTree from "./RecursiveTree.svelte"
  import TemplateTextBox from "./TemplateTextBox.svelte"
  import { Diagnosis } from "./utils"

  export let tree: DecisionTree[]

  let openModal = false
  let root = tree[0]
  let selectedBranch = root
  let selectedPath: string[] = []
  let selectedText: string | undefined = undefined
  let diagnoses: Diagnosis[] = []

  let toastWarningNoDiagnosesSelected = false

  function onToggleChange(): void {
    selectedBranch = root.getSelection()
    selectedPath = root.getPath()
    if (selectedBranch.children[0].isLeaf()) {
      selectedText = selectedBranch.children[0].text
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

  function onOpenModal(): void {
    if (diagnoses.length === 0) {
      toastWarningNoDiagnosesSelected = true
      return
    }
    openModal = true
  }
</script>

<RecursiveTree bind:node={root} on:change={onToggleChange} />
{#if selectedText}
  <Hr />
  <TemplateTextBox bind:text={selectedText} on:save={saveDiagnosis} />
{/if}

<Button class="end-0 bottom-0" on:click={onOpenModal}>Show {diagnoses.length} diagnoses</Button>
<DiagnosisCheckout bind:diagnoses bind:open={openModal} />

<Toast type="warning" bind:open={toastWarningNoDiagnosesSelected} message="No diagnoses selected." />
