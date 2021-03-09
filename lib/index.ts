export type JsonArray = Json[]
export interface JsonObject {
  [key: string]: Json
}
export type Json = string | number | boolean | null | JsonArray | JsonObject

export type NodeType = 'String' | 'Number' | 'Boolean' | 'Null' | 'Array' | 'Object' | 'ObjectEntry'

export interface StringNode {
  type: 'String'
  value: string
}

export interface NumberNode {
  type: 'Number'
  value: number
}

export interface BooleanNode {
  type: 'Boolean'
  value: boolean
}

export interface NullNode {
  type: 'Null'
}

export interface ArrayNode {
  type: 'Array'
  elements: Node[]
}

export interface ObjectNode {
  type: 'Object'
  entries: ObjectEntryNode[]
}

export interface ObjectEntryNode {
  type: 'ObjectEntry'
  key: string
  value: Node
}

export type Node = StringNode | NumberNode | BooleanNode | NullNode | ArrayNode | ObjectNode | ObjectEntryNode

export class Path<Node> {
  node: Node

  constructor (node: Node) {
    this.node = node
  }
}

export type VisitorEnter<Node> = (path: Path<Node>) => void

export interface NodeVisitor<Node> {
  enter?: VisitorEnter<Node>
  exit?: VisitorEnter<Node>
}

export type Visitor = {
  [Node in NodeType]?: NodeVisitor<Node>
}

const parser = (json: Json): Node => {
  switch (typeof json) {
    case 'string':
      return {
        type: 'String',
        value: json
      }
    case 'number':
      return {
        type: 'Number',
        value: json
      }
    case 'boolean':
      return {
        type: 'Boolean',
        value: json
      }
    case 'object':
      if (json === null) {
        return {
          type: 'Null'
        }
      } else if (json instanceof Array) {
        return {
          type: 'Array',
          elements: json.map(json => parser(json))
        }
      } else {
        return {
          type: 'Object',
          entries: Object.entries(json).map<ObjectEntryNode>(([key, value]) => ({
            type: 'ObjectEntry',
            key: key,
            value: parser(value)
          }))
        }
      }
    default:
      throw new Error('Invalid type')
  }
}

const traverse = (node: Node, visitors: Visitor[]): void => {
  // Create a path
  const path = new Path(node)

  // Entering node
  visitors.forEach(visitor => {
    visitor[node.type]?.enter?.(path as any)
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
    visitor[node.type]?.exit?.(path as any)
  })
}

const transform = (json: Json, visitors: Visitor[]): void => {
  const ast = traverse(parser(json), visitors)
  return ast
}

export default transform
