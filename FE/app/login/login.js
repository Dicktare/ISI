'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'loginCtrl'
  });
}])

.controller('loginCtrl', function($scope, $http, $location) {

  console.log($location.path());

  $scope.login = function() {
    var loginData = {
      username:$scope.username,
      password:$scope.password,
      save:$scope.saveLogin
    };
    console.log(loginData);
    $http({
      method: 'POST',
      url: 'http://localhost:8080/login/',
      data:loginData
    }).then(function successCallback(response) {
          console.log(response);
          console.log('good login');
          if(response.status === 200)
            $location.path('/view1')
      }, function errorCallback(response) {
      });
  }//login
});
