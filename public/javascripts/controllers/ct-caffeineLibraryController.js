app.controller('libraryController',function($scope,DrinkLibrary,Drink, ModalService, $modal, $log){

    $scope.currentPage = 1;
    $scope.pageSize = 15;

    // $scope.totalItems = ;
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
        $scope.currentPage = 1;
        $scope.pageSize = 5;
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

    // date picker 
    
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

});