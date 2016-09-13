'use strict';

angular
  .module('life-calendar')
  .factory('lifeCalendarUserConfigService', lifeCalendarUserConfigService);

function lifeCalendarUserConfigService($q, $document) {

  function uploadConfig(userJsonFile) {

    //TODO: save data to scope and update app to display data from user json.file
    console.log(userJsonFile);

    return $q.when('SOME');
  }

  function downloadConfig(data, name, type) {

    var dataToSave = (JSON.stringify(data));
    console.log('dataToSave ===== ', dataToSave);
    var downloadEl = $document[0].querySelector(".life-calendar__navbar__download");
    var linkEl = $document[0].createElement('a');
    linkEl.className = 'calendar__navbar__download-link';
    var blob = new Blob([dataToSave], {type: type});

    function appendTagToElement() {
      downloadEl.appendChild(linkEl);
      linkEl.href = URL.createObjectURL(blob);
      linkEl.download = name;
      $document[0].querySelector('.calendar__navbar__download-link').click();
    }

    return $q.when(appendTagToElement());
  }

  return {
    uploadConfig: uploadConfig,
    downloadConfig: downloadConfig
  }

}
