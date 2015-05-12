var app = angular.module('myApp', ['ui.router'], function ($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

app.config(function($stateProvider, $urlRouterProvider){

	$stateProvider
		.state('home',{
			url:'/home',
			templateUrl:'/templates/home.html'
		})

});

app.factory('Drink',function($http) {
	var Drink = function(name,date,caffeineLevel) {
 		this.name = name;
 		this.date = date;
 		this.caffeineLevel = caffeineLevel;

 	}

	return Drink;
})

app.controller('myController', function($scope,Drink,$http  ) {
	var init = function() {
	 	 $scope.defaultForm = {
	 		beverageName: "",
	 		date: "",
	 		caffeine: ""
	 	};
 	}
 	init();
 	// $scope.defaultForm = defaultForm;


 	$scope.allDrinkList = [];
 	$scope.drinkList= function(obj) {
 		var newdrink = new Drink(obj.beverageName, obj.date, obj.caffeine);
 		$scope.allDrinkList.push(newdrink);
 		console.log($scope.allDrinkList);
 		init();

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