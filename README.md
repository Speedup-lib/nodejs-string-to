# @SpeedUP/string-to

Convert all the string values in an array, an object or a single property to the best primitive type.

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

## Installation

```sh

# NPM
npm i @speedup/string-to --save

# Yarn
yarn install @speedup/string-to

```

## Usage

### Javascript

```js

const { tryAnyToPrimitive, parseArrayItemsSync, parseObjectKeysSync, } = require('@speedup/string-to');

// supports single-level array as well as N-level array
// check test/index.spec.ts to see more examples
const originalArrayD1 = [
    '123456',
    '0.123456',
    'yes',
    'November 2018',
    null,
    undefined,
];

const parsedArray = parseArrayItemsSync(originalArrayD1);

/*
    parsedArray = [
        123456,
        0.123456,
        true,
        new Date('November 2018'),
        null,
        undefined,
    ]
*/

// supports single-level object as well as N-level object
// check test/index.spec.ts to see more examples
const originalObjectD1 = {
    name: 'John Doe',
    age: '35',
    birthday: 'November 1985',
    married: 'yes',
};

const parsedObject = parseObjectKeysSync(originalObjectD1);

/*
    parsedArray = {
        name: 'John Doe',
        age: 35,
        birthday: new Date('November 1985'),
        married: true,
    }
*/

```

### TypeScript

```ts

import { tryAnyToPrimitive, parseArrayItemsSync, parseObjectKeysSync, } from '@speedup/string-to';

// supports single-level array as well as N-level array
// check test/index.spec.ts to see more examples
const originalArrayD1 = [
    '123456',
    '0.123456',
    'yes',
    'November 2018',
    null,
    undefined,
];

const parsedArray = parseArrayItemsSync(originalArrayD1);

/*
    parsedArray = [
        123456,
        0.123456,
        true,
        new Date('November 2018'),
        null,
        undefined,
    ]
*/

// supports single-level object as well as N-level object
// check test/index.spec.ts to see more examples
const originalObjectD1 = {
    name: 'John Doe',
    age: '35',
    birthday: 'November 1985',
    married: 'yes',
};

const parsedObject = parseObjectKeysSync(originalObjectD1);

/*
    parsedArray = {
        name: 'John Doe',
        age: 35,
        birthday: new Date('November 1985'),
        married: true,
    }
*/

```

And you're good to go!

## License

MIT

[npm-image]: https://img.shields.io/npm/v/@speedup/string-to.svg?color=orange
[npm-url]: https://npmjs.org/package/@speedup/string-to
[downloads-image]: https://img.shields.io/npm/dt/@speedup/string-to.svg
[downloads-url]: https://npmjs.org/package/@speedup/string-to
