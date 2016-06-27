'use strict';

angular
  .module('keymaker')
  .controller('ViewYearsController', function ($mdDialog, yearsService, legendaService) {

    var vm = this;
    vm.test = new Array(90);

    getUserData();
    function getUserData() {
      yearsService.updateYearTooltip().then(function (res) {
        vm.yearall = res;
        // PLACEHOLDER
      });
    }



    vm.showAdd = function (ev, index) {

      vm.yearIndex = index;
      //  var parentEl = angular.element(document.querySelector('.cell-year_'+index));
      // calling dialog
      $mdDialog.show({
        controller: 'DialogController',
        templateUrl: 'app/main/viewYearsDialog.html',
        //  parent: parentEl,
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
        .then(function (cellIndex) {

          // updating element color & request from yearService
          getUserData();
          function getUserData() {
            yearsService.updateYearByIndex(cellIndex).then(function (res) {
              if (res) {
                var res = res;
                var color = res['color'];
                var index = cellIndex;
                var myEl = angular.element(document.querySelector('#cell-year_' + index));
                myEl[0].style['background-color'] = color;
              }
            });
            // PLACEHOLDER

            legendaService.rightLiner(vm.yearall).then(function (res) {
              vm.categoryName = res;
              console.log('legendaService vm.categoryName', vm.categoryName);
            });

          }
        }, function (answer) {
        });
    };
  });
