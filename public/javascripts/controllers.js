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
    console.log(selectedDrink.name);
    console.log(selectedDrink.caffeineLevel);
    console.log(selectedDrink.date)


      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
      templateUrl: 'templates/editCaffeineDrink.html',
      controller: function($scope,$modalInstance,drink,DrinkLibrary,Drink){
                // actual drink console.log === undefined
        // console.log(drink);
        $scope.drink = drink;

        $scope.ok = function(id){
          console.log(id);
          DrinkLibrary.updateDrink(id).
          success(function(data){
            console.log(data);
          })
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
          // return $scope.selectedDrink;
          return selectedDrink;
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

app.controller('drinkEditController',function(Drink,DrinkLibrary, $scope){
	console.log('connected');


	$scope.update=function(updateDrink){
		var drink = updateDrink;
 		// DrinkLibrary.updateDrink(id).
 		// success(function(data){
 		// 	console.log(data);
 		// 	// drinkset();
 		// });
 	};

	
})


  // update function needs to loose scope
  // $scope.update=function(id){
 //     DrinkLibrary.updateDrink(id).
 //     success(function(data){
 //       console.log(data);
 //       // drinkset();
 //     });
 //   };


})