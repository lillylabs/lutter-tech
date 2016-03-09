angular.module('application')
  .controller('HomeController', [ '$scope', '$http', 'DataSource',  function($scope, $http, DataSource) {

    DataSource.getAudioTour().then(function(tour) {
      $scope.tour = tour;
    });

  }])

  .controller('SightController', [ '$scope',  '$state', '$http', 'DataSource',  function($scope, $state, $http, DataSource) {

    var slug = ($state.params.slug);
    if(!slug) {
      return;
    }

    DataSource.getSight(slug).then(function(sight) {
      $scope.sight = sight;
    });

  }])

  .controller('MapController', [ '$scope', '$state', '$http', 'DataSource', 'leafletMapEvents', 'leafletMarkerEvents', function($scope, $state, $http, DataSource, leafletMapEvents, leafletMarkerEvents) {

    angular.extend($scope, {
      // Setting temporary center to Oslo
      center: {
        lat: 59.914831,
        lng: 10.767347,
        zoom: 16
      },
      tiles: {
        name: 'Positron',
        url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        type: 'xyz'
      },
      sights: {}
    });

    DataSource.getAudioTour().then(function(tour) {
      if(tour.tiles) {
        $scope.tiles = tour.tiles;
      }

      if(tour.center) {
        $scope.center = tour.center;
      }

      angular.forEach(tour.sections, function(section, sectionKey) {
        angular.forEach(section.sights, function(sight, sightKey) {
          $scope.sights[sight.slug] = {
            group: 'tour',
            lat: sight.location.lat,
            lng: sight.location.lng,
            icon: {
              type: 'div',
              iconSize: [24, 24],
              iconAnchor: [12, 12],
              className: 'marker',
              html: '<span class="badge" style="background-color:'+ section.color + '">' + sight.id +'</span>'
            }
          }
        });
      });
    });

    $scope.$on('leafletDirectiveMarker.click', function(event, args){
      $state.go('sight', { slug: args.modelName });
    });

    $scope.$on('leafletDirectiveMap.click', function(event, args){
      $state.go('home');
    });

//    console.log("--- MAP ----");
//    var mapEvents = leafletMapEvents.getAvailableMapEvents();
//    for (var k in mapEvents) {
//      var mapEventName = 'leafletDirectiveMap.' + mapEvents[k];
//      console.log(mapEventName);
//      $scope.$on(mapEventName, function(event){
//        $scope.eventDetected = event.name;
//        console.log(event.name);
//      });
//    }
//    console.log("--- MAP ----");
//    console.log("--- MARKER ----");
//    var markerEvents = leafletMarkerEvents.getAvailableEvents();
//    for (var k in markerEvents) {
//      var markerEventName = 'leafletDirectiveMarker.' + markerEvents[k];
//      console.log(markerEventName);
//      $scope.$on(markerEventName, function(event){
//        $scope.eventDetected = event.name;
//        console.log(event.name);
//      });
//    }
//    console.log("--- MARKER ----");

   }])
  .controller('HeadController', [ '$scope', '$http', 'DataSource',  function($scope, $http, DataSource) {

    DataSource.getAudioTour().then(function(tour) {
      $scope.title = tour.title;
    });

  }]);
