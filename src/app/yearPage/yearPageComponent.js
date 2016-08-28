'use strict';

angular
  .module('life-calendar')
  .component('lifeCalendarYearPage', {
    bindings: {},
    controller: LifeCalendarYearPageController,
    controllerAs: 'vm',
    templateUrl: 'app/yearPage/yearPage.tpl.html'
  });

function LifeCalendarYearPageController($mdDialog, lifeCalendarUserDataService, lifeCalendarLinerService, _) {

  var vm = this;
  vm.cellArray = new Array(90);

  angular.element(document).ready(function () {
    updateUserData();
  });

  function updateUserData() {
    lifeCalendarUserDataService.updateYearTooltip().then(function (res) {
      vm.yearall = res;
      updateCellColors();
      updateRightLinerFromLocalStorage();
    });
  }

  function updateRightLinerFromLocalStorage() {
    lifeCalendarLinerService.rightLiner(vm.yearall).then(function (res) {
      vm.categoryName = res;
    });
  }

  function updateCellColors() {
    var nonEmptyUserDataObject = _.pickBy(vm.yearall, _.isObject);
    var comboCellNumberColor = _.mapValues(nonEmptyUserDataObject, function (o) {
      return o.color;
    });
    _.forEach(comboCellNumberColor, function (value, key) {
      var myEl = angular.element(document.querySelector('#cell-year_' + key));
      myEl[0].style['background-color'] = value;
    });
  }

  function updateYearPage(indices) {
    // updating element color & request from yearService
    getUserData();
    function getUserData() {
      lifeCalendarUserDataService.updateYearByIndex(vm.yearIndex).then(function (res) {
        // check if user clicked save in Dialog
        if (res) {
          var color = res['color'];
          // assign color of clicked element to colors of all elements in Range
          for (var i = 0; i < indices.length; i++) {
            var myEl = angular.element(document.querySelector('#cell-year_' + indices[i]));
            myEl[0].style['background-color'] = color;
          }
        }
      });
      updateRightLinerFromLocalStorage();
    }
  }

  vm.showDialog = function (ev, index) {
    vm.yearIndex = index;
    // calling dialog
    $mdDialog.show({
        controller: 'lifeCalendarDialogController',
        templateUrl: 'app/dialog/dialog.tpl.html',
        targetEvent: ev,
        hasBackdrop: false,
        clickOutsideToClose: true,
        escapeToClose: true,
        bindToController: true,
        disableParentScroll: false,
        controllerAs: 'vm',
        locals: {
          yearIndex: this.yearIndex
        }
      })
      .then(function (allIndices) {
        updateYearPage(allIndices);
      });
  };
}
