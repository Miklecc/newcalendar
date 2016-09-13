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
  vm.upload = upload;

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

  function upload() {

    getUserJsonFile();

    function getUserJsonFile() {
      var file = event.target.files[0];
      var reader = new FileReader();

      reader.onload = function (event) {
        passDataFromUserFileToScope(
          JSON.parse(event.target.result)
        );
      };
      reader.readAsText(file);
    }

    function passDataFromUserFileToScope(userJsonFile) {
      lifeCalendarUserConfigService
        .uploadConfig(userJsonFile)
        .then();
    }
  }
}
