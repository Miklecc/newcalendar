'use strict';

angular.module('life-calendar')
  .component('lifeCalendarNavbar', {
    bindings: {},
    controller: lifeCalendarNavbar,
    controllerAs: 'vm',
    templateUrl: 'app/navbar/navbar.tpl.html'
  });

function lifeCalendarNavbar(lifeCalendarUserConfigService, lifeCalendarUserDataService) {
  var vm = this;
  var userConfig = lifeCalendarUserDataService
    .getUserData()
    .then(function (res) {
      console.log('userConfig -- ', JSON.stringify(res));
      return JSON.stringify(res);
      }
    );

  vm.download = function () {
    lifeCalendarUserConfigService
      .downloadConfig(userConfig, 'myfilename.json', 'application/json')
      .then();
  }
}
