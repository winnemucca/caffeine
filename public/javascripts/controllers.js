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
	// console.log('connected');
	$scope.update=function(updateDrink){
		var drink = updateDrink;

 	};


});


app.controller('analysisController',function(Drink,DrinkLibrary,$scope,$timeout){

	$scope.caffeineData = []; // could also set via $scope.caffeineData
  	DrinkLibrary.getDrinks().success(function(data){
  		$scope.caffeineData = data;
    	console.log($scope.caffeineData);
    	// return $scope.caffeineData;
    });

  	console.log($scope.caffeineData);

  	// start of timer for caffeine change
  	var value = 5;
  	$scope.value = value;

  	function countDown(){
  		$scope.value--;
  		$scope.timeout = $timeout(countDown,1000);
  	}

  	$scope.start =function(){

  		// for(var i = 0; i<=value;i--){
  		// 	if($scope.value >=0){
  		// 		countDown();
  		// }
	  	// 	else{
	  	// 		$timeout.cancel($scope.timeout);
	  	// 	}
  		// }
  		if($scope.value >=0){
  			countDown();
  		}
  		else{
  		$timeout.cancel($scope.timeout);
  		}

  		// var keepGoing = true;
  		// angular.forEach($scope.value,function(count){
  		// 	if($scope.value > 0){

  		// 	}
  		// })


  	};

  	$scope.stop = function(){
  		$timeout.cancel($scope.timeout);
  	};





});


app.controller('loginController',['$scope', '$location', 'AuthService',
  function($scope, $location, AuthService) {

    console.log(AuthService.getUserStatus());

    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function () {
          $location.path('/');
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = 'Invalid username and/or password';
          $scope.disabled = false;
          $scope.loginForm = {};
        });

    };

}]);



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


