'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
   'ui.router',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'myApp.addcityCtrl'
]).
// config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/worldclock', {templateUrl: 'partials/worldclock.html', controller: 'worldclockCtrl',  reloadOnSearch: false});
//   $routeProvider.when('/timer', {templateUrl: 'partials/timer.html', controller: 'timerCtrl', reloadOnSearch: false });
//   $routeProvider.when('/stopwatch', {templateUrl: 'partials/stopwatch.html', controller: 'stopwatchCtrl', reloadOnSearch: false });
//   $routeProvider.otherwise({redirectTo: '/worldclock', reloadOnSearch: false });
// }]);
config(function($stateProvider, $urlRouterProvider){
  //For any unmatched url
  $urlRouterProvider.otherwise("");
    //
    //Now set up the states
    $stateProvider
    .state('worldclock',{
      url: "/worldclock",
      views: {
        "viewworldclock":{ templateUrl:"partials/worldclock.html",controller: 'worldclockCtrl'},
        "viewtimer":{templateUrl:"partials/timer.html"},
        "viewstopwatch":{templateUrl:"partials/stopwatch.html"},
        "viewaddcity":{templateUrl:"partials/addcity.html"}

      }
    }) 
     
    // .state('worldclock',{
    //  url: "/worldclock",
    //  // templateUrl:"partials/worldclock.html",
    //  // controller: 'worldclockCtrl',
    //  // reloadOnSearch: false
    // })
    // .state('timer',{
    //  url:"/timer",
    //  // templateUrl:"partials/timer.html",
    //  // reloadOnSearch: false
    // })
    // .state('stopwatch',{
    //  url:"/stopwatch",
    //  // templateUrl:"partials/stopwatch.html",
    //  // reloadOnSearch: false
    // })

})
// .service('location', function($location, $rootScope) {
//   $location.skipReload = function () {
//     var un = $rootScope.$on('$stateChangeStart', function (event) {
//         console.log("revent");
//         event.preventDefault();
//         un();
//     });
//     return $location;
//   };
//   return $location;
// });
// .run(function($rootScope,$state){
//  $rootScope.$on('$stateChangeStart', 

// function(event, toState, toParams, fromState, fromParams){ 
//    // event.preventDefault(); 
//     // transitionTo() promise will be rejected with 
//     // a 'transition prevented' error
//     console.log("toState " + toState.name);
//     console.log("toParams " + toParams);
//     console.log("fromParams " + fromState.name);
//     console.log("fromParams " + fromParams);
//     if(toState.name.indexOf('timer') > -1 || toState.name.indexOf('stopwatch')>-1){
//        console.log("!!!! prevent");
//      event.preventDefault();
//       //  $state.go('stopwatch');
//     }
// })

// })