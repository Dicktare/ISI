'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', function($scope, $http) {
  $scope.showData = false;
   //get all lOCATION information
   (function() {
     $http({
       method: 'GET',
       url: 'http://localhost:8080/supervisors/get'
     }).then(function successCallback(response) {
       $scope.supervisors = response.data;
       console.log($scope.supervisors);
     });
   })();

 $scope.get_Data = function() {
   for(var i = 0; i < $scope.supervisors.length; i++) {
     if($scope.supervisors[i].name === $scope.locSelected) {
      $scope.supervizor = $scope.supervisors[i];
      $scope.incidents = $scope.supervisors[i].incidents;
      console.log($scope.incidents);
      $scope.showData = true;
   }
 }
 }//get_Data

 $scope.notify_users = function() {
   $http({
     method: 'POST',
     url: 'http://localhost:8080/notify/users/'
   }).then(function successCallback(response) {
   });
 }//notify_users
});
