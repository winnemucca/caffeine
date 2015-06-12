var app = angular.module('myApp');
app.controller('homeController',function($scope){
  $scope.greeting = 'hello world';
});
app.controller('caffeineAgentController',function($scope){
  $scope.greeting = 'CaffeineAgent';
});
app.controller('libraryController',function($scope,DrinkLibrary,Drink, $modal, $log){
  console.log('connected');
  var init = function() {
     $scope.defaultForm = {
      beverageName: '',
      date: '',
      caffeineLevel: ''
    };
  };
  init();

  var drinkSet = function(){
    DrinkLibrary.getDrinks().success(function(data){
      // console.log(Drink.myCaffeineList);
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
    // console.log(selectedDrink);
    // console.log(selectedDrink.name);
    // console.log(selectedDrink.caffeineLevel);
    // console.log(selectedDrink.date);
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
      	templateUrl: 'templates/editCaffeineDrink.html',
      	controller: function($scope,$modalInstance,drink,DrinkLibrary,Drink){
        	$scope.drink = drink;

        	$scope.ok = function(id){
          		DrinkLibrary.updateDrink(id,$scope.drink).
          		success(function(data){
           		console.log(data);
          	});
          		$modalInstance.close($scope.drink);
        };

	        $scope.cancel = function(){
	          $modalInstance.dismiss('cancel');
	        };
      	},
    	size: size,
      	resolve: {
                // resolve the drink
        	drink: function () {
                  // return selected drink
          // console.log(selectedDrink);
          // return $scope.selectedDrink;
          		return selectedDrink;
        	}
      	}
    });
      // end of mal instance/modal open

    modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
    }, 	function () {
        	$log.info('Modal dismissed at: ' + new Date());
       	});
    };
      // end modalUpdate

      $scope.toggleAnimation = function () {
          $scope.animationsEnabled = !$scope.animationsEnabled;
      };

	});

app.controller('drinkEditController',function(Drink,DrinkLibrary, $scope){
	console.log('connected');
	$scope.update=function(updateDrink){
		var drink = updateDrink;
 		
 	};

	
});




// app.controller('analysisController',function(Drink,DrinkLibrary,$scope){
// 	console.log('connected');
//   	var drinkSet = function(){
//     	DrinkLibrary.getDrinks().success(function(data){
//       		$scope.caffeineData = data;
//       		// console.log(caffeineData);
//     	});
//   	};
//   	drinkSet();
//   	console.log($scope.caffeineData);

// });

app.controller('analysisController',function(Drink,DrinkLibrary,$scope){
  console.log('connected');

  var caffeineData = []; // could also set via $scope.caffeineData
  DrinkLibrary.getDrinks().success(function(data){
  	$scope.caffeineData = data;
  	caffeineData = data;
    console.log(caffeineData);
    return caffeineData;
  });
  console.log(caffeineData);
});

app.controller('loginController',function($scope){
	console.log('connected');
});
app.controller('registerController',function($scope){
	console.log('connected');
});


// app.directives('lineChart',[
// 	function(){
// 		return {
// 			restrict: 'E',
// 			scope: {
// 				data: '='
// 			},
// 			link: function(scope, element){
// 				var margin = {top: 20, right: 20, bottom: 30, left: 40},
//           			width = 480 - margin.left - margin.right,
//           			height = 360 - margin.top - margin.bottom;
// 			}
// 		}
// 	}
// 	])


