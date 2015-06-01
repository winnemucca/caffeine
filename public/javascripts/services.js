
app.factory('Drink',function($http) {
	var Drink = function(name,date,caffeineLevel) {
 		this.name = name;
 		this.date = date;
 		this.caffeineLevel = caffeineLevel;

 	};
	return Drink;
});



app.factory('DrinkLibrary',function($http,Drink){
	
	return {
		getDrinks:getDrinks,
		addDrink: addDrink,
		deleteDrink: deleteDrink
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
});
