'use strict';

angular
  .module('life-calendar')
  .factory('lifeCalendarLinerService', function ($q, _) {

    var items;

    var sendItems = function (res) {
      items = res;
    };

    var rightLiner = function (dataAll) {
      var deferred = $q.defer();

      var categoryPopular = [];
      var iCateg = 1;
      var iCol = 1;

      for (var k = 1; k <= 9; k++) {

        var categoryRow = [];
        var repeatedCateg = {};
        var numberOfRepetitions = [];

        var colorRow = [];
        var repeatedColor = {};
        var numberOfRepetitionsColor = [];

        // most repeated category Finder

        for (iCateg; iCateg <= 10 * k; iCateg++) {
          if (dataAll[iCateg]) {
            var category = dataAll[iCateg]['category'];
            categoryRow.push(category);
          }
        }

        categoryRow.forEach(function (x) {
          repeatedCateg[x] = (repeatedCateg[x] || 0) + 1;
        });

        for (var o in repeatedCateg) {
          numberOfRepetitions.push(repeatedCateg[o]);
        }

        var largestKey = Math.max.apply(Math, numberOfRepetitions);
        var largestValue = (_.invert(repeatedCateg))[largestKey];

        // most repeated color Finder

        for (iCol; iCol <= 10 * k; iCol++) {
          if (dataAll[iCol]) {
            var color = dataAll[iCol]['color'];
            colorRow.push(color);
          }
        }

        colorRow.forEach(function (x) {
          repeatedColor[x] = (repeatedColor[x] || 0) + 1;
        });

        for (var o in repeatedColor) {
          numberOfRepetitionsColor.push(repeatedColor[o]);
        }

        var largestKeyColor = Math.max.apply(Math, numberOfRepetitionsColor);
        var largestValueColor = (_.invert(repeatedColor))[largestKeyColor];

        // assign the most repeated value and color
        if (largestValue) {
          categoryPopular[k - 1] = {category: largestValue, color: largestValueColor};
        }
      }

      deferred.resolve(categoryPopular);
      return deferred.promise;
    };

    return {
      rightLiner: rightLiner,
      sendItems: sendItems
    };
  });
