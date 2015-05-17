
app.factory('Drink',function($http) {
	var Drink = function(name,date,caffeineLevel) {
 		this.name = name;
 		this.date = date;
 		this.caffeineLevel = caffeineLevel;

 	};
	return Drink;
});

app.factory('DrinkLibrary',function($http,Drink){
	// var dataFromServer = [];
	// return {
	// 	allDrinkList:[],
	// 	addDrink: function(drink) {
	// 		// this.allDrinkList.push(drink);
	// 		return $http.post('/api/drinks',drink).
	//  			success(function(data){
	//  			allDrinkList.push(data);
	//  				console.log(data);
	//  			}).
	//  			error(function(data){
	//  				console.log('error');
	//  			});
	 		
	// 	}
	// };
		return {
			allDrinkList:[],
			addDrink: addDrink
		};

	function addDrink(drink) {
		// var allDrinkList = [];
		this.allDrinkList.push(drink);
		return $http.post('api/drinks',drink).
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
});
