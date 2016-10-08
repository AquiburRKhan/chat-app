angular.module('chatroom')

.service('socket', function() {
  var self = this;
  var socket;

  self.connectToSocket = function() {
     socket = io.connect('http://localhost:3000');
     return socket;
  }

})
