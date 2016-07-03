'use strict';

angular
  .module('keymaker')
  .factory('yearsService', function ($q) {

    var userYearData = [];
    var categoryColorAll = [];

    // call to external storage to save user input
    var saveYear = function (year, data, category, color, yearRange) {
      var deferred = $q.defer();

      yearRange = (typeof yearRange === 'undefined') ? 'no' : yearRange;

      if (yearRange === 'no') {
        saveData();
      } else {

        var range = yearRange.split(":");
        var startRange = range[0];
        var endRange = range[1];

       /* for () {

        }*/

      }

      function saveData() {
        userYearData[year] = {'data': data, 'category': category, 'color': color};

        if (category == null) {
          category = '';
        }

        // save combo color-category to display in FAB tooltip
        categoryColorAll[color] = category;

        // if user changes category of color -> re-write the same category to this color in all cells
        for (var i = 1; i < 91; i++) {
          if (userYearData[i] && (userYearData[i]['color'] == color)) {
            userYearData[i]['category'] = category;
          }
        }
      }

      deferred.resolve(userYearData);
      return deferred.promise;
    };

    var updateYearTooltip = function () {
      var deferred = $q.defer();

      deferred.resolve(userYearData);

      return deferred.promise;
    };

    var updateYearByIndex = function (year) {
      var deferred = $q.defer();
      var inputValue = userYearData[year];

      deferred.resolve(inputValue);
      return deferred.promise;
    };

    var updateCategoryColor = function() {
      var deferred = $q.defer();
      var categoryColor = categoryColorAll;

      deferred.resolve(categoryColor);
      return deferred.promise;
    } ;

    return {
      saveYear: saveYear,
      updateYearTooltip: updateYearTooltip,
      updateCategoryColor: updateCategoryColor,
      updateYearByIndex: updateYearByIndex
    }
  });
