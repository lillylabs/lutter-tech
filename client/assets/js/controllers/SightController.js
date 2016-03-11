angular.module('application')
  .controller('SightController', [ '$scope', '$rootScope',  '$state', '$http', 'DataSource',  function($scope, $rootScope, $state, $http, DataSource) {

    var slug = ($state.params.slug);
    if(!slug) {
      return;
    }

    $scope.play = function() {
      $rootScope.$broadcast('audio.play', slug);
    }

    DataSource.getSight(slug).then(function(sight) {
      $scope.sight = sight;
    });



  }])
