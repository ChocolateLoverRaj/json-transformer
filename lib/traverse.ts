import { Node } from './node'
import Path from './Path'
import { Visitor } from './visitor'

const traverse = (node: Node, visitors: Visitor[]): void => {
  // Create a path
  const path = new Path(node)

  // Entering node
  visitors.forEach(visitor => {
    visitor[node.type]?.enter?.(path)
  })

  // Possible sub nodes
  switch (node.type) {
    case 'Array':
      node.elements.forEach(node => {
        traverse(node, visitors)
      })
      break
    case 'Object':
      node.entries.forEach(node => {
        traverse(node, visitors)
      })
      break
    case 'ObjectEntry':
      traverse(node.value, visitors)
  }

  // Exiting node
  visitors.forEach(visitor => {
    visitor[node.type]?.exit?.(path)
  })
}

export default traverse
