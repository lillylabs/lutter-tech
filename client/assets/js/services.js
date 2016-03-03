angular.module('application').service('DataSource', ['$http', '$q', function($http, $q) {

  var cache = null;

  function getData() {
    if(!cache) {
      return $http.get('/assets/data.json').then(function(result){
        cache = result.data;
        return cache;
      });
    } else {
      var deferrer = $q.defer();
      deferrer.resolve(cache);
      return deferrer.promise;
    }
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
    getAudioTour: getData,
    getSight: getSight
  };
}]);