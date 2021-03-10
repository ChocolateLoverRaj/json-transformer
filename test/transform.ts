import { strictEqual, deepStrictEqual } from 'assert'
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

it('Path.prototype.remove()', () => {
  deepStrictEqual(transform(['a', 2, true], [{
    String: {
      enter: path => {
        path.remove()
      }
    }
  }]), [2, true])
})

it('Replace node', () => {
  deepStrictEqual(transform([true], [{
    Boolean: {
      enter: path => {
        path.replace({
          type: 'Boolean',
          value: false
        })
      }
    }
  }]), [false])
})
