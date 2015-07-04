var app = angular.module('myApp');

app.factory('Drink',['$http',function($http) {
  var Drink = function(name,date,caffeineLevel,size,mgFloz) {
    this.name = name;
    // this.date = moment(date).format('L');
    this.date = date;
    this.caffeineLevel = caffeineLevel;
    this.size = size;
    this.mgFloz=mgFloz;
  };
  return Drink;
}]);