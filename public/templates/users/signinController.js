angular.module('user')

.controller('signinController',function($scope, $http, $location){
  $scope.error = "";

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
          if(response.data==null){
            $scope.error = "Incorrect username or password";
          }
          else if(response.status == 200 && response.data!=null){

          $scope.error = "";
          $location.path("/chatroom/"+ response.data.username);
          }

      }, function errorCallback(error) {
          console.log(error);
          $scope.error = "Login Failed, Please Try Again"
      });
  }

})
