var async = require('async');

async.series([
  require('./redis'),
  require('./memory'),
  require('./mongodb')
]);
