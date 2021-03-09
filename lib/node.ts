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
