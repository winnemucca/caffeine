var app = angular.module('myApp');

app.directive('analysis',function() {
	return {
		restrict: 'E',
		templateUrl:'',
		require:'^calendar'
		scope: {

		},
		link: function(scope,element,attrs) {
			// 4th value is the controller i want access to
			element.on('click',function() {
				element('div.well').toggleClass("hidden")
			})
		}
	}
})

// may need markdown.js and include it inside of my link
// also consider ng-bind-html to bind html data
// $sce.trustAsHtml(markdowntohtml)
// require ^ indicates its parent directive
// link has a fourth category that we can name whatever we want
// ******* '@' refers to attributes that can pass