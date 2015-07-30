var app = angular.module('myApp');

app.controller('analysisController',['Drink','DrinkLibrary','$scope','$timeout','ModalService','$modal','$log','_',function(Drink,DrinkLibrary,$scope,$timeout,ModalService,$modal,$log,_){

	var unEditabledrinkSet = function(){
      unEditableArray = [];
      DrinkLibrary.getAllDrinks().success(function(data){
          for (var i = 0; i < data.length; i++) {
            if(!data[i].editable) {
              unEditableArray.push(data[i])
            };
          };
        $scope.unEditableDrinkList = unEditableArray;
      });
    };

    unEditabledrinkSet();

    $scope.update = function(drink) {
      ModalService.trigger(drink).result.then(function() {
      editabledrinkSet();
      });
    };
  	// start of timer for caffeine change
  	

}]);


// var value = 5;
//     $scope.value = value;

//     function countDown(){
//       $scope.value--;
//       $scope.timeout = $timeout(countDown,1000);
//     }

//     $scope.start =function(){
//       if($scope.value >=0){
//         countDown();
//       }
//       else{
//       $timeout.cancel($scope.timeout);
//       }
//     };

//     $scope.stop = function(){
//       $timeout.cancel($scope.timeout);
//     };