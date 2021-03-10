import { Node, ObjectEntryNode } from './node'
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

  replaceChild (currentChild: Node, newChild: Node): void {
    switch (this.node.type) {
      case 'Array':
        this.node.elements[this.node.elements.indexOf(currentChild)] = newChild
        break
      case 'Object':
        this.node.entries[this.node.entries.indexOf(currentChild as ObjectEntryNode)] = newChild as ObjectEntryNode
        break
      case 'ObjectEntry':
        this.node.value = newChild
        break
      default:
        throw new Error(`Cannot remove child from node type: ${this.node.type}`)
    }
  }

  replace (newNode: Node): void {
    this.parentPath?.replaceChild(this.node, newNode)
    this.node = newNode
  }
}

export default Path
