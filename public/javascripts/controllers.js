var app = angular.module('myApp');
  app.controller('homeController',function($scope){
    $scope.greeting = 'hello world';
  });
  app.controller('caffeineAgentController',function($scope){
    $scope.greeting = 'CaffeineAgent';
  });
  app.controller('libraryController',function($scope,DrinkLibrary,Drink, ModalService, $modal, $log){
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

    // here is my service modal
    $scope.update=ModalService.trigger;


	});


app.controller('drinkEditController',function(Drink,DrinkLibrary, $scope, $modal,$log){
	// console.log('connected');
	  

});

app.controller('caffeineTableController',function(DrinkLibrary,$scope){
  console.log('connected');


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


