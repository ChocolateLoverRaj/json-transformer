import generate from './generate'
import { Json } from './json'
import parser from './parser'
import traverse from './traverse'
import { Visitor } from './visitor'

const transform = (json: Json, visitors: Visitor[]): Json => {
  const ast = parser(json)
  traverse(ast, visitors)
  return generate(ast)
}

export default transform
