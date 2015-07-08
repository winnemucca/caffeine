// var loDash = angular.module('loDash',[]);
var app = angular.module('myApp');

app.factory('_',['$window', function ($window) {
	return $window._;
}])

// loDash.factory('_', ['$window',function () {
// 	return _$window._;
// }])