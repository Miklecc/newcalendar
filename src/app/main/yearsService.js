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

    //TODO: call to external storage to update local 'userYearData'
    var updateYear = function () {
      var deferred = $q.defer();

      deferred.resolve(userYearData);

      return deferred.promise;
    };

    return {
      saveYear: saveYear,
      updateYear: updateYear,
      userYearData: userYearData
    }
  });
