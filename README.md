# json-transformer
Modify json values with plugins.

## Install
```bash
npm i @programmerraj/json-transformer
```

## Usage
```js
import { transform } from '@programmerraj/json-transformer'

transform(3, [{
  Number: {
    enter: path => {
      path.node.value++
    }
  }
}]) // Returns 4
```
