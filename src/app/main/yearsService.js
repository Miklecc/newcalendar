'use strict';

angular
  .module('keymaker')
  .factory('yearsService', function ($q) {

    var userYearData = [];

    // call to external storage to save user input
    var saveYear = function (year, data) {
      var deferred = $q.defer();

      userYearData[year] = data;
      deferred.resolve(userYearData);

      return deferred.promise;
    };

    var updateYear = function () {
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

    return {
      saveYear: saveYear,
      updateYear: updateYear,
      updateYearByIndex: updateYearByIndex,
      userYearData: userYearData
    }
  });
