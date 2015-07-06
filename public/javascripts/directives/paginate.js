angular.module('myApp');
// angular.module('myApp').controller('PaginationDemoCtrl', function ($scope, $log,DrinkLibrary,$http) {
//   console.log('connected');
//   $scope.pageSize = 4;
//   $scope.currentPage = 1;
//   getData();
//   function getData(){
//     DrinkLibrary.getAllDrinks().success(function(data){
//       $scope.totalItems = data;
//       console.log('data');
//     })
//   }

//   $scope.pageChanged = function() {
//     console.log('Page changed to: ' + $scope.currentPage);
//   };


// });

// angular.module('ui.bootstrap.demo').controller('PaginationDemoCtrl', function ($scope, $log) {
//   $scope.totalItems = 64;
//   $scope.currentPage = 4;

//   $scope.setPage = function (pageNo) {
//     $scope.currentPage = pageNo;
//   };

//   $scope.pageChanged = function() {
//     $log.log('Page changed to: ' + $scope.currentPage);
//   };

//   $scope.maxSize = 5;
//   $scope.bigTotalItems = 175;
//   $scope.bigCurrentPage = 1;
// });