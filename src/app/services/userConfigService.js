'use strict';

angular
  .module('life-calendar')
  .factory('lifeCalendarUserConfigService', lifeCalendarUserConfigService);

function lifeCalendarUserConfigService($q, $document) {

  var uploadConfig = function () {
  };

  var downloadConfig = function (text, name, type) {

    var downloadEl = $document[0].querySelector(".life-calendar__navbar__download");
    var linkEl = $document[0].createElement('a');
    linkEl.className = 'calendar__navbar__download-link';
    //TODO: smomething wrong with the format json.. [] works but {} no
    var file = new Blob([text], {type: type});

    function appendTagElement() {
      downloadEl.appendChild(linkEl);
      linkEl.href = URL.createObjectURL(file);
      linkEl.download = name;
      $document[0].querySelector('.calendar__navbar__download-link').click();
    }

    return $q.when(appendTagElement());
  };

  return {
    uploadConfig: uploadConfig,
    downloadConfig: downloadConfig
  }

}
