var app = angular.module('myApp');

app.factory('Drink',function($http) {
  var Drink = function(name,date,caffeineLevel,size,mgFloz) {
    this.name = name;
    // this.date = moment(date).format('L');
    this.date = date;
    this.caffeineLevel = caffeineLevel;
    this.size = size;
    this.mgFloz=mgFloz;
  };
  return Drink;
});



app.factory('DrinkLibrary',function($http,Drink,$q){
  function getDrinks(){
    return $http.get('/api/drinks').
    success(function(data){
      console.log(data);
      return data;
    }).
    error(function(data){
      console.log('error');
    });
  }


  // function getDrinks2(){
  // 	var deferred = $q.defer();
  //   $http.get('/api/drinks').
  //   success(function(data){
  //   	deferred.resolve(data);
  //     	// console.log(data);
  //     	// return data;
  //   }).
  //   error(function(data){
  //     console.log('error');
  //   });
  //   return deferred.promise;
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
    getDrinks:getDrinks,
    addDrink: addDrink,
    deleteDrink: deleteDrink,
    updateDrink:updateDrink
  };
});


app.factory('AuthService',['$q', '$timeout', '$http', function ($q, $timeout, $http) {

    // create user variable
    var user = null;

    function isLoggedIn() {
        if(user) {
          return true;
        } else {
          return false;
        }
    }

    function getUserStatus() {
      return user;
    }

    function login(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/login', {username: username, password: password})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            user = true;
            deferred.resolve();
          } else {
            user = false;
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function logout() {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a get request to the server
      $http.get('/logout')
        // handle success
        .success(function (data) {
          user = false;
          deferred.resolve();
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function register(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/register', {username: username, password: password})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    // return available functions for use in controllers
    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register
    });

  }]);



app.factory('ModalService', ['$modal', '$modalStack','$log',function($modal, $modalStack, $log) {
    return {
      trigger:function(selectedDrink){
        var modalInstance = $modal.open({
              templateUrl: 'templates/editCaffeineDrink.html',
              controller: function($scope,$modalInstance,drink,DrinkLibrary,Drink){
              $scope.drink = drink;
                  $scope.ok = function(id){
                    DrinkLibrary.updateDrink(id,$scope.drink).
                      success(function(data){
                        console.log(data);
                      });
                    $modalInstance.close($scope.drink);               };

                  $scope.cancel = function(){
                    $modalInstance.dismiss('cancel');
                };
              },
              size: 'lg',
              resolve: {
                    // resolve the drink
                    
                  drink: function () {
                    return selectedDrink;
                  }
              }
          });
          // end of modal open
          

      }
    };
}]);


// app.factory('CaffeineMenu',function($http,$q){
  
//   function getList(){
//     return $http.get('documents/caffeineList.json').
//         success(function(data){
//           console.log(data.name[1]);
//           return data;
//         }).
//         error(function(data){
//           console.log('error');
//         });
//     }
//     console.log(CaffeineMenu.getList);
//     return {
//       getList: getList
//     }

// });