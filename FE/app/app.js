'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.login',
  'myApp.version'
]);

app.controller('MainCtrl',function($scope, $window, $rootScope) {
  $scope.user = "rahan";
  $scope.changeUser = function(newVal) {
    $scope.user = newVal;
  };
});


app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/login'});
}]);
