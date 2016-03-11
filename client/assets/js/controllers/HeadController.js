angular.module('application')
  .controller('HeadController', [ '$scope', '$http', 'DataSource',  function($scope, $http, DataSource) {

    DataSource.getAudioTour().then(function(tour) {
      $scope.title = tour.title;
    });

  }]);
