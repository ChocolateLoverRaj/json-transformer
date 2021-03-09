import { NodeType } from './node'
import Path from './Path'

export type VisitorEnter = (path: Path) => void

export interface NodeVisitor {
  enter?: VisitorEnter
  exit?: VisitorEnter
}

export type Visitor = {
  [T in NodeType]?: NodeVisitor
}
