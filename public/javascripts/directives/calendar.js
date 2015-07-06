// angular.module('ui.calendar', [])
//   .constant('uiCalendarConfig', {})
//   .controller('uiCalendarCtrl', ['$scope', '$timeout', '$locale', function($scope, $timeout, $locale){

//       var sourceSerialId = 1,
//           eventSerialId = 1,
//           sources = $scope.eventSources,
//           extraEventSignature = $scope.calendarWatchEvent ? $scope.calendarWatchEvent : angular.noop,

//           wrapFunctionWithScopeApply = function(functionToWrap){
//               var wrapper;

//               if (functionToWrap){
//                   wrapper = function(){
                     

//                       var args = arguments;
//                       var _this = this;
//                       $timeout(function(){
//                         functionToWrap.apply(_this, args);
//                       });
//                   };
//               }

//               return wrapper;
//           };

//       this.eventsFingerprint = function(e) {
//         if (!e._id) {
//           e._id = eventSerialId++;
//         }
//         // This extracts all the information we need from the event. http://jsperf.com/angular-calendar-events-fingerprint/3
//         return "" + e._id + (e.id || '') + (e.title || '') + (e.url || '') + (+e.start || '') + (+e.end || '') +
//           (e.allDay || '') + (e.className || '') + extraEventSignature(e) || '';
//       };

//       this.sourcesFingerprint = function(source) {
//           return source.__id || (source.__id = sourceSerialId++);
//       };

//       this.allEvents = function() {
//         // return sources.flatten(); but we don't have flatten
//         var arraySources = [];
//         for (var i = 0, srcLen = sources.length; i < srcLen; i++) {
//           var source = sources[i];
//           if (angular.isArray(source)) {
//             // event source as array
//             arraySources.push(source);
//           } else if(angular.isObject(source) && angular.isArray(source.events)){
//             // event source as object, ie extended form
//             var extEvent = {};
//             for(var key in source){
//               if(key !== '_uiCalId' && key !== 'events'){
//                  extEvent[key] = source[key];
//               }
//             }
//             for(var eI = 0;eI < source.events.length;eI++){
//               angular.extend(source.events[eI],extEvent);
//             }
//             arraySources.push(source.events);
//           }
//         }

//         return Array.prototype.concat.apply([], arraySources);
//       };

//       // Track changes in array by assigning id tokens to each element and watching the scope for changes in those tokens
//       // arguments:
//       //  arraySource array of function that returns array of objects to watch
//       //  tokenFn function(object) that returns the token for a given object
//       this.changeWatcher = function(arraySource, tokenFn) {
//         var self;
//         var getTokens = function() {
//           var array = angular.isFunction(arraySource) ? arraySource() : arraySource;
//           var result = [], token, el;
//           for (var i = 0, n = array.length; i < n; i++) {
//             el = array[i];
//             token = tokenFn(el);
//             map[token] = el;
//             result.push(token);
//           }
//           return result;
//         };
//         // returns elements in that are in a but not in b
//         // subtractAsSets([4, 5, 6], [4, 5, 7]) => [6]
//         var subtractAsSets = function(a, b) {
//           var result = [], inB = {}, i, n;
//           for (i = 0, n = b.length; i < n; i++) {
//             inB[b[i]] = true;
//           }
//           for (i = 0, n = a.length; i < n; i++) {
//             if (!inB[a[i]]) {
//               result.push(a[i]);
//             }
//           }
//           return result;
//         };

//         // Map objects to tokens and vice-versa
//         var map = {};

//         var applyChanges = function(newTokens, oldTokens) {
//           var i, n, el, token;
//           var replacedTokens = {};
//           var removedTokens = subtractAsSets(oldTokens, newTokens);
//           for (i = 0, n = removedTokens.length; i < n; i++) {
//             var removedToken = removedTokens[i];
//             el = map[removedToken];
//             delete map[removedToken];
//             var newToken = tokenFn(el);
//             // if the element wasn't removed but simply got a new token, its old token will be different from the current one
//             if (newToken === removedToken) {
//               self.onRemoved(el);
//             } else {
//               replacedTokens[newToken] = removedToken;
//               self.onChanged(el);
//             }
//           }

//           var addedTokens = subtractAsSets(newTokens, oldTokens);
//           for (i = 0, n = addedTokens.length; i < n; i++) {
//             token = addedTokens[i];
//             el = map[token];
//             if (!replacedTokens[token]) {
//               self.onAdded(el);
//             }
//           }
//         };
//         return self = {
//           subscribe: function(scope, onChanged) {
//             scope.$watch(getTokens, function(newTokens, oldTokens) {
//               if (!onChanged || onChanged(newTokens, oldTokens) !== false) {
//                 applyChanges(newTokens, oldTokens);
//               }
//             }, true);
//           },
//           onAdded: angular.noop,
//           onChanged: angular.noop,
//           onRemoved: angular.noop
//         };
//       };

