import { NodeType } from './node'
import Path from './Path'

export type VisitorEnter<Node> = (path: Path<Node>) => void

export interface NodeVisitor<Node> {
  enter?: VisitorEnter<Node>
  exit?: VisitorEnter<Node>
}

export type Visitor = {
  [Node in NodeType]?: NodeVisitor<Node>
}
