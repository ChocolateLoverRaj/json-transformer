import { Json } from './json'
import { Node } from './node'

const generate = (node: Node): Json => {
  switch (node.type) {
    case 'String':
      return node.value
    case 'Number':
      return node.value
    case 'Boolean':
      return node.value
    case 'Null':
      return null
    case 'Array':
      return node.elements.map(node => generate(node))
    case 'Object':
      return Object.fromEntries(node.entries.map(node => generate(node)) as Array<[string, Json]>)
    case 'ObjectEntry':
      return [node.key, generate(node.value)]
  }
}

export default generate
