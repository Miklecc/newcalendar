'use strict';

angular.module('keymaker', ['ngAnimate', 'ngCookies', 'ngSanitize', 'ngResource', 'ui.router', 'ngMaterial', 'ngMessages'])
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
