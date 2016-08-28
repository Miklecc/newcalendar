'use strict';

angular.module('life-calendar', ['ngAnimate', 'ngCookies', 'ngSanitize', 'ngResource', 'ui.router', 'ngMaterial', 'ngMessages', 'ngStorage'])
  // allow DI for use in controllers, unit tests
  .constant('_', window._)
  // use in views, ng-repeat="x in _.range(3)"
  .run(function ($rootScope) {
    $rootScope._ = window._;
  })
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        template: '<life-calendar-year-page></life-calendar-year-page>'
      });
    $urlRouterProvider.otherwise('/');
  })
;
