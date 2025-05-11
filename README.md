> [!WARNING]
> I no longer maintain this. I switched to Rust and don't code in JS anymore. Contact me (you can email me) if you want me to put a link to a maintained alternative here.

[![Test](https://github.com/ChocolateLoverRaj/json-transformer/actions/workflows/test.yml/badge.svg)](https://github.com/ChocolateLoverRaj/json-transformer/actions/workflows/test.yml)
[![License](https://badgen.net/github/license/standard/ts-standard)](https://github.com/ChocolateLoverRaj/json-transformer/blob/main/LICENSE)
[![TS-Standard - Typescript Standard Style Guide](https://badgen.net/badge/code%20style/ts-standard/blue?icon=typescript)](https://github.com/standard/ts-standard)

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

## Contribute
[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/eslint-config-standard-with-typescript)
