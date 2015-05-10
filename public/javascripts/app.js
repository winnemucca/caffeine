var app = angular.module('myApp', [], function ($interpolateProvider) {
            $interpolateProvider.startSymbol('[[');
            $interpolateProvider.endSymbol(']]');
        });

app.factory('Drink',function($http) {
	var Drink = function(name,description,caffeineLevel) {
 		this.name = name;
 		this.description = description;
 		this.caffeineLevel = caffeineLevel;

 	}

	return Drink;
})

app.controller('myController', function($scope,Drink,$http  ) {
	var init = function() {
	 	 $scope.defaultForm = {
	 		beverageName: "",
	 		description: "",
	 		caffeine: ""
	 	};
 	}
 	init();
 	// $scope.defaultForm = defaultForm;


 	$scope.allDrinkList = [];
 	$scope.drinkList= function(obj) {
 		var newdrink = new Drink(obj.beverageName,obj.description,obj.caffeine);
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




 	

 	
 	  $scope.greeting = "Hello World!";

 	// var Drink = function(name,description,caffeineLevel) {
 	// 	this.name = name;
 	// 	this.description = description;
 	// 	this.caffeineLevel = caffeineLevel;

 	// }

});