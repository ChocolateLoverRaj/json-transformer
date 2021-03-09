import { deepStrictEqual } from 'assert'
import { Node } from '../lib/node'
import parser from '../lib/parser'

it('Null', () => {
  deepStrictEqual<Node>(parser(null), {
    type: 'Null'
  })
})
