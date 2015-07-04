var app = angular.module('myApp');

app.controller('analysisController',['Drink','DrinkLibrary','$scope','$timeout',function(Drink,DrinkLibrary,$scope,$timeout){

	$scope.caffeineData = []; // could also set via $scope.caffeineData
  	DrinkLibrary.getAllDrinks().success(function(data){
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



    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    
    /* event source that pulls from google.com */
    $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
    };
    $scope.events = [
      {title: 'All Day Event',start: new Date(y, m, 1)},
      {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
      {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
      {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
    ];
    $scope.goToRootScopeDate = function(date, jsEvent, view){
      alert(date);
    };
    $scope.loading = function(isLoading, view){
      alert("is loading" + isLoading);
    }
    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        loading: $scope.loading, 
        dayClick: $scope.goToRootScopeDate,
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize, 
        defaultView: 'agendaWeek'
      }
    };

    $scope.eventSources = [$scope.events, $scope.eventSource];


}]);
