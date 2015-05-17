var app = angular.module('myApp', ['ui.router','ui.bootstrap'], function ($interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    });


app.config(function($stateProvider, $urlRouterProvider){

    $stateProvider
        .state('home',{
            url:'/home',
            templateUrl:'templates/home.html',
            controller: 'homeController'
        })
        .state('caffeineAgent',{
            url:'/caffeineAgent',
            templateUrl:'templates/caffeineAgent.html',
            controller: 'caffeineAgentController'
        })
        .state('caffeine-library',{
            url:'/caffeine-library',
            templateUrl:'templates/caffeine-library.html',
            controller: 'libraryController'
        });

});





// app.controller('homeController',function($scope){
//  $scope.greeting = 'hello world';

// });
// app.controller('caffeineAgentController',function($scope){
//  $scope.greeting = "CaffeineAgent";
// });
// app.controller('libraryController',function($scope){
//  console.log('connected');
// });
// app.controller('myController', function($scope,Drink,DrinkLibrary,$http ) {
//  var init = function() {
//       $scope.defaultForm = {
//          beverageName: "",
//          date: "",
//          caffeine: ""
//      };
//      };
//      init();

//      $scope.allDrinkList = DrinkLibrary.allDrinkList;

//      $scope.drinkList= function(obj) {
//          var newdrink = new Drink(obj.beverageName, obj.date, obj.caffeine);
//          DrinkLibrary.addDrink(newdrink).success(function(){
//              $scope.message = 'success';
//          });
//          // $scope.allDrinkList.push(newdrink);
//          console.log($scope.allDrinkList);
//          init();

        
//          };






// });