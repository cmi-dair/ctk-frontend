interface ApiTreeNodeResponse {
  text: string
  children: ApiTreeNodeResponse[]
  header: boolean
}

export class DecisionTree {
  text: string
  children: DecisionTree[]
  header: boolean
  selected = false

  constructor(tree: ApiTreeNodeResponse) {
    this.text = tree.text
    this.header = tree.header
    this.children = tree.children.map(child => new DecisionTree(child))
  }

  isLeaf(): boolean {
    if (this.children === undefined) {
      throw new Error("Children is undefined")
    }
    return this.children.length === 0
  }

  getDepth(): number {
    let maxDepth = 0
    for (const child of this.children) {
      const depth = child.getDepth()
      if (depth > maxDepth) {
        maxDepth = depth
      }
    }
    return maxDepth + 1
  }

  getSelectedInChildren(): { [key: string]: boolean } {
    const refObject: { [key: string]: boolean } = {}
    this.children.forEach(child => {
      refObject[child.text] = child.selected
    })
    return refObject
  }

  setAllSelected(selected: boolean): void {
    this.selected = selected
    this.children.forEach(child => {
      child.setAllSelected(selected)
    })
  }

  getPath(): string[] {
    const path: string[] = [this.text]
    for (const child of this.children) {
      if (child.selected) {
        path.push(...child.getPath())
        break
      }
    }
    return path
  }

  getSelection(): DecisionTree {
    let selected: DecisionTree | null = null
    for (const child of this.children) {
      if (child.selected) {
        if (selected) {
          throw new Error("Multiple branches selected")
        }
        selected = child.getSelection()
      }
    }
    if (selected) {
      return selected
    }
    return this
  }
}
