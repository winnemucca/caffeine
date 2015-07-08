var app = angular.module('myApp');

  app.controller('caffeineTableController',['$scope','$http','_',function($scope,$http,_){
      
      // $scope.list=CaffeineMenu.getList;
      console.log($scope.list);

      $http.get('documents/caffeineList.json').
        success(function(data){
          console.log('success');
          // var tableData = 
          $scope.drinks = data;
          console.log('drinks',data);

          

          var totals = _.chain(data)
                            .pluck('caffeine')
                            .value();

          console.log(totals);

          var CaffDates = _.chain(data)
                            .groupBy(function(data){
                              return data.date
                            })
                            .pairs()
                            .value();
          console.log(CaffDates);
        }).
        error(function(data){
        console.log('error');
      });

        
        
  }]);

