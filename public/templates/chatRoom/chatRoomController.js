angular.module('chatroom')

.controller('chatRoomController',function($scope, socket){

  socket.connectToSocket();
  console.log("hello from chatctrl");
})
