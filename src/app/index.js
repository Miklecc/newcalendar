'use strict';

angular.module('keymaker', ['ngAnimate', 'ngCookies', 'ngSanitize', 'ngResource', 'ui.router', 'ngMaterial', 'ngMessages', 'ngStorage'])
// allow DI for use in controllers, unit tests
  .constant('_', window._)
  // use in views, ng-repeat="x in _.range(3)"
  .run(function ($rootScope) {
    $rootScope._ = window._;
  })
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('template', {
        url: 'template',
        templateUrl: 'app/main/main.html',
        controller: 'FormCtrl'
      })
      .state('home', {
        url: '/',
        templateUrl: 'app/main/viewYears.html',
        controller: 'ViewYearsController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  })
;
