var app = angular.module('myApp');

app.factory('DrinkLibrary',function($http,Drink,$q){
  
  function getAllDrinks(){
    return $http.get('/api/drinks')
  }


  // function getUneditableDrinks(){

  //   return $http.get('/api/drinks').
  //     success(function(data){
  //       console.log(data);
  //       return data;
  //   }).
  //     error(function(data){
  //       console.log('error');
  //   });
  // }

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

  function updateDrink(id,payload){
  	// need a payload for put and for post
    return $http.put('/api/drink/'+id,payload).
      success(function(data){
        console.log(data);
        return data;
      }).
      error(function(data){
        console.log('error');
      });
  }

  return {
    getAllDrinks:getAllDrinks,
    addDrink: addDrink,
    deleteDrink: deleteDrink,
    updateDrink:updateDrink
  };
});