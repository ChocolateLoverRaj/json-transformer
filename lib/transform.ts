import { Json } from './json'
import parser from './parser'
import traverse from './traverse'
import { Visitor } from './visitor'

const transform = (json: Json, visitors: Visitor[]): void => {
  const ast = traverse(parser(json), visitors)
  return ast
}

export default transform
