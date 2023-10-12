import type { TreeNode } from "$lib/utils"

/**
 * Returns an array of selected keys from an array of toggle objects.
 * @param toggles - An array of toggle objects.
 * @returns An array of selected keys.
 */
export function getSelections(toggles: { [key: string]: boolean }[]): (string | undefined)[] {
  return toggles.map(toggle => {
    return Object.keys(toggle).find(key => toggle[key])
  })
}

/**
 * Returns an object containing both the labels for each selection in the tree
 * based on the current selections, and the text value of the deepest selection.
 * @param tree - The tree object containing the selections.
 * @param selections - An array of strings representing the current selections.
 * @returns An object containing both the labels and the text.
 */
export function getLabelsAndText(
  tree: TreeNode[],
  selections: (string | undefined)[]
): { labels: (string[] | undefined)[]; text: string | undefined } {
  const labels: (string[] | undefined)[] = new Array(selections.length).fill(undefined)
  let text: string | undefined = undefined
  let selected = structuredClone(tree)

  labels[0] = tree.map(node => node.text)

  for (let i = 0; i < selections.length; i++) {
    const selection = selections[i]
    if (selection === undefined) {
      break
    }

    const selectedIndex = selected.findIndex(node => node.text === selection)
    if (selectedIndex === -1) {
      break // Selection was not found in the tree
    }

    selected = selected[selectedIndex].children

    if (selected === undefined) {
      break
    }

    const new_labels = selected.filter(node => node.children.length > 0).map(node => node.text)
    if (new_labels.length > 0) {
      labels[i + 1] = new_labels
    }

    if (selected.length == 1 && selected[0].children.length === 0) {
      text = selected[0].text
      break
    }
  }

  return { labels, text }
}
