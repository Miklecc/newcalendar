'use strict';

angular
  .module('keymaker')
  .factory('legendaService', function ($q, _) {

    var rightLiner = function (dataAll) {
      var deferred = $q.defer();

      var categoryPopular = [];
      var i = 1;

      for (var k = 1; k <= 9; k++) {

        var categoryRow = [];

        for (i; i <= 10 * k; i++) {

          if (dataAll[i]) {
            var category = dataAll[i]['category'];
            categoryRow.push(category);
          }
        }

        var repeatedCateg = {};
        categoryRow.forEach(function (x) {
          repeatedCateg[x] = (repeatedCateg[x] || 0) + 1;
        });

        var numberOfRepetitions = [];
        for (var o in repeatedCateg) {
          numberOfRepetitions.push(repeatedCateg[o]);
        }

        var largest = Math.max.apply(Math, numberOfRepetitions);

        var popularCategoryName = (_.invert(repeatedCateg))[largest];

        categoryPopular[k - 1] = popularCategoryName;
      }

      console.log('categoryPopular = ', categoryPopular);

      deferred.resolve(categoryPopular);

      return deferred.promise;
    };

    return {
      rightLiner: rightLiner
    };
  });
