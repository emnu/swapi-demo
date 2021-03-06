// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['starter.controllers', 'ui.router', 'ui.bootstrap'])

.run(function() {

})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/body.html',
    controller: 'AppCtrl'
  })

  .state('app.index', {
    url: '/index',
    views: {
      'bodyContent': {
        templateUrl: 'templates/index.html',
        controller: 'IndexCtrl'
      }
    }
  })
;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/index');

});