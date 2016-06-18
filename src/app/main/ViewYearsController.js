'use strict';

angular
  .module('keymaker')
  .controller('ViewYearsController', function ($mdDialog, yearsService) {

    var vm = this;

    vm.test = new Array(90);

    getUserData();
    function getUserData() {
      yearsService.updateYear().then(function(res) {
        vm.yearall = res;
      })
    }

    // second 'wrong' way of calling mock Service
   // vm.userYearData = yearsService.userYearData;

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
        }, function(answer) {
        });
    };

    // dialog controller
    function DialogController($mdDialog, yearIndex, yearsService, $timeout, $scope) {

      var vm = this;
      vm.yearIndex = yearIndex;

      vm.isOpen = false;
      // On opening, add a delayed property which shows tooltips after the speed dial has opened
      // so that they have the proper position; if closing, immediately hide the tooltips
      $scope.$watch('vm.isOpen', function(isOpen) {
        if (isOpen) {
          $timeout(function() {
            $scope.tooltipVisible = vm.isOpen;
          }, 600);
        } else {
          $scope.tooltipVisible = vm.isOpen;
        }
      });
      vm.items = [
        { name: "Twitter", direction: "bottom", color:'red' },
        { name: "Facebook", direction: "top", color:'pink' },
        { name: "Google Hangout", direction: "bottom", color:'green' },
        { name: "Facebook", direction: "top", color:'orange' },
        { name: "Facebook", direction: "bottom", color:'blue' }
      ];

      vm.setColor = function(color) {
        vm.categoryColor = color;
      };

      getUserData();
      function getUserData() {
        yearsService.updateYearByIndex(vm.yearIndex).then(function(res) {
          vm.yearlabel = res;
        })
      }

      vm.hide = function(answer) {
        $mdDialog.hide(answer);
      };
      vm.cancel = function() {
        $mdDialog.cancel();
      };
      vm.save = function(answer, category) {

        saveUserData();
        function saveUserData() {
          yearsService.saveYear(vm.yearIndex, answer, category, vm.categoryColor).then(function(res) {
            vm.userYearData = res;
            console.log('yearsService.saveYear = ', vm.userYearData);
          })
        }

/*        // second 'wrong' way of calling mock Service
          yearsService.saveYear(vm.yearIndex, answer).then(function(data){
        });*/
        $mdDialog.hide(answer);
      };
    }
  });

