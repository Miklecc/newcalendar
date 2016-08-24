'use strict';

angular
  .module('keymaker')
  .controller('DialogController', DialogController);

function DialogController($mdDialog, yearIndex, yearsService, $timeout, $scope, legendaService) {

  var vm = this;
  vm.yearIndex = yearIndex;

  vm.isOpen = false;
  // On opening, add a delayed property which shows tooltips after the speed dial has opened
  // so that they have the proper position; if closing, immediately hide the tooltips
  $scope.$watch('vm.isOpen', function (isOpen) {
    if (isOpen) {
      $timeout(function () {
        $scope.tooltipVisible = vm.isOpen;
      }, 600);
    } else {
      $scope.tooltipVisible = vm.isOpen;
    }
  });
  vm.items = [
    {name: "", direction: "bottom", color: 'red'},
    {name: "", direction: "top", color: 'pink'},
    {name: "", direction: "bottom", color: 'green'},
    {name: "", direction: "top", color: 'orange'},
    {name: "", direction: "bottom", color: 'blue'}
  ];

  // save chosen color and fill category input field with category value, assigned to color (or empty)
  vm.setColor = function (color, category) {
    vm.categoryColor = color;
    if (category !== '') {
      vm.categoryName = category;
    }
  };

  // updating categoryColorAll from yearService to display in FAB button Tooltips the latest
  // combination color-category entered by user
  getCategoryColor();
  function getCategoryColor() {
    yearsService.updateCategoryColor().then(function (res) {
      var categoryColorAll = res;

      for (var key in categoryColorAll) {
        if (categoryColorAll.hasOwnProperty(key)) {
          for (var i = 0; i < vm.items.length; i++) {
            if (vm.items[i]['color'] === key) {
              vm.items[i]['name'] = categoryColorAll[key];
            }
          }
        }
      }
    });
  }

  // displaying filled fields if user already entered something
  getUserData();
  function getUserData() {
    yearsService.updateYearByIndex(vm.yearIndex).then(function (res) {
      // check if there is data in the cell, saved by user
      if (res) {
        vm.yeardata = res['data'];
        vm.categoryName = res['category'];
        vm.categoryColor = res['color'];
      }
    })


  }

  vm.hide = function (resp) {
    $mdDialog.cancel(resp);
  };
  vm.cancel = function () {
    $mdDialog.cancel();
  };
  vm.save = function (data, category, color) {

    var allIndices = [];

    vm.dialogRange = (typeof vm.dialogRange === 'undefined') ? 'no' : vm.dialogRange;

    if (vm.dialogRange === 'no') {
      allIndices.push(vm.yearIndex);
    } else {
      allIndices.push(vm.yearIndex);
      concatIndexRange();
    }

    function concatIndexRange () {
      var range = vm.dialogRange.split("-");
      var startRange = range[0];
      var endRange = range[1];
      for (var i = startRange; i <= endRange; i++) {
        i = parseInt(i);
        allIndices.push(i);
      }
    }

    saveUserData();
    function saveUserData() {
      yearsService.saveYear(data, category, color, allIndices).then(function (res) {
        vm.userYearData = res;
      })
    }

    // update again vm.items and pass it to legendaService
    getCategoryColor();
    legendaService.sendItems(vm.items);
    $mdDialog.hide(allIndices);
  };
}
