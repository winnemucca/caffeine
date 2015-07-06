var app = angular.module('myApp');

  app.controller('caffeineTableController',['$scope','$http',function($scope,$http){
      
      // $scope.list=CaffeineMenu.getList;
      console.log($scope.list);

      $http.get('documents/caffeineList.json').
        success(function(data){
          console.log('success');
          $scope.drinks = data;
          console.log('drinks',angular.isArray($scope.drinks));
        }).
        error(function(data){
        console.log('error');
      });
        
  }]);

