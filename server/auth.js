
var crypto = require('crypto');
var basicAuth = require('basic-auth-connect');

var TYPE_NONE = 'none'; // no auth
var TYPE_FUNCTION = 'function'; // custom function
var TYPE_INLINE = 'inline'; // within the config or in a JSON file

var TYPES = [TYPE_NONE, TYPE_FUNCTION, TYPE_INLINE];

// util function...
var isArray = function isArray(obj) {
  if (Array.isArray) return Array.isArray(obj);
  return Object.prototype.toString.apply(null, obj) === '[object Array]';
};

// check a credential (at least we need the user field)
var checkCredentialFn = function checkCredential(credential) {
  if (!credential.user)
    throw new Error('Invalid credential, must have a user field: ' + JSON.stringify(credential));
};

// returns the hash password function (hashed or not, that is the question)
var hashPassword = function (config) {
  var method = config.hash || 'plain';
  var digest = method !== 'plain' ? (config.digest || 'hex') : null;
  return function hashPassword(password) {
    if (method === 'plain') return password;
    return crypto.createHash(method).update(password).digest(digest);
  };
};

// returns the function to check a user, or undefined if no auth
var auth = function auth() {

  // the parameters processing
  var handler, config;
  if (arguments.length === 1) {
    var argType = typeof arguments[0];
    if (argType === 'function') {
      handler = arguments[0];
    } else {
      config = arguments[0];
    }
  } else {
    handler = arguments[0];
    config = arguments[1];
  }

  config = config || {};

  // the case we do not auth
  var type = config.type || TYPE_NONE;
  if (type === TYPE_NONE) return;
  if (TYPES.indexOf(type) === -1)
    throw new Error('Invalid type');

  // the simple case of a custom function
  // for that case, see the basic-auth-connect lib documentation
  if (type === TYPE_FUNCTION) {
    if (typeof handler !== 'function')
      throw new Error('Handler required');
    return handler;
  }

  var credentials = config.credentials;

  // the case we have a file path (for now we just accept JSON)
  if (typeof credentials === 'string') {
      if (credentials.split('.').pop() !== 'json')
        throw new Error('Only JSON file are supported');
      credentials = require(credentials);
  }

  //
  var credentialsIsArray = credentials ? isArray(credentials) : false;
  if (!credentials || (credentialsIsArray && !credentials.length))
    throw new Error('Credentials required');
  if (!credentialsIsArray) credentials = [ credentials ];

  credentials.forEach(checkCredentialFn);

  var hashPasswordFn = hashPassword(config);

  var nbCredentials = credentials.length;
  return function (user, password) {

    var matchUser = function matchUser(credential) {
      return credential.user === user && hashPasswordFn(password) === credential.password;
    };

    for (var i = 0; i < nbCredentials; i++) {
      if (matchUser(credentials[i])) return true;
    }

    return false;
  };
};

var youShouldPass = function youSouldPass(req, res, next) { next(); };

module.exports.TYPE_FUNCTION = TYPE_FUNCTION;
module.exports.TYPE_INLINE = TYPE_INLINE;

module.exports.fn = auth;
module.exports.connect = function () {
  var authFn = auth.apply(null, arguments);
  if (!authFn) return youShouldPass;
  return basicAuth(authFn);
};
