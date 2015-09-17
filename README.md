# swagger-client promisify [![Build Status](https://travis-ci.org/toddtreece/swagger-client-promises.svg?branch=master)](https://travis-ci.org/toddtreece/swagger-client-promises)

An ES6 promise wrapper for [swagger-client](https://www.npmjs.com/package/swagger-client).

## Requirements

This module is a [npm](https://www.npmjs.org) package, and requires
the latest stable version of [node.js](https://nodejs.org).

```
$ node -v
v4.0.0
```

## Installation
```
$ npm install swagger-client-promises
```

## Usage
This wrapper turns every API operation into an ES6 promise, and leaves the rest
of the `swagger-client` interface intact.

Here's a modified version of the example from the [swagger-client README](https://github.com/swagger-api/swagger-js#calling-an-api-with-swagger--nodejs).
```
const client = require('swagger-client-promises');

const swagger = new client({
  url: 'http://petstore.swagger.io/v2/swagger.json',
  success: () => {
    swagger.pet.getPetById({petId: 7}, {responseContentType: 'application/json'})
    .then(pet => {
      console.log('pet', pet);
    })
    .catch(err => {
      console.log(err);
    });
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing
coding style. Add unit tests for any new or changed functionality.
Lint and test your code using [Gulp](http://gulpjs.com/).

## License

Copyright (c) 2015 Todd Treece. Licensed under the MIT license.
