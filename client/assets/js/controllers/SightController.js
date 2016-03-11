angular.module('application')
  .controller('SightController', [ '$scope',  '$state', '$http', 'DataSource',  function($scope, $state, $http, DataSource) {

    var slug = ($state.params.slug);
    if(!slug) {
      return;
    }

    DataSource.getSight(slug).then(function(sight) {
      $scope.sight = sight;
    });

  }])
