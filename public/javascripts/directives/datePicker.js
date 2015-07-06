// datepicker will go here
angular.module('myApp').directive('myDatepicker', function() {
  return {
      restrict: 'A',
      scope: {
          model: "=",
          format: "@",
          options: "=datepickerOptions",
          myid: "@"
      },
      templateUrl: 'datepicker-template.html',
      link: function(scope, element) {
          scope.popupOpen = false;
          scope.openPopup = function($event) {
              $event.preventDefault();
              $event.stopPropagation();
              scope.popupOpen = true;
          };

          scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            scope.opened = true;
          };

      }
  };
});