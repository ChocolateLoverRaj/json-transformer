import generate from './generate'
import { Json } from './json'
import parser from './parser'
import traverse from './traverse'
import { Visitor } from './visitor'

const transform = (json: Json, visitors: Visitor[]): Json => {
  const ast = parser(json)
  const transformedAst = traverse(ast, visitors).node
  return generate(transformedAst)
}

export default transform
