angular.module('chatroom')

.controller('chatRoomController', function($scope, socketService, $http, $routeParams ,$location) {
    var socket = socketService.connectToSocket();
    $scope.error = "";
    $scope.selectedUser = "";
    $scope.messages = [];

    $scope.getAllUsers = function() {
        $http({
            method: 'GET',
            url: '/api/getAllUsers'
        }).then(function successCallback(response) {
            console.log(response);
            if (response.data == null) {
                $scope.error = "Fetching All Users Failed, Please Try Again";
            } else if (response.status == 200 && response.data != null) {
                $scope.removeSignedInUser(response.data, $routeParams.username);
            }

        }, function errorCallback(error) {
            console.log(error);
            $scope.error = "Fetching All Users Failed, Please Try Again"
        });
    }

    $scope.removeSignedInUser = function(allUsers, signedInUserName) {
        $scope.users = allUsers.filter(function(user) {
            return user.username !== signedInUserName;
        });
          $scope.error = "";
    }

    $scope.selectUser = function(selectUser) {
        if ($scope.selectedUser != selectUser) {
            $scope.messages = [];
        }
        $scope.selectedUser = selectUser;
        $scope.message = "";

    }

    $scope.sendMessage = function(message) {
        var messageDetails = {
            username: $routeParams.username,
            message: message
        }
        socket.emit('send message', messageDetails);
    }

    socket.on('get message', function(messageDetails) {
        $scope.messages.push(messageDetails);
        $scope.$apply();
    })

    $scope.logout = function() {
        $http({
            method: 'PUT',
            url: '/api/logoutUser',
            data: {username: $routeParams.username}
        }).then(function successCallback(response) {
            console.log(response);
            if (response.data == null) {
                $scope.error = "Logging out Failed, Please Try Again";
            } else if (response.status == 200 && response.data != null) {
                $location.path("/");
            }

        }, function errorCallback(error) {
            console.log(error);
            $scope.error = "Logging out Users Failed, Please Try Again"
        });
    }


})
