'use strict';

angular
  .module('keymaker')
  .factory('legendaService', function ($q, _) {

    var items;

    var sendItems = function (res) {
      items = res;
    };

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

        categoryPopular[k - 1] = getCategoryColor(popularCategoryName);
      }

      // get category color from items and assign it to the category name
      function getCategoryColor(categoryName) {
        for (var i = 0; i < items.length; i++) {
          if (items[i]['name'] == categoryName) {
            return {category: categoryName, color: items[i]['color']};
          }
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
