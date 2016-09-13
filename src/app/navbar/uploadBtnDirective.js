'use strict';

angular.module('life-calendar')
  .directive('lifeCalendarUploadButton', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var onChangeHandler = scope.$eval(attrs.lifeCalendarUploadButton);
        element.bind('change', onChangeHandler);
      }
    };
  });
