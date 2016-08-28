'use strict';

angular
  .module('life-calendar')
  .controller('lifeCalendarDialogController', lifeCalendarDialogController);

function lifeCalendarDialogController($mdDialog, yearIndex, lifeCalendarUserDataService, $timeout, $scope, lifeCalendarLinerService) {

  var vm = this;
  vm.setColor = setcolor;
  vm.hide = hide;
  vm.cancel = cancel;
  vm.save = save;
  vm.yearIndex = yearIndex;
  vm.isOpen = false;
  vm.categories = [
    {name: "", direction: "bottom", color: 'red'},
    {name: "", direction: "top", color: 'pink'},
    {name: "", direction: "bottom", color: 'green'},
    {name: "", direction: "top", color: 'orange'},
    {name: "", direction: "bottom", color: 'blue'}
  ];

  $scope.$watch('vm.isOpen', function (isOpen) {
    if (isOpen) {
      $timeout(function () {
        $scope.tooltipVisible = vm.isOpen;
      }, 600);
    } else {
      $scope.tooltipVisible = vm.isOpen;
    }
  });

  getCategoryColor();
  getUserData();

  // displaying filled fields if user already entered something
  function getUserData() {
    lifeCalendarUserDataService.updateYearByIndex(vm.yearIndex).then(function (res) {
      // check if there is data in the cell, saved by user
      if (res) {
        vm.yeardata = res['data'];
        vm.categoryName = res['category'];
        vm.categoryColor = res['color'];
      }
    })
  }

  // save chosen color and fill category input field with category value, assigned to color (or empty)
  function setcolor(color, category) {
    vm.categoryColor = color;
    if (category !== '') {
      vm.categoryName = category;
    }
  }

  function hide(resp) {
    $mdDialog.cancel(resp);
  }

  function cancel() {
    $mdDialog.cancel();
  }

  function save(data, category, color) {
    var allIndices = [];

    getRangeOfCells(allIndices);

    lifeCalendarUserDataService.saveYear(data, category, color, allIndices).then(function (res) {
      vm.userYearData = res;
    });

    // update again vm.categories and pass it to lifeCalendarLinerService
    getCategoryColor();
    lifeCalendarLinerService.sendItems(vm.categories);
    $mdDialog.hide(allIndices);
  }

  // updating categoryColorAll from lifeCalendarUserDataService to display in FAB button Tooltips the latest
  // combination color-category entered by user
  function getCategoryColor() {
    lifeCalendarUserDataService.updateCategoryColor().then(function (res) {
      var categoryColorAll = res;

      for (var key in categoryColorAll) {
        if (categoryColorAll.hasOwnProperty(key)) {
          for (var i = 0; i < vm.categories.length; i++) {
            if (vm.categories[i]['color'] === key) {
              vm.categories[i]['name'] = categoryColorAll[key];
            }
          }
        }
      }
    });
  }

  function getRangeOfCells(allIndices) {
    vm.dialogRange = (typeof vm.dialogRange === 'undefined') ? 'no' : vm.dialogRange;

    if (vm.dialogRange === 'no') {
      allIndices.push(vm.yearIndex);
    } else {
      allIndices.push(vm.yearIndex);
      concatIndexRange();
    }

    function concatIndexRange() {
      var range = vm.dialogRange.split("-");
      var startRange = range[0];
      var endRange = range[1];
      for (var i = startRange; i <= endRange; i++) {
        i = parseInt(i);
        allIndices.push(i);
      }
    }

    return allIndices;
  }
}
