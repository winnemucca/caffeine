var app = angular.module('myApp');

app.controller('libraryController',['$scope','DrinkLibrary','Drink','ModalService','$modal','$log',function($scope,DrinkLibrary,Drink, ModalService, $modal, $log){


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

      DrinkLibrary.getAllDrinks().success(function(data){
        for (var i = 0; i < data.length; i++) {
          if(data[i].editable) {
            editableArray.push(data[i])
          };
        };
        $scope.currentPage = 1;
        $scope.totalItems = editableArray.length;

        $scope.itemsPerPage =10;
        $scope.maxSize = 10;

        $scope.setPage = function(pageNo) {
          $scope.currentPage = pageNo;
        }
        $scope.pageChanged = function() {
          $log.log('Page changed to: ' + $scope.currentPage);
        };
        
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

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
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

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    $scope.getDayClass = function(date, mode) {
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0,0,0,0);
        for (var i=0;i<$scope.events.length;i++){
          var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);
          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }
      return '';
    };


}]);