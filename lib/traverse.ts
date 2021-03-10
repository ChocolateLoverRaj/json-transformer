import { Node } from './node'
import Path from './Path'
import { Visitor } from './visitor'

const traverse = (node: Node, visitors: Visitor[], parentPath?: Path): Node => {
  // Create a path
  const path = new Path(node, parentPath)

  // Entering node
  visitors.forEach(visitor => {
    visitor[path.node.type]?.enter?.(path)
  })

  // Possible sub nodes
  switch (path.node.type) {
    case 'Array':
      path.node.elements.forEach(node => {
        traverse(node, visitors, path)
      })
      break
    case 'Object':
      path.node.entries.forEach(node => {
        traverse(node, visitors, path)
      })
      break
    case 'ObjectEntry':
      traverse(path.node.value, visitors, path)
  }

  // Exiting node
  visitors.forEach(visitor => {
    visitor[path.node.type]?.exit?.(path)
  })

  return path.node
}

export default traverse
