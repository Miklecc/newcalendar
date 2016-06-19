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
        .then(function(cellIndex) {

          // updating element color & request from yearService
          getUserData();
          function getUserData() {
            yearsService.updateYearByIndex(cellIndex).then(function (res) {
              var res = res;
              var color = res['color'];
              var index = cellIndex;
              var myEl = angular.element(document.querySelector('#cell-year_'+index));
              myEl[0].style['background-color'] = color;
            })
          }
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

      //TODO: FIX console error "angular.js:13642 TypeError: Cannot read property 'data' of undefined"
      // displaying filled fields if user already entered something
      getUserData();
      function getUserData() {
        yearsService.updateYearByIndex(vm.yearIndex).then(function (res) {
          var res = res;
          vm.yeardata = res['data'];
          vm.categoryName = res['category'];
          vm.categoryColor = res['color'];
        })
      }

      vm.hide = function(resp) {
        $mdDialog.hide(resp);
      };
      vm.cancel = function() {
        $mdDialog.cancel();
      };
      vm.save = function(data, category) {

        saveUserData();
        function saveUserData() {
          yearsService.saveYear(vm.yearIndex, data, category, vm.categoryColor).then(function(res) {
            vm.userYearData = res;
          })
        }

/*        // second 'wrong' way of calling mock Service
          yearsService.saveYear(vm.yearIndex, data).then(function(data){
        });*/
        $mdDialog.hide(vm.yearIndex);
      };
    }
  });

