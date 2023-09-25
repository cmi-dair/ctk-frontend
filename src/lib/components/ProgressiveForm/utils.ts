/**
 * Returns the depth of an object.
 * @param o - The object to calculate the depth of.
 * @returns The depth of the object.
 */
export const objectDepth = (o: any): number =>
  Object(o) === o ? 1 + Math.max(-1, ...Object.values(o).map(objectDepth)) : 0

/**
 * Returns an array of selected keys from an array of toggle objects.
 * @param toggles - An array of toggle objects.
 * @returns An array of selected keys.
 */
export function getSelections(toggles: { [x: string]: any }[]) {
  const n_toggles = toggles.length
  const selections = new Array(n_toggles).fill(undefined)

  for (let i = 0; i < n_toggles; i++) {
    for (const key in toggles[i]) {
      if (toggles[i][key]) {
        selections[i] = key
        break
      }
    }
    if (selections[i] === undefined) {
      break
    }
  }
  return selections
}
const lorem_ipsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed justo augue, condimentum vitae porta quis, facilisis a orci. Etiam ut libero elementum, maximus diam a, facilisis nisi. Morbi at euismod nibh. Suspendisse pretium odio non iaculis scelerisque. Pellentesque gravida, nunc ut sollicitudin maximus, purus elit porta dui, eu faucibus justo est at erat. Nam quis condimentum lectus. Etiam mollis ligula nulla, eu vehicula diam volutpat quis. Phasellus maximus, urna non accumsan hendrerit, mauris lorem efficitur dui, id auctor felis est quis odio. Ut mattis condimentum rutrum. Mauris bibendum aliquet imperdiet."

/**
 * Returns the text value of a given selection in a tree object.
 * @param tree - The tree object to search for the selection.
 * @param selections - An array of strings representing the selection path in the tree object.
 * @returns The text value of the selection, or undefined if the selection is not found or is not a string.
 */
export function getText(tree: { [key: string]: any }, selections: (string | undefined)[]) {
  let text: string | undefined = undefined
  let selected = { ...tree }

  for (let i = 0; i < selections.length; i++) {
    const selection = selections[i]
    if (selection === undefined) {
      break
    }
    selected = selected[selection]
    if (selected === undefined) {
      break
    }
    if (typeof selected === "string" || selected === null) {
      text = lorem_ipsum
    }
  }
  return text
}

/**
 * Returns an array of labels for each selection in the tree based on the current selections.
 * @param tree - The tree object containing the selections.
 * @param selections - An array of strings representing the current selections.
 * @returns An array of string arrays representing the labels for each selection.
 */
export function getLabels(tree: { [key: string]: any }, selections: (string | undefined)[]) {
  const labels: (string[] | undefined)[] = new Array(selections.length).fill(undefined)
  labels[0] = Object.keys(tree)
  let selected = { ...tree }
  for (let i = 1; i < selections.length; i++) {
    const selection = selections[i - 1]
    if (selection === undefined) {
      break
    }
    selected = selected[selection]
    if (typeof selected !== "string" && selected !== null && selected !== undefined) {
      labels[i] = Object.keys(selected)
    } else {
      break
    }
  }
  return labels
}
