'use strict';

angular
  .module('keymaker')
  .factory('yearsService', function ($q, $localStorage) {

    var userYearData;
    var categoryColorAll;

    // initialize $localStorage
    var storage = $localStorage.$default({
      userYearData: [],
      categoryColorAll: []
    });

    updateLocalStorage();

    console.log(storage);

    function updateLocalStorage() {
      userYearData = storage.userYearData;
      categoryColorAll = storage.categoryColorAll;
    }

    // call to external storage to save user input
    var saveYear = function (data, category, color, allIndicies) {
      var deferred = $q.defer();

      for (var i = 0; i < allIndicies.length; i++) {
        saveData(allIndicies[i]);
      }

      function saveData(index) {
        userYearData[index] = {'data': data, 'category': category, 'color': color};

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

      updateLocalStorage();

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

      updateLocalStorage();

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
