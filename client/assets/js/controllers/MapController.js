angular.module('application')
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

   }])
