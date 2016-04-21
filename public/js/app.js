var app = angular.module("IdeApp",[]);

app.controller("IdeController",
function($scope,$http) {
  $http.get("/rest/developer").success(
    function(response) {
      $scope.developers = response;
    });

    $scope.add = function(dev){
      $http.post('/rest/developer',dev).
      success(function(response) {
        $scope.developers = response;
      });
    }

    $scope.remove = function(index){
      $http.delete('/rest/developer/'+index).
      success(function(response){
        $scope.developers = response;
      })
    }

    $scope.select = function($index){
      $scope.selectedIndex = $index;
      $scope.applications = $scope.developers[$index].apps;
      }
    

});
