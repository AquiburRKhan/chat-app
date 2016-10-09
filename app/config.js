var mongoose = require('mongoose');

module.exports = function(){

  mongoose.connect('mongodb://admin:admin@ds036638.mlab.com:36638/chat-db');

  var db = mongoose.connection;

  db.once('open', function() {
    console.log("db connected!");
  });

}
