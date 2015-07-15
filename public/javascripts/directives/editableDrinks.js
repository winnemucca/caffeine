app.directive('editable-drinkset', function(DrinkLibrary,ModalService,$modal,$log,_) {
	return {
		restrict: "E",
		templateUrl:"javascripts/directives/editableDrinkTable.html",
		link: function(scope, element, attrs) {
			editableArray = [];
			scope.editableDrinkList = editableArray;

			DrinkLibrary.getAllDrinks().success(function(data) {
				for(var i = 0;i <data.length;i++) {
					if(data[i].editable) {
						editableArray.push(data[i]);
					};
				};
				scope.totalItems = editableArray.length;
			})
		}
	}
})