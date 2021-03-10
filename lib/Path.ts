import { Node } from './node'
import never from 'never'

class Path {
  node: Node
  parentPath?: Path

  constructor (node: Node, parentPath?: Path) {
    this.node = node
    this.parentPath = parentPath
  }

  removeChild (childNode: Node): void {
    switch (this.node.type) {
      case 'Array':
        this.node.elements = this.node.elements.filter(node => node !== childNode)
        break
      case 'Object':
        this.node.entries = this.node.entries.filter(node => node !== childNode)
        break
      default:
        throw new Error(`Cannot remove child from node type: ${this.node.type}`)
    }
  }

  remove (): void {
    (this.parentPath ?? never('No parent path')).removeChild(this.node)
  }
}

export default Path
