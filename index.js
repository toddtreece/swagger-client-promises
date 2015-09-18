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

        const original = this[api][operation].bind(this);

        // TODO: replace with fat arrow & ...args once node.js has the ES6 spead operator
        this[api][operation] = function() {

          const args = Array.prototype.slice.call(arguments);

          if(! args.length)
            args.push(null);

          return new Promise((resolve, reject) => {

            args.push(response => resolve(response));
            args.push(response => reject(response));

            original.apply(this, args);

          });

        }.bind(this);

      });

    });

  }

}

exports = module.exports = SwaggerPromisify;
