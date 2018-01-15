'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'loginCtrl'
  });
}])

.controller('loginCtrl', function($scope, $http, $location, $rootScope) {
  (function() {
    var logged = localStorage.getItem("logged");
    if(logged != null) {
      $scope.logged = logged;
      $scope.user = localStorage.getItem("user");
      $scope.errMsg = false;
    }else {
      $scope.logged = false;
      $scope.errMsg = false;
    }
  })();

  $scope.resetErr= function() {
    $scope.errMsg = false;
  }

  $scope.logout = function() {
      console.log('logout');
      $scope.logged = false;
      changeSimpleValue("");
      localStorage.removeItem("logged");
      localStorage.removeItem("user");
  }//logout

  $scope.login = function() {
    var loginData = {
      username:$scope.username,
      password:$scope.password,
      save:$scope.saveLogin
    };

    $http({
      method: 'POST',
      url: 'http://localhost:8080/login/',
      data:loginData
    }).then(function successCallback(response) {
          if(response.status === 200) {
            var user = (response.data)[0].username;
            changeSimpleValue(user);
            $scope.logged = true;
            $scope.user = user;

            if($scope.saveLogin) {
              localStorage.setItem('logged', true);
              localStorage.setItem('user', user);
            }
            $location.path('/view1')
          }
      }, function errorCallback(response) {
        $scope.errMsg = true;
      });
  }//login
});
