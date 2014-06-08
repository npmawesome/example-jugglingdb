var async = require('async');
var Schema = require('jugglingdb').Schema;

module.exports = function(schema, callback) {
  var Post = schema.define('Post', {
    title: {type: String,  limit: 255},
    content: {type: Schema.Text},
    date: {type: Date, default: function () { return new Date; }},
    published: {type: Boolean, default: false, index: true}
  });

  var User = schema.define('User', {
    name: {type: String, index: true}
  });

  User.hasMany(Post, {
    as: 'posts',
    foreignKey: 'userId'
  });

  Post.belongsTo(User, {
    as: 'author',
    foreignKey: 'userId'
  });

  function cleanup(callback) {
    User.destroyAll(function() {
      Post.destroyAll(callback);
    });
  }

  function setup(callback) {
    var user = new User({name: 'Alex'});

    user.save(function (err, user) {
      var post = user.posts.build({
        title: 'Hello world',
        content: 'This is a post'
      });

      post.save(function(err, post) {
        callback();
      });
    });
  }

  function check(callback) {
    User.findOne({where: {name: 'Alex'}}, function(err, user) {
      console.log(user);

      user.posts(function(err, posts) {
        console.log(posts);
        callback();
      })
    });
  }

  async.series([cleanup, setup, check, cleanup], function() {
    schema.adapter.disconnect && schema.adapter.disconnect();
    callback && callback();
  });
}