angular.module('user')

.controller('signupController', function($scope, $http, $location, socketService) {
    var socket = socketService.getSocket();
    $scope.error = "";

    $scope.signup = function(username, password) {
        $http({
            method: 'POST',
            url: '/api/createUser',
            data: {
                username: username,
                password: password
            }
        }).then(function successCallback(response) {
            console.log(response);
            if (response.status == 200) {
                $scope.error = "";
                socket.emit('user signedup');
                alert("Signup Successful");
                $location.path("/");
            }

        }, function errorCallback(error) {
            console.log(error);
            $scope.error = "Signup Failed, Please Try Again"
        });
    }
})
