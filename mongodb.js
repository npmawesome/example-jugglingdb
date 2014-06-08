module.exports = function(callback) {
  var jugglingdb = require('jugglingdb');
  var example = require('./example');
  var schema = new jugglingdb.Schema('mongodb', {
    url: 'mongodb://127.0.0.1/jugglingdb-example',
    safe: true
  });
  console.log('MongoDB Adapter ----------------------------------');
  example(schema, callback);
}

if(!module.parent) module.exports();
