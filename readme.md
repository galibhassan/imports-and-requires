# Imports and Requires
A tiny tool which can
- convert ES6 `import` statements to Node.js compatible `require` statements, and
- the opposite, i.e, can convert `require` statements to `import` statements.

### Installatoin
    npm install --save imports-and-requires
### Usage
```js
const importsAndRequires = require('imports-and-requires') 
```

## API
- `importToRequire` : Function. Takes a Es6 import-string, returns:
  - a Node.js compatible require-statement, 
  - or, an array of require-statements in case of destructuring.
  ### Example 
  - Simple
    ```js
    var importStatement = `import Hogwarts from 'hogwarts'`;
    var result = importsAndRequires.importToRequire(importStatement);
    /*
     * result is a string:
     *  'const Hogwarts = require('hogwarts')'
    */
    ```

  - Destructuring
    ```js
    var importStatement = `import { Harry, Hermione, Ron } from 'hogwarts'`;
    var result = importsAndRequires.importToRequire(importStatement);
    /*
     * result is the following array of require-strings:
     *  [ 
     *    `const Harry = require('hogwarts.Gryffindor').Harry`,
     *    `const Hermione = require('hogwarts.Gryffindor').Hermione`,
     *     `const Ron = require('hogwarts.Gryffindor').Ron` 
     *  ]
    */ 
    ```

- `requireToImport` : Function. Takes a Node.js compatible require-statement, returns an Es6 compatible import-statement.
  ### Example
  ```js
    requireStatement  = `const Hogwarts = require('hogwarts')`
    result = importsAndRequires.requireToImport(requireStatement);
    /*
     * result is a string:
     *  `import Hogwarts from 'hogwarts'`
    */
  ```

  ```js
    requireStatement = `var Slytherin = require('hogwarts').Slytherin`
    result = importsAndRequires.requireToImport(requireStatement);
    /*
     * result is a string:
     *  `import Slytherin from 'hogwarts.Slytherin'
    */
  ```
  ## Acknowledgement 
  In `requireToImport` function, this package uses the `tokenizer` functionality of ESLint's [**espree**](https://github.com/eslint/espree). 
