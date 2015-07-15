var app =angular.module('myApp');

app.directive('customPopover', function(){
    return {
		restrict: 'A',
		template: '<span>Label</span>',
		link: function (scope, el, attrs) {
	            console.log("Popover Directive Loaded");
	            scope.Label = attrs.popoverLabel;
	            $(el).popover({
	            	trigger:'hover',
	            	html: true,
	            	content: attrs.popoverHtml,
	            	placement: attrs.popoverPlacement
            });
		}
    };
});