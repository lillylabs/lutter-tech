angular.module('application')
  .controller('HomeController', [ '$scope', '$state', 'DataSource', 'AudioPlayer',  function( $scope, $state, DataSource, AudioPlayer ) {

    $scope.isPlaying = function(slug) {
      return AudioPlayer.isPlayingTrack(slug);
    }

    $scope.playPause = function(slug) {
      AudioPlayer.playPauseTrack(slug);
    }

    $scope.goToSight = function(slug) {
      $state.go('sight', { slug: slug });
    }

    $scope.$on('audio.stateChanged', function(r, date){
      $scope.$apply();
    });

    // Load data

    DataSource.getAudioTour().then(function(tour) {
      $scope.tour = tour;
    });

  }]);
