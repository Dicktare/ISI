'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl',function($scope, $http,) {

  $scope.msg = "Genius";
  $scope.username;
  $scope.passwd;


  (function(){
    $http({
      method: 'GET',
      url: 'http://localhost:8080/locations/get'
    }).then(function successCallback(response) {
        $scope.locations = response.data;
        console.log($scope.locations);
      });
  })();

  $scope.refresh = function() {
    location.reload();
  }//refresh

  $scope.add_comment = function() {
    console.log('fuck the world');
    console.log($scope.locSelected);
    console.log($scope.comment);
    console.log($scope.email);
  }

  $scope.get_data = function() {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/all_data/'
    }).then(function successCallback(response) {
        console.log(response);
        $scope.msg = response.data;
      });
  }//get_data

  $scope.notify_users = function() {
    $http({
      method: 'POST',
      url: 'http://localhost:8080/notify_users/',
      data:{name:"rahan"}
    }).then(function successCallback(response) {
          console.log(response);
        // this callback will be called asynchronously
        // when the response is available
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
  }//notify_users

  $scope.login = function() {
    var loginData = {
      username:$scope.username,
      password:$scope.passwd
    };
    // console.log(loginData);
    $http({
      method: 'POST',
      url: 'http://localhost:8080/login/',
      data:loginData
    }).then(function successCallback(response) {
          console.log(response);
        // this callback will be called asynchronously
        // when the response is available
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
  }//login
});
