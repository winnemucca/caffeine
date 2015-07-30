var app = angular.module('myApp');

app.factory('ModalService', ['$modal', '$modalStack','$log',function($modal, $modalStack, $log) {
    return {
      trigger:function(selectedDrink){
        return $modal.open({
          templateUrl: 'templates/editCaffeineDrink.html',
          // templateUrl: './javascripts/directives/editDrink.html',

          controller: function($scope,$modalInstance,drink,DrinkLibrary,Drink){
            $scope.drink = drink.editable ? drink : angular.copy(drink);
            console.log('drink',$scope.drink.date);

            $scope.ok = function(id){
              DrinkLibrary.updateDrink(id,$scope.drink).
                success(function(data){
                  console.log(data);
                  $modalInstance.close($scope.drink);               
                });            
            };
            $scope.cancel = function(){
              $modalInstance.dismiss('cancel');
            };
              // end of cancel
          },
          // end of controller
          size: 'sm',
          resolve: {
                // resolve the drink
              drink: function () {
                return selectedDrink;
              }
              // end of drink function
          }
              // end of resolve
        });
          // end of modal open
      }
      // trigger closure
    };
    // return closure
}]);
// end of factory