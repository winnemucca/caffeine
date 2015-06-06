
app.factory('Drink',function($http) {
	var Drink = function(name,date,caffeineLevel) {
 		this.name = name;
 		// this.date = moment(date).format('L');
 		this.date = date;
 		this.caffeineLevel = caffeineLevel;

 	};
	return Drink;
});



app.factory('DrinkLibrary',function($http,Drink){
	
	return {
		getDrinks:getDrinks,
		addDrink: addDrink,
		deleteDrink: deleteDrink,
		updateDrink:updateDrink
	};

	function getDrinks(){
		return $http.get('/api/drinks').
		success(function(data){
			console.log(data);
			return data;
		}).
		error(function(data){
			console.log('error');
		})
	}

	function addDrink(drink) {
		// var allDrinkList = [];
		// this.allDrinkList.push(drink);
		return $http.post('/api/drinks',drink).
		success(function(data){
		// this.allDrinkList.push(data);

			// allDrinkList.push(data);
			console.log(data);
			return data;
		}).
		error(function(data){
			console.log('error');
		});
	}

	function deleteDrink(id){
		return $http.delete('/api/drink/'+id).
		success(function(data){
			console.log(data);
			return data;
		}).
		error(function(data){
			console.log('error');
		});
	}

	function updateDrink(id){
		return $http.put('/api/drink/'+id).
			success(function(data){
				console.log(data);
				return data;
			}).
			error(function(data){
				console.log('error');
			});
	}
});


// app.service('modalService',['$modal',function($modal){
// 	var modalDefaults = {
//             backdrop: true,
//             keyboard: true,
//             modalFade: true,
//             templateUrl: '/templates/editCaffeineDrink.html'
//         };

//         var modalOptions = {
//             closeButtonText: 'Close',
//             actionButtonText: 'OK',
//             headerText: 'Proceed?',
//             bodyText: 'Perform this action?'
//         };

//         this.showModal = function (customModalDefaults, customModalOptions) {
//             if (!customModalDefaults) customModalDefaults = {};
//             customModalDefaults.backdrop = 'static';
//             return this.show(customModalDefaults, customModalOptions);
//         };

//         this.show = function (customModalDefaults, customModalOptions) {
//             //Create temp objects to work with since we're in a singleton service
//             var tempModalDefaults = {};
//             var tempModalOptions = {};

//             //Map angular-ui modal custom defaults to modal defaults defined in service
//             angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

//             //Map modal.html $scope custom properties to defaults defined in service
//             angular.extend(tempModalOptions, modalOptions, customModalOptions);

//             if (!tempModalDefaults.controller) {
//                 tempModalDefaults.controller = function ($scope, $modalInstance) {
//                     $scope.modalOptions = tempModalOptions;
//                     $scope.modalOptions.ok = function (result) {
//                         $modalInstance.close(result);
//                     };
//                     $scope.modalOptions.close = function (result) {
//                         $modalInstance.dismiss('cancel');
//                     };
//                 }
//             }

//             return $modal.open(tempModalDefaults).result;
//         };

// }]);