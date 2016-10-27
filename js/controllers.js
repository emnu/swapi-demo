angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
  $scope.url = 'http://swapi.co/api';
})

.controller('IndexCtrl', function($scope, $http, $uibModal) {
  var starshipIds = [5,9,10,11,15];
  $scope.starships = [];

  var sort = function(data) {
    if($scope.starships.length == 0) {
      $scope.starships.push(data);
      // console.log($scope.starships[0].crew);
    }
    else {
      var x = 0;
      var starshipFound = false;
      while(!starshipFound) {
        if(parseInt(data.crew) >= parseInt($scope.starships[x].crew)) {
          starshipFound = true;
          $scope.starships.splice(x, 0, data);
        }
        else if(parseInt(data.crew) < parseInt($scope.starships[x].crew) && x == ($scope.starships.length-1)) {
          starshipFound = true;
          $scope.starships.splice(x+1, 0, data);
        }
        x++;
      }
    }
  }

  var getStarship = function(id) {
    $http.get($scope.url+'/starships/'+id[0]+'/')
    .success(function(data) {
      data.edit=false;
      data.crew_edit = data.crew;
      sort(data);
      if(starshipIds.length > 0) {
        getStarship(starshipIds.splice(0,1));
      }
    });
  }

  $scope.edit = function(key) {
    $scope.starships[key].edit = true;
  };

  $scope.ok = function(key) {
    $scope.starships[key].edit = false;
    if(parseInt($scope.starships[key].crew_edit) != parseInt($scope.starships[key].crew)) {
      $scope.starships[key].crew = $scope.starships[key].crew_edit;
      data = $scope.starships[key];
      $scope.starships.splice(key, 1);
      sort(data);
    }
    
    //@TODO: bubble sort
  }

  getStarship(starshipIds.splice(0,1));
});