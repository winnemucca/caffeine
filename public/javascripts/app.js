var app = angular.module('myApp', ['ui.router'], function ($interpolateProvider) {
            $interpolateProvider.startSymbol('[[');
            $interpolateProvider.endSymbol(']]');
        });
app.config(function($stateProvider,$urlRouterProvider,$locationProvider){
	// $locationProvider.hashPrefix('!');
	$urlRouterProvider.otherwise('templates/home');

	$stateProvider
		.state('home',{
			url:'/home',
			templateUrl:'../views/templates/home.html'
		})
		// .state('library',{
		// 	url:'/library'
		// 	templateUrl:'/templates/drinkLibrary.html'
		// })

		
});
app.factory('Drink',function($http) {
	var Drink = function(name,date,caffeineLevel) {
 		this.name = name;
 		this.date = date;
 		this.caffeineLevel = caffeineLevel;

 	}
	return Drink;
})

// app.factory('DrinkLibrary',function($http,Drink){
// 	var allDrinkList = [];

// 	return {
// 		addDrink: function(drink) {
// 			allDrinkList.push(drink);
// 		}
// 	}
// })
// app.factory('DrinkPost',function(Drink,$http,$q){
// 		return function() {
// 			var defer = $q.defer();
// 			$http.post('/api/drinks',obj).
// 				success(function(data){
// 					console.log(data)
// 					// $scope.message ="succss"
// 				}).
// 				error(function(data){
// 					console.log('error');
// 				})

// 				return defer.promise;
// 		}
// })

app.controller('myController', function($scope,Drink,$http ) {
	var init = function() {
	 	 $scope.defaultForm = {
	 		beverageName: "",
	 		date: "",
	 		caffeine: ""
	 	};
 	}
 	init();

 	$scope.allDrinkList = [];
 	$scope.drinkList= function(obj) {
 		var newdrink = new Drink(obj.beverageName, obj.date, obj.caffeine);
 		$scope.allDrinkList.push(newdrink);
 		console.log($scope.allDrinkList);
 		init();

 		// DrinkPost().then(function(data){
 		// 	console.log(data);
 		// 	$scope.message = 'success';
 		// });
 		$http.post('/api/drinks',obj).
 			success(function(data){
 				console.log(data)
 				$scope.message = 'success';
 			}).
 			error(function(data){
 				console.log('error');
 			})

 	};
 	

});