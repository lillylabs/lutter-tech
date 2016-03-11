angular.module('application').service('DataSource', ['$http', '$q', function($http, $q) {

  var cache = null;

  function indexToStingId(i) {
    var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ';
    return (i >= alphabet.length ? idOf((i / alphabet.length >> 0) - 1) : '') +
      alphabet[i % alphabet.length >> 0];
  }

  function getData() {
    if(!cache) {
      return $http.get('/site/site.json').then(function(result){
        cache = result.data;
        return cache;
      });
    } else {
      var deferrer = $q.defer();
      deferrer.resolve(cache);
      return deferrer.promise;
    }
  }

  function getAudioTour() {
    return getData().then(function(data) {
      var selectedSight = {};
      var index = 0;
      angular.forEach(data.sections, function(section) {
        angular.forEach(section.sights, function(sight) {
          sight.id = indexToStingId(index);
          index++;
        });
      });
      return data;
    });
  }

  function getSight(slug) {
    return getData().then(function(data) {
      var selectedSight = {};
      angular.forEach(data.sections, function(section, sectionKey) {
        angular.forEach(section.sights, function(sight, sightKey) {
          if(sight.slug === slug) {
            selectedSight = sight;
          }
        });
      });
      return selectedSight;
    });
  }

  return {
    getAudioTour: getAudioTour,
    getSight: getSight,
  };
}]);
