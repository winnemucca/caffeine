
app.controller('homeController',function($scope){
	$scope.greeting = 'hello world';
});
app.controller('caffeineAgentController',function($scope){
	$scope.greeting = "CaffeineAgent";
});
app.controller('libraryController',function($scope,DrinkLibrary,Drink){
	console.log('connected');
	var init = function() {
	 	 $scope.defaultForm = {
	 		beverageName: "",
	 		date: "",
	 		caffeineLevel: ""
	 	};
 	};
 	init();

 	var drinkSet = function(){
	 	DrinkLibrary.getDrinks().success(function(data){
	 		$scope.allDrinkList = data;
 		});
 	}

 	drinkSet();

 	$scope.drinkList= function(obj) {
 		var newdrink = new Drink(obj.beverageName, obj.date, obj.caffeineLevel);
 		DrinkLibrary.addDrink(newdrink).success(function(data){
	 		$scope.message = 'success';
			drinkSet();

 		});

 		init();

 	};

 	$scope.delete=function(id){
 		DrinkLibrary.deleteDrink(id).success(function(data){
 			$scope.allDrinkList = data;
 			console.log(data);
 		})
 	}

});





// app.controller('myController', function($scope,Drink,DrinkLibrary,$http ) {
// 	var init = function() {
// 	 	 $scope.defaultForm = {
// 	 		beverageName: "",
// 	 		date: "",
// 	 		caffeineLevel: ""
// 	 	};
//  	};
//  	init();

//  	$scope.allDrinkList = DrinkLibrary.allDrinkList;
 	
//  	$scope.drinkList= function(obj) {
//  		var newdrink = new Drink(obj.beverageName, obj.date, obj.caffeineLevel);
//  		DrinkLibrary.addDrink(newdrink).success(function(data){
//  			$scope.message = 'success';
//  			console.log(data);
//  		});
//  		console.log($scope.allDrinkList);
//  		// console.log()
//  		init();

//  		};

//  	$scope.delete=function(id){
//  		DrinkLibrary.deleteDrink(id).success(function(data){
//  			console.log(data);
//  		})
//  	}

 		
// });