angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies)

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        .when('/', {
            templateUrl: 'templates/users/signin.html',
            controller: 'signinController'
        })

        .when('/signup', {
            templateUrl: 'templates/users/signup.html',
            controller: 'signupController'
        })

        .when('/chatroom', {
            templateUrl: 'templates/chatRoom/chatRoom.html',
            controller: 'chatRoomController'
        });

    $locationProvider.html5Mode(true);

}]);
