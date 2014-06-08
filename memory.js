module.exports = function(callback) {
  var jugglingdb = require('jugglingdb');
  var example = require('./example');
  var schema = new jugglingdb.Schema('memory');
  console.log('Memory Adapter -----------------------------------');
  example(schema, callback);
}

if(!module.parent) module.exports();
