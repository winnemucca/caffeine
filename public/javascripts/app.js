var app = angular.module('myApp', ['ui.router','ui.bootstrap','ngResource','mgcrea.ngStrap'], function ($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

app.config(function($datepickerProvider) {
  angular.extend($datepickerProvider.defaults, {
    dateFormat: 'dd/MM/yyyy',
    startWeek: 1
  });
});
// routes
app.config(function($stateProvider, $urlRouterProvider){

  $stateProvider
    .state('home',{
      url:'/',
      templateUrl:'templates/home.html',
      controller: 'homeController',
      access: {restricted: true}
    })
    .state('caffeineAgent',{
      url:'/caffeineAgent',
      templateUrl:'templates/caffeineAgent.html',
      controller: 'caffeineAgentController',
      access: {restricted: true}

    })
    .state('caffeine-library',{
      url:'/caffeine-library',
      templateUrl:'templates/caffeine-library.html',
      controller: 'libraryController',
      access: {restricted: true}

    })
    .state('editDrink',{
      url:'caffeineAgent/:_drinkid/editDrink',
      templateUrl:'templates/editCaffeineDrink.html',
      access: {restricted: true}

      // controller:'drinkController'
    })
    .state('caffeineAnalysis',{
      url:'/caffeineAnalysis',
      templateUrl:'templates/caffeineAnalysis.html',
      controller:'analysisController',
      access: {restricted: true}

    })

    .state('login',{
      url: '/login',
      templateUrl:'templates/login.html',
      controller:'loginController',
      access: {restricted: false}

    })
    .state('register',{
      url:'/register',
      templateUrl:'templates/register.html',
      controller:'registerController',
      access: {restricted: false}

    })
    .state("otherwise", { url : '/',access: {restricted: true}
   });

});

  app.run(function ($rootScope, $location,$state, AuthService) {
    $rootScope.$on('$stateChangeStart', function (event, toState) {
      console.log(toState.access.restricted);
      console.log(AuthService.isLoggedIn());
      if (toState.access.restricted && AuthService.isLoggedIn() === false) {
        $location.path('/login');
      }
    });
});





