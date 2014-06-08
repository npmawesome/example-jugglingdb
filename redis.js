module.exports = function(callback) {
  var jugglingdb = require('jugglingdb');
  var example = require('./example');
  var schema = new jugglingdb.Schema('redis', {
    host: "localhost",
    port: "6379"
  });

  console.log('Redis Adapter ------------------------------------');
  example(schema, callback);
}

if(!module.parent) module.exports();
