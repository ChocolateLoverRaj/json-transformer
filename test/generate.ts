import { strictEqual, deepStrictEqual } from 'assert'
import generate from '../lib/generate'

it('Numbers', () => {
  strictEqual(generate({
    type: 'Number',
    value: 3
  }), 3)
})

it('Arrays', () => {
  deepStrictEqual(generate({
    type: 'Array',
    elements: [{
      type: 'String',
      value: 'hi'
    }, {
      type: 'Boolean',
      value: false
    }]
  }), ['hi', false])
})

it('Objects', () => {
  deepStrictEqual(generate({
    type: 'Object',
    entries: [{
      type: 'ObjectEntry',
      key: 'a',
      value: {
        type: 'Null'
      }
    }, {
      type: 'ObjectEntry',
      key: 'b',
      value: {
        type: 'Array',
        elements: []
      }
    }]
  }), {
    a: null,
    b: []
  })
})
