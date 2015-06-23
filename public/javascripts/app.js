var app = angular.module('myApp', ['ui.router','ui.bootstrap','angularUtils.directives.dirPagination'], function ($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

app.config(function(paginationTemplateProvider) {
    paginationTemplateProvider.setPath('/libs/angular-utils-pagination/dirPagination.tpl.html');
});

// routes
app.config(function($stateProvider, $urlRouterProvider){

  $stateProvider
    .state('home',{
      url:'/home',
      templateUrl:'templates/home.html',
      controller: 'homeController',
      access: {restricted: true}
    })
    .state('caffeineAgent',{
      url:'/',
      templateUrl:'templates/caffeineAgent.html',
      controller: 'caffeineAgentController',
      access: {restricted: false}

    })
    .state('caffeine-library',{
      url:'/caffeine-library',
      templateUrl:'templates/caffeine-library.html',
      controller: 'libraryController',
      access: {restricted: false}

    })
    .state('editDrink',{
      url:'caffeineAgent/:_drinkid/editDrink',
      templateUrl:'templates/editCaffeineDrink.html',
      controller:'drinkEditController',
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
    .state('caffeineTable',{
      templateUrl:'templates/caffeineTable.html',
      controller:'caffeineTableController',
      access: {restricted: false}
    });
    // .state('otherwise', { url : '/',access: {restricted: true}
    // });

    $stateProvider.state('otherwise', {
      url: '*path',
      templateUrl: 'templates/error-not-found.html',
      access: {restricted:true}
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





