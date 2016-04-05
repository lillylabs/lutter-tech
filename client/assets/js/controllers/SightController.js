angular.module('application')
  .controller('SightController', [ '$scope', '$state', 'DataSource', 'AudioPlayer',  function($scope, $state, DataSource, AudioPlayer) {

    $scope.isPlaying = function() {
      return AudioPlayer.isPlayingTrack($scope.sight.slug);
    }

    $scope.playPause = function() {
      AudioPlayer.playPauseTrack($scope.sight.slug);
    }

    $scope.$on('audio.stateChanged', function(r, date){
      $scope.$apply();
    });

    //

    var slug = ($state.params.slug);
    if(!slug) {
      return;
    }

    DataSource.getSight(slug).then(function(sight) {
      sight.contentSrc = DataSource.getContentForSight(sight);
      $scope.sight = sight;
    });

  }])
