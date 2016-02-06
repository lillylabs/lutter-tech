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

    console.log("SLUG " + slug);

    DataSource.getSight(slug).then(function(sight) {
      console.log("SIGHT");
      console.log(sight);
      $scope.sight = sight;
    });

  }])
  .controller('MapController', [ '$scope', '$http', 'DataSource', function($scope, $http, DataSource) {

    var tilesDict = {
      mapbox_pirates: {
        name: 'Pencil',
        url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
        type: 'xyz',
        options: {
          apikey: 'pk.eyJ1IjoicmFhZSIsImEiOiJjaWs1c2h1MDUwMDhxcGlrc2M3aDY3eGg3In0.myKqL-seHOWovZvBSz209g',
          mapid: 'mapbox.pirates'
        }
      },
      mapbox_comic: {
        name: 'Pencil',
        url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
        type: 'xyz',
        options: {
          apikey: 'pk.eyJ1IjoicmFhZSIsImEiOiJjaWs1c2h1MDUwMDhxcGlrc2M3aDY3eGg3In0.myKqL-seHOWovZvBSz209g',
          mapid: 'mapbox.comic'
        }
      },
      mapbox_pencil: {
        name: 'Pencil',
        url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
        type: 'xyz',
        options: {
          apikey: 'pk.eyJ1IjoicmFhZSIsImEiOiJjaWs1c2h1MDUwMDhxcGlrc2M3aDY3eGg3In0.myKqL-seHOWovZvBSz209g',
          mapid: 'mapbox.pencil'
        }
      },
      cartodb_positron: {
        name: 'Positron',
        url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        type: 'xyz'
      }
    };


    angular.extend($scope, {
      // Setting center to Oslo
      // TODO: Set according to tour points
      center: {
        lat: 59.914831,
        lng: 10.767347,
        zoom: 15
      },
      tiles: tilesDict.cartodb_positron
    });

   }]);
