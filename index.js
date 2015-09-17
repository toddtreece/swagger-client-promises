'use strict';

const Swagger = require('swagger-client');

class SwaggerPromisify extends Swagger {

  constructor(options) {

    const original = Object.assign({}, options);

    options.success = () => {

      this._promisify();

      if(typeof original.success === 'function')
        original.success();

    };

    super(options);

  }
  _promisify() {

    Object.keys(this.apis).forEach(api => {

      if(api === 'help')
        return;

      Object.keys(this.apis[api].operations).forEach(operation => {

        this.apis[api][operation] = (...args) => {

          return new Promise((resolve, reject) => {

            args.push(response => { resolve(response); });
            args.push(response => { reject(response);  });

            this.apis[api][operation].apply(this, args);

          });

        };

      });

    });

  }

}

exports = module.exports = SwaggerPromisify;
