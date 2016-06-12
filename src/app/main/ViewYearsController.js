'use strict';

angular
  .module('keymaker')
  .controller('ViewYearsController', function ($mdDialog, yearsService) {

    var vm = this;

    vm.test = new Array(90);

    vm.userYearData = yearsService.userYearData;

    vm.showAdd = function(ev, index) {

      vm.yearIndex = index;
    //  var parentEl = angular.element(document.querySelector('.cell-year_'+index));

    // calling dialog
      $mdDialog.show({
        controller: DialogController,
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
        .then(function(answer) {
          console.log('$mdDialog.show success = ', answer);
        }, function(answer) {
          console.log('$mdDialog.show fail = ', answer);
        });
    };
    // dialog controller
    function DialogController($mdDialog, yearIndex, yearsService) {

      var vm = this;

      vm.yearIndex = yearIndex;

      vm.hide = function(answer) {
        $mdDialog.hide(answer);
      };
      vm.cancel = function() {
        $mdDialog.cancel();
      };
      vm.save = function(answer) {
        yearsService.saveYear(vm.yearIndex, answer).then(function(data){
        //  console.log('promise yearsService.saveYear ', data);
        });
        $mdDialog.hide(answer);
      };
    }
  });

