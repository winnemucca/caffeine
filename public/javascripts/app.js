var app = angular.module('myApp', ['ui.router','ui.bootstrap','ngResource'], function ($interpolateProvider) {
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
        })
        .state('editDrink',{
            url:'caffeineAgent/:_drinkid/editDrink',
            templateUrl:'templates/editCaffeineDrink.html'
            // controller:'drinkController'
        })

});





