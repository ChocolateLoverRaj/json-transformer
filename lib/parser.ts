import { Json } from './json'
import { Node, ObjectEntryNode } from './node'

const parser = (json: Json): Node => {
  switch (typeof json) {
    case 'string':
      return {
        type: 'String',
        value: json
      }
    case 'number':
      return {
        type: 'Number',
        value: json
      }
    case 'boolean':
      return {
        type: 'Boolean',
        value: json
      }
    case 'object':
      if (json === null) {
        return {
          type: 'Null'
        }
      } else if (json instanceof Array) {
        return {
          type: 'Array',
          elements: json.map(json => parser(json))
        }
      } else {
        return {
          type: 'Object',
          entries: Object.entries(json).map<ObjectEntryNode>(([key, value]) => ({
            type: 'ObjectEntry',
            key: key,
            value: parser(value)
          }))
        }
      }
    default:
      throw new Error('Invalid type')
  }
}

export default parser
