angular.module('application')
  .controller('HomeController', [ '$scope', '$http', 'DataSource',  function($scope, $http, DataSource) {

    DataSource.getAudioTour().then(function(tour) {
      $scope.tour = tour;
    });

  }]);
