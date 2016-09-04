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
  vm.download = download;

  var userConfig = lifeCalendarUserDataService
    .getUserData()
    .then(function (res) {
        return res;
      }
    );

  function download() {
    lifeCalendarUserConfigService
      .downloadConfig(userConfig, 'mydata.json', 'application/json')
      .then();
  }
}
