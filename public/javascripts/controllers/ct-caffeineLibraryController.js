var app = angular.module('myApp');

app.controller('libraryController',function($scope,DrinkLibrary,Drink, ModalService, $modal, $log){


    // $scope.totalItems = ;
    var init = function() {
       $scope.defaultForm = {
        beverageName: '',
        date: '',
        caffeineLevel: ''
      };
    };
    init();

    var editabledrinkSet = function(){
      editableArray = [];
      DrinkLibrary.getAllDrinks().success(function(data){
        for (var i = 0; i < data.length; i++) {
          if(data[i].editable) {
            editableArray.push(data[i])
          };
        };
        // $scope.currentPage = 1;
        // $scope.pageSize = 4;
        $scope.totalItems = editableArray.length;
        // console.log(Drink.myCaffeineList);
        $scope.editableDrinkList = editableArray;
      });
    };

    var unEditabledrinkSet = function(){
      unEditableArray = [];
      DrinkLibrary.getAllDrinks().success(function(data){
        for (var i = 0; i < data.length; i++) {
          if(!data[i].editable) {
            unEditableArray.push(data[i])
          };
        };
     
        // console.log(Drink.myCaffeineList);
        $scope.unEditableDrinkList = unEditableArray;
      });
    };

    editabledrinkSet();
    unEditabledrinkSet();

    $scope.drinkList= function(obj) {
      var newdrink = new Drink(obj.beverageName, obj.date, obj.caffeineLevel);
      DrinkLibrary.addDrink(newdrink).success(function(data){
          $scope.currentPage=1;
          $scope.numPerPage =20;
          $scope.maxSize=20;
          $scope.$watch("currentPage + numPerPage", function() {
          var begin = (($scope.currentPage - 1) * $scope.numPerPage)
          ,end = begin + $scope.numPerPage;
          });

        $scope.message = 'success';
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

    // $scope.currentPage=1;
    // $scope.numPerPage =20;
    // $scope.maxSize=5;
    // $scope.$watch("currentPage + numPerPage", function() {
    //   var begin = (($scope.currentPage - 1) * $scope.numPerPage)
    //   ,end = begin + $scope.numPerPage;

    // });

});