//       this.getFullCalendarConfig = function(calendarSettings, uiCalendarConfig){
//           var config = {};

//           angular.extend(config, uiCalendarConfig);
//           angular.extend(config, calendarSettings);
         
//           angular.forEach(config, function(value,key){
//             if (typeof value === 'function'){
//               config[key] = wrapFunctionWithScopeApply(config[key]);
//             }
//           });

//           return config;
//       };

//     this.getLocaleConfig = function(fullCalendarConfig) {
//       if (!fullCalendarConfig.lang || fullCalendarConfig.useNgLocale) {
//         // Configure to use locale names by default
//         var tValues = function(data) {
//           // convert {0: "Jan", 1: "Feb", ...} to ["Jan", "Feb", ...]
//           var r, k;
//           r = [];
//           for (k in data) {
//             r[k] = data[k];
//           }
//           return r;
//         };
//         var dtf = $locale.DATETIME_FORMATS;
//         return {
//           monthNames: tValues(dtf.MONTH),
//           monthNamesShort: tValues(dtf.SHORTMONTH),
//           dayNames: tValues(dtf.DAY),
//           dayNamesShort: tValues(dtf.SHORTDAY)
//         };
//       }
//       return {};
//     };
//   }])
//   .directive('uiCalendar', ['uiCalendarConfig', function(uiCalendarConfig) {
//     return {
//       restrict: 'A',
//       scope: {eventSources:'=ngModel',calendarWatchEvent: '&'},
//       controller: 'uiCalendarCtrl',
//       link: function(scope, elm, attrs, controller) {

//         var sources = scope.eventSources,
//             sourcesChanged = false,
//             eventSourcesWatcher = controller.changeWatcher(sources, controller.sourcesFingerprint),
//             eventsWatcher = controller.changeWatcher(controller.allEvents, controller.eventsFingerprint),
//             options = null;

//         function getOptions(){
//           var calendarSettings = attrs.uiCalendar ? scope.$parent.$eval(attrs.uiCalendar) : {},
//               fullCalendarConfig;

//           fullCalendarConfig = controller.getFullCalendarConfig(calendarSettings, uiCalendarConfig);

//           var localeFullCalendarConfig = controller.getLocaleConfig(fullCalendarConfig);
//           angular.extend(localeFullCalendarConfig, fullCalendarConfig);

//           options = { eventSources: sources };
//           angular.extend(options, localeFullCalendarConfig);

//           var options2 = {};
//           for(var o in options){
//             if(o !== 'eventSources'){
//               options2[o] = options[o];
//             }
//           }
//           return JSON.stringify(options2);
//         }

//         scope.destroy = function(){
//           if(scope.calendar && scope.calendar.fullCalendar){
//             scope.calendar.fullCalendar('destroy');
//           }
//           if(attrs.calendar) {
//             scope.calendar = scope.$parent[attrs.calendar] =  $(elm).html('');
//           } else {
//             scope.calendar = $(elm).html('');
//           }
//         };

//         scope.init = function(){
//           scope.calendar.fullCalendar(options);
//         };

//         eventSourcesWatcher.onAdded = function(source) {
//             scope.calendar.fullCalendar('addEventSource', source);
//             sourcesChanged = true;
//         };

//         eventSourcesWatcher.onRemoved = function(source) {
//           scope.calendar.fullCalendar('removeEventSource', source);
//           sourcesChanged = true;
//         };

//         eventsWatcher.onAdded = function(event) {
//           scope.calendar.fullCalendar('renderEvent', event);
//         };

//         eventsWatcher.onRemoved = function(event) {
//           scope.calendar.fullCalendar('removeEvents', function(e) { 
//             return e._id === event._id;
//           });
//         };

//         eventsWatcher.onChanged = function(event) {
//           event._start = $.fullCalendar.moment(event.start);
//           event._end = $.fullCalendar.moment(event.end);
//           scope.calendar.fullCalendar('updateEvent', event);
//         };

//         eventSourcesWatcher.subscribe(scope);
//         eventsWatcher.subscribe(scope, function(newTokens, oldTokens) {
//           if (sourcesChanged === true) {
//             sourcesChanged = false;
//             // prevent incremental updates in this case
//             return false;
//           }
//         });

//         scope.$watch(getOptions, function(newO,oldO){
//             scope.destroy();
//             scope.init();
//         });
//       }
//     };
// }]);
// 
// 
var app = angular.module('myApp');
app.directive("calendar", function() {
    return {
        restrict: "E",
        templateUrl: "javascripts/directives/calendar.html",
        scope: {
            selected: "="
        },
        link: function(scope) {
            scope.selected = _removeTime(scope.selected || moment());
            scope.month = scope.selected.clone();

            var start = scope.selected.clone();
            start.date(1);
            _removeTime(start.day(0));

            _buildMonth(scope, start, scope.month);

            scope.select = function(day) {
                scope.selected = day.date;  
            };

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