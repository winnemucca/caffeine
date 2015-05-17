
app.controller('homeController',function($scope){
	$scope.greeting = 'hello world';
});
app.controller('caffeineAgentController',function($scope){
	$scope.greeting = "CaffeineAgent";
});
app.controller('libraryController',function($scope){
	console.log('connected');
});
app.controller('myController', function($scope,Drink,DrinkLibrary,$http ) {
	var init = function() {
	 	 $scope.defaultForm = {
	 		beverageName: "",
	 		date: "",
	 		caffeine: ""
	 	};
 	};
 	init();

 	$scope.allDrinkList = DrinkLibrary.allDrinkList;
 	$scope.newArray = [];
 	$scope.drinkList= function(obj) {
 		var newdrink = new Drink(obj.beverageName, obj.date, obj.caffeine);
 		DrinkLibrary.addDrink(newdrink).success(function(data){
 			$scope.message = 'success';
 			console.log(data);
 			// $scope.data=data;
 			$scope.newArray.push(data);
 		});
 		console.log($scope.allDrinkList);
 		// console.log()
 		init();

 		};
});