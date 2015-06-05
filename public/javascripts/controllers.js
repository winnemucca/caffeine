
app.controller('homeController',function($scope){
	$scope.greeting = 'hello world';
});
app.controller('caffeineAgentController',function($scope){
	$scope.greeting = "CaffeineAgent";
});
app.controller('libraryController',function($scope,DrinkLibrary,Drink, $modal, $log){
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
	 		console.log(Drink.myCaffeineList);
	 		$scope.allDrinkList = data;
 		});
 	};

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
 			// $scope.allDrinkList = data;
 			drinkSet();
 			console.log(data);

 		});
 	};

 	$scope.update=function(id){
 		DrinkLibrary.updateDrink(id).
 		success(function(data){
 			console.log(data);
 			// drinkset();
 		});
 	};



	// modal
 	$scope.modalUpdate = function(size,selectedDrink) {
 		console.log(selectedDrink);
	    var modalInstance = $modal.open({
	    	animation: $scope.animationsEnabled,
			templateUrl: 'templates/editCaffeineDrink.html',
			controller: function($scope,$modalInstance,drink){
				      	// actual drink console.log === undefined
				console.log(drink);
				$scope.drink = drink;

				$scope.ok = function(){
					$modalInstance.close($scope.drink);
				};

				$scope.cancel = function(){
					$modalInstance.dismiss('cancel');
				}
			},
			size: size,
			resolve: {
				      	// resolve the drink
				drink: function () {
				        	// return selected drink
					console.log(selectedDrink);
					return $scope.selectedDrink;
				}
			}
		});

		modalInstance.result.then(function (selectedItem) {
		      $scope.selected = selectedItem;
		}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});

		};  
			// end modalUpdate

			$scope.toggleAnimation = function () {
			    $scope.animationsEnabled = !$scope.animationsEnabled;
			};

});

// app.controller('drinkEditController',function(Drink,DrinkLibrary, $scope,$modalInstance){
// 	console.log('connected');

// 	  // $scope.items = items;
// 	  // $scope.selected = {
// 	  //   item: $scope.items[0]
// 	  // };

// 	  // $scope.ok = function () {
// 	  //   $modalInstance.close($scope.selected.item);
// 	  // };

// 	  // $scope.cancel = function () {
// 	  //   $modalInstance.dismiss('cancel');
// 	  // };
// })




