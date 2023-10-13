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
  import RecursiveTree from "./RecursiveTree.svelte"
  import TemplateTextBox from "./TemplateTextBox.svelte"

  export let tree: TreeNode[]

  const root = tree[0]
</script>

<RecursiveTree node={root} />
<TemplateTextBox />
