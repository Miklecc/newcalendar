'use strict';

angular
  .module('keymaker')
  .factory('yearsService', function ($q) {

    var userYearData = [];
    var categoryColorAll = [];

    // call to external storage to save user input
    var saveYear = function (year, data, category, color) {
      var deferred = $q.defer();

      userYearData[year] = {'data': data, 'category': category, 'color': color};
      if (category) {
        categoryColorAll[color] = category;
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
      userYearData: userYearData,
      saveYear: saveYear,
      updateYearTooltip: updateYearTooltip,
      updateCategoryColor: updateCategoryColor,
      updateYearByIndex: updateYearByIndex
    }
  });
