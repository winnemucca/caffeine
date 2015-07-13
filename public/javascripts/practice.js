

// myApp.factory('ModalService', ['$modal', '$modalStack' function($modal, $modalStack) {
//     return {
//         trigger: function(template) {
//             $modal.open({
//                 templateUrl: template,
//                 size: 'lg',
//                 controller: function($scope, $modalInstance) {
//                     $scope.ok = function() {
//                         $modalInstance.close($scope.selected.item);
//                     };
//                     $scope.cancel = function() {
//                         $modalInstance.dismiss('cancel');
//                     };
//                 }
//             });
//         },
//         close: function(reason) {
//             $modalStack.dismissAll(reason);
//         }
//     };



// app.factory('ModalService', ['$modal', '$modalStack',function($modal, $modalStack,) {
// 		return {
// 			trigger:function(){
// 				var modalInstance = $modal.open({
// 		        	animation: $scope.animationsEnabled,
// 		       		templateUrl: 'templates/editCaffeineDrink.html',
// 		       		controller: function($scope,$modalInstance,drink,DrinkLibrary,Drink){
// 		     			$scope.drink = drink;
// 			          	$scope.ok = function(id){
// 			          		DrinkLibrary.updateDrink(id,$scope.drink).
// 				            success(function(data){
// 				            console.log(data);
// 		            	});
// 		              	$modalInstance.close($scope.drink);	        			};

// 			          	$scope.cancel = function(){
// 			           		$modalInstance.dismiss('cancel');
// 			      		};
// 		       		},
// 		  			size: size,
// 		        	resolve: {
// 		                // resolve the drink
		                
// 		          		drink: function () {
// 		             		return selectedDrink;
// 		          		}
// 		        	}
// 	    		});
// 					// end of modal open
			
// 		}
// }]);



//    
//    
//    original modal*********************************************
//    
//    
//    
//    
  // $scope.modalUpdate = function(size,selectedDrink) {
  //   console.log(selectedDrink);
   
  //     var modalInstance = $modal.open({
  //       animation: $scope.animationsEnabled,
  //       templateUrl: 'templates/editCaffeineDrink.html',
  //       controller: function($scope,$modalInstance,drink,DrinkLibrary,Drink){
  //         $scope.drink = drink;

  //         $scope.ok = function(id){
  //             DrinkLibrary.updateDrink(id,$scope.drink).
  //             success(function(data){
  //             console.log(data);
  //           });
  //             $modalInstance.close($scope.drink);
  //       };

  //         $scope.cancel = function(){
  //           $modalInstance.dismiss('cancel');
  //         };
  //       },
  //     size: size,
  //       resolve: {
  //               // resolve the drink
  //         drink: function () {
  //                 // return selected drink
  //             return selectedDrink;
  //         }
  //       }
  //   });
  //     // end of mal instance/modal open

  //   modalInstance.result.then(function (selectedItem) {
  //         $scope.selected = selectedItem;
  //   },  function () {
  //         $log.info('Modal dismissed at: ' + new Date());
  //       });
  //   };

  // modal
  
  // these are the old pagination tools that i was using.  holding on just in case
    // $scope.setPage = function(pageNo) {
        //   $scope.currentPage = pageNo;
        // }
        // $scope.pageChanged = function() {
        //   $log.log('Page changed to: ' + $scope.currentPage);
        // };
        // $scope.editableDrinkList = editableArray;