import traverse from '../lib/traverse'
import { spy } from 'sinon'
import { deepStrictEqual, strictEqual } from 'assert'

it('Simple enter and exit', () => {
  const enterSpy = spy()
  const exitSpy = spy()

  traverse({
    type: 'String',
    value: 'a'
  }, [{
    String: {
      enter: enterSpy,
      exit: exitSpy
    }
  }])

  const expectedNode = {
    type: 'String',
    value: 'a'
  }
  strictEqual(enterSpy.calledOnce, true, 'Enter called once')
  deepStrictEqual(enterSpy.firstCall.firstArg.node, expectedNode, 'Enter called with expected node')
  strictEqual(exitSpy.calledImmediatelyAfter(enterSpy), true, 'Exit called right after enter spy')
  strictEqual(enterSpy.calledOnce, true, 'Exit called once')
  deepStrictEqual(exitSpy.firstCall.firstArg.node, expectedNode, 'Exit called with expected args')
})

it('Array enter and exit', () => {
  const arrayEnterSpy = spy()
  const arrayExitSpy = spy()
  const numberEnterSpy = spy()
  const numberExitSpy = spy()

  traverse({
    type: 'Array',
    elements: [{
      type: 'Number',
      value: 1
    }]
  }, [{
    Array: {
      enter: arrayEnterSpy,
      exit: arrayExitSpy
    },
    Number: {
      enter: numberEnterSpy,
      exit: numberExitSpy
    }
  }])

  strictEqual(arrayEnterSpy.calledOnce, true)
  strictEqual(numberEnterSpy.calledImmediatelyAfter(arrayEnterSpy), true)
  strictEqual(numberEnterSpy.calledOnce, true)
  strictEqual(numberExitSpy.calledImmediatelyAfter(numberEnterSpy), true)
  strictEqual(numberExitSpy.calledOnce, true)
  strictEqual(arrayExitSpy.calledImmediatelyAfter(numberExitSpy), true)
  strictEqual(arrayExitSpy.calledOnce, true)
})

it('Object enter and exit', () => {
  const objectEnterSpy = spy()
  const objectExitSpy = spy()
  const objectEntryEnterSpy = spy()
  const objectEntryExitSpy = spy()
  const booleanEnterSpy = spy()
  const booleanExitSpy = spy()

  traverse({
    type: 'Object',
    entries: [{
      type: 'ObjectEntry',
      key: 'a',
      value: {
        type: 'Boolean',
        value: true
      }
    }]
  }, [{
    Object: {
      enter: objectEnterSpy,
      exit: objectExitSpy
    },
    ObjectEntry: {
      enter: objectEntryEnterSpy,
      exit: objectEntryExitSpy
    },
    Boolean: {
      enter: booleanEnterSpy,
      exit: booleanExitSpy
    }
  }])

  strictEqual(objectEnterSpy.calledOnce, true)
  strictEqual(objectEntryEnterSpy.calledImmediatelyAfter(objectEnterSpy), true)
  strictEqual(objectEntryEnterSpy.calledOnce, true)
  strictEqual(booleanEnterSpy.calledImmediatelyAfter(objectEntryEnterSpy), true)
  strictEqual(booleanEnterSpy.calledOnce, true)
  strictEqual(booleanExitSpy.calledImmediatelyAfter(booleanEnterSpy), true)
  strictEqual(booleanExitSpy.calledOnce, true)
  strictEqual(objectEntryExitSpy.calledImmediatelyAfter(booleanExitSpy), true)
  strictEqual(objectEntryExitSpy.calledOnce, true)
  strictEqual(objectExitSpy.calledImmediatelyAfter(objectEntryExitSpy), true)
  strictEqual(objectExitSpy.calledOnce, true)
})
