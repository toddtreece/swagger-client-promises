'use strict';

const promisify = function promisify(operation) {

  return (...args) => {

    return new Promise((resolve, reject) => {

      args.push(response => { resolve(response); });
      args.push(response => { reject(response);  });

      operation.apply(this, args);

    });

  };

};

const process = function process(api) {

  const processed = {};

  Object.keys(api.operations).forEach(operation => {
    processed[operation] = promisify(
      api[operation]
    );
  });

  return processed;

};

const load = function load(module) {

  const apis = {};

  Object.keys(module.client.apis).forEach(api => {

    if(api === 'help')
      return;

    apis[api] = process(module.client.apis[api]);

  });

  Object.assign(module, apis);

};

module.exports = exports;
