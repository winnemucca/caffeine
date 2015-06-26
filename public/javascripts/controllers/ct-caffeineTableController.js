var app = angular.module('myApp');

  app.controller('caffeineTableController',function($scope,$http){
      
      // $scope.list=CaffeineMenu.getList;
      console.log($scope.list);

      $http.get('documents/caffeineList.json').
        success(function(data){
          console.log('success');
          $scope.drinks = data;
        }).
        error(function(data){
        console.log('error');
      });
        $scope.currentPage = 1;
        $scope.pageSize = 10;
  });