angular.module('chatroom')

.service('socketService', function() {
  var self = this;
  var socket;

  self.connectToSocket = function() {
     socket = io.connect('http://localhost:3000');
     return socket;
  }

})
