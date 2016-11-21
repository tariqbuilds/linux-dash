
var crypto = require('crypto');
var assert = require('assert');
var should = require('should');

var auth = require('../../server/auth');

describe('auth', function () {

  it('should be undefined if type = none', function () {
    var fn = auth.fn();
    assert(fn === undefined);
  });

  it('should be handled by a custom function', function () {
    var myAuth = function (user, password) {
      return user === 'brice' && password === 'test123';
    };
    var fn = auth.fn(myAuth, {type: auth.TYPE_FUNCTION});
    fn('sacha').should.be.not.ok();
    fn('brice', 'test123').should.be.ok();
  });

  describe('should be inlined', function () {

    it('should throw an error if no credentials', function () {
      (function () {
        auth.fn({type: auth.TYPE_INLINE});
      }).should.throw();
    });

    it('should work with one user', function () {
      var fn = auth.fn({type: auth.TYPE_INLINE, credentials: {user: 'brice', password: 'test123'}});
      fn('sacha').should.not.be.ok();
      fn('brice', 'test123').should.be.ok();
    });

    it('should work with hashed password', function () {
      var credentials = [
        {user: 'brice', password: 'cc03e747a6afbbcbf8be7668acfebee5'},
        {user: 'sacha', password: '309031d05eb343448b725b09a3635f13'}
      ];
      var fn = auth.fn({
        type: auth.TYPE_INLINE,
        credentials: credentials,
        hash: 'md5'
      });
      fn('brice', 'test321').should.be.not.ok();
      fn('brice', 'test123').should.be.ok();
      fn('sacha', 'test456').should.be.ok();
    });

    it('should work with external JSON file', function () {

      (function () {
        auth.fn({type: auth.TYPE_INLINE, credentials: './credentials.txt'});
      }).should.throw();

      var fn = auth.fn({
        type: auth.TYPE_INLINE,
        credentials: __dirname + '/credentials.json',
        hash: 'md5'
      });
      fn('brice', 'test321').should.be.not.ok();
      fn('brice', 'test123').should.be.ok();
    });

  });

});
