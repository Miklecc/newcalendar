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

      // calling dialog
      $mdDialog.show({
        controller: 'DialogController',
        templateUrl: 'app/main/viewYearsDialog.html',
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

          var indices = allIndices;
          console.log('allIndices', allIndices);

          // updating element color & request from yearService
          getUserData();
          function getUserData() {
            yearsService.updateYearByIndex(vm.yearIndex).then(function (res) {

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

            // TODO: Is it correct place for legendaService?
            legendaService.rightLiner(vm.yearall).then(function (res) {
              vm.categoryName = res;
              console.log('legendaService vm.categoryName', vm.categoryName);
            });
          }
        }, function (answer) {
        });
    };
  });
