var app = angular.module('myApp');

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
