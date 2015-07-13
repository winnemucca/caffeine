var app = angular.module('myApp');

app.controller('libraryController',['$scope','DrinkLibrary','Drink','ModalService','$modal','$log','_',function($scope,DrinkLibrary,Drink, ModalService, $modal, $log,_){


    // $scope.totalItems = ;
    var init = function() {
       $scope.defaultForm = {
        beverageName: '',
        date: '',
        caffeineLevel: ''
      };
    };
    init();

    $scope.click=function() {
      console.log(clicked);
    }

    

    var editabledrinkSet = function(){
      editableArray = [];
      $scope.editableDrinkList = editableArray;
      console.log('editable',editableArray);
      // next step will be to move these out and into a directive
      $scope.currentPage = 1;
      $scope.itemsPerPage =10;
      $scope.maxSize = 10;

      DrinkLibrary.getAllDrinks().success(function(data){
        for (var i = 0; i < data.length; i++) {
          if(data[i].editable) {
            editableArray.push(data[i])
          };
        }; 
        $scope.totalItems = editableArray.length;
                       
      }).then(function(result) {
        console.log(result);
        console.log(editableArray);
      })
    };
    // run the function
    editabledrinkSet();

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

    $scope.drinkList= function(obj) {
      var newdrink = new Drink(obj.beverageName, obj.date, obj.caffeineLevel);
      DrinkLibrary.addDrink(newdrink).success(function(data){
          editabledrinkSet();
          unEditabledrinkSet();
      });
      init();
    };

    $scope.delete=function(id){
      DrinkLibrary.deleteDrink(id).success(function(data){
        // $scope.allDrinkList = data;
        editabledrinkSet();
        unEditabledrinkSet();
        console.log(data);
      });
    };

    // here is my service modal
    $scope.update = function(drink) {
      ModalService.trigger(drink).result.then(function() {
      editabledrinkSet();
      });
    };
  


// datepicker
  $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };
    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

}]);