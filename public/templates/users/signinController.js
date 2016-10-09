angular.module('user')

.controller('signinController', function($scope, $http, $location, socketService) {
    $scope.error = "";
    var socket;

    $scope.connectToSocket = function() {
        socket = socketService.connectToSocket();
    }

    $scope.login = function(username, password) {
        $http({
            url: '/api/loginUser',
            method: 'GET',
            params: {
                username: username,
                password: password
            }
        }).then(function successCallback(response) {
            console.log(response);
            if (response.data == null) {
                $scope.error = "Incorrect username or password";
            } else if (response.status == 200 && response.data != null && response.data.token != '') {
                $scope.error = "";
                socket.emit('user login', {
                    username: response.data.username
                });
                $location.path("/chatroom/" + response.data.username);
            }

        }, function errorCallback(error) {
            console.log(error);
            $scope.error = "Login Failed, Please Try Again"
        });
    }

})
