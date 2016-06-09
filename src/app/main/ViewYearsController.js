'use strict';

angular
  .module('keymaker')
  .controller('ViewYearsController', function ($scope, $mdDialog) {

    $scope.test = new Array(90);

    $scope.showAdd = function(ev, index) {
    //  var parentEl = angular.element(document.querySelector('.cell-year_'+index));
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
        controllerAs: 'vm'


      })
        .then(function(answer) {
          console.log('$mdDialog.show success = ', answer);
          $scope.alert = 'You said the information was "' + answer + '".';
        }, function() {
          console.log('$mdDialog.show fail = ', answer);
          $scope.alert = 'You cancelled the dialog.';
        });
    };

    function DialogController($mdDialog) {

      var vm = this;

      vm.hide = function(answer) {
        $mdDialog.hide(answer);
      };
      vm.cancel = function() {
        $mdDialog.cancel();
      };
      vm.save = function(answer) {
        $mdDialog.hide(answer);
        console.log('DialogController vm.mygoal = ', vm.mygoal);
      };
    }


  });
