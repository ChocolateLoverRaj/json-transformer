import generate from './generate'
import { Json } from './json'
import parser from './parser'
import traverse from './traverse'
import { Visitor } from './visitor'

const transform = (json: Json, visitors: Visitor[]): Json => {
  let ast = parser(json)
  visitors.forEach(visitor => {
    ast = traverse(ast, visitor).node
  })
  return generate(ast)
}

export default transform
