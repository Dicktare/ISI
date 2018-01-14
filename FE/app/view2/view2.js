'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', function($scope, $http) {
  $scope.locations = [
    {name:'Arad'},
    {name:'Ard'},
    {name:'stuf'},
    {name:'Bucuresti'},
  ];


  $scope.add_comment = function() {
    console.log('fuck the world');
    console.log($scope.locSelected);
    console.log($scope.comment);
    console.log($scope.email);
  }//add_comment
});
