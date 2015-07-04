var app = angular.module('myApp');

app.factory('DrinkLibrary',['$http','Drink','$q',function($http,Drink,$q) {
  
  function getAllDrinks(){
    return $http.get('/api/drinks')
  }

  function addDrink(drink) {
    
    return $http.post('/api/drinks',drink).
    success(function(data){
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
    // 
    if(!payload.editable){
      return addDrink(angular.copy(payload,{editable:true}))
    } 
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
}]);