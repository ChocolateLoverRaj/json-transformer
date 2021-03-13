import { Node } from './node'
import Path from './Path'
import { Visitor } from './visitor'

const traverse = (node: Node, visitor: Visitor, parentPath?: Path): Path => {
  // Create a path
  const path = new Path(node, parentPath)

  // Entering node
  visitor[path.node.type]?.enter?.(path)

  // Possible sub nodes
  switch (path.node.type) {
    case 'Array':
      path.node.elements.forEach(node => {
        traverse(node, visitor, path)
      })
      break
    case 'Object':
      path.node.entries.forEach(node => {
        traverse(node, visitor, path)
      })
      break
    case 'ObjectEntry':
      traverse(path.node.value, visitor, path)
  }

  // Exiting node
  visitor[path.node.type]?.exit?.(path)

  return path
}

export default traverse
