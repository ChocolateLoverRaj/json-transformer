import { strictEqual } from 'assert'
import { transform } from '../lib'

// Simple visitor
it('Simple visitor', () => {
  strictEqual(transform(3, [{
    Number: {
      enter: path => {
        if (path.node.type === 'Number') path.node.value++
      }
    }
  }]), 4)
})
