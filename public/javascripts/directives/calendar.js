
var app = angular.module('myApp');
app.directive("calendar", function() {

    // removed controller
    return {
        restrict: "E",
        templateUrl: "javascripts/directives/calendar.html",
        scope: {
            selected: "="
        },
        link: function(scope) {
            scope.selected = _removeTime(scope.selected || moment());
            // scope.selected returns a moment object with the current date and 00:00:00 for minutes or seconds.
            scope.month = scope.selected.clone();
            // start is an extension of scope.selected
            var start = scope.selected.clone();
            // start.date(1) starts the calendar at the beginning of the month
            start.date(1);
            _removeTime(start.day(0));
            // build month is defined below 
            _buildMonth(scope, start, scope.month);
            // select is added to click handler to give user ability to select a day
            scope.select = function(day) {
                // returns the current date with 0 for time
                scope.selected = day.date;  
            };
            // gives user ability to jump around months added to click handler
            scope.next = function(){
                var next = scope.month.clone();
                _removeTime(next.month(next.month()+1).date(1));
                scope.month.month(scope.month.month()+1);
                _buildMonth(scope, next, scope.month);
            };

            scope.previous = function() {
                var previous = scope.month.clone();
                // _removeTime(previous.month(previous.month()-1).date(1));
                _removeTime(previous.month(previous.month()-1).date(1).day(0));

                scope.month.month(scope.month.month()-1);
                _buildMonth(scope, previous, scope.month);
            };
        }
    };
    
    function _removeTime(date) {
        // return date.day(0).hour(0).minute(0).second(0).millisecond(0);
        return date.startOf('day');

    }

    function _buildMonth(scope, start, month) {
        scope.weeks = [];
        var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
        while (!done) {
            scope.weeks.push({ days: _buildWeek(date.clone(), month) });
            date.add(1, "w");
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }
    }

    function _buildWeek(date, month) {
        var days = [];
        for (var i = 0; i < 7; i++) {
            days.push({
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(new Date(), "day"),
                date: date
            });
            date = date.clone();
            date.add(1, "d");
        }
        return days;
    }
});