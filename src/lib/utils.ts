/**
 * Represents a node in the API tree returned by the server.
 */
interface ApiTreeNodeResponse {
  text: string
  children: ApiTreeNodeResponse[]
}

/**
 * Represents a node in a tree data structure.
 */
export class TreeNode {
  text: string
  children: TreeNode[]

  constructor(tree: ApiTreeNodeResponse) {
    this.text = tree.text
    this.children = tree.children.map(child => new TreeNode(child))
  }

  /**
   * Returns the depth of the tree rooted at this node.
   * @returns The depth of the tree rooted at this node.
   */
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
}
