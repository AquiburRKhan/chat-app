angular.module('user')

.controller('signinController',function($scope, $http){
  console.log("hello from signinctrl");

$scope.login = function(username, password){
  console.log(username);
  console.log(password);
  $http({
  method: 'POST',
  url: '/login',
  data: {username: username, password: password}
}).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
}

})
