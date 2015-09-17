'use strict';

const client = require('../index');
let swagger = false;


describe('Swagger Promises', function() {

  this.timeout(10000);

  describe('Init', function() {

    it('should create a client', function(done) {

      swagger = new client({
        url: 'http://petstore.swagger.io/v2/swagger.json',
        success: done,
        failure: done
      });

    });

  });

  describe('Operation', function() {

    it('should return a promise', function(done) {

      swagger.pet.getPetById({petId:7}, {responseContentType: 'application/json'})
      .then(pet => {
        if(pet.status === 200) return done();

        done(new Error('pet api call failed'));
      })
      .catch(done);

    });

  });

});
