angular.module('application')
  .controller('SightController', [ '$scope', '$rootScope',  '$state', '$http', 'DataSource', 'AudioPlayer',  function($scope, $rootScope, $state, $http, DataSource, AudioPlayer) {

    $scope.isPaused = true;

    var slug = ($state.params.slug);
    if(!slug) {
      return;
    }

    $scope.isPaused = !AudioPlayer.isPlayingTrack(slug);

    DataSource.getSight(slug).then(function(sight) {
      sight.contentSrc = DataSource.getContentForSight(sight);
      $scope.sight = sight;
    });

    $scope.playPause = function() {
      $rootScope.$broadcast('audio.playPause', slug);
    }

    $rootScope.$on('audio.ended', function(r, date){
      $scope.$apply(function () {
        $scope.isPaused = true;
      });
    });

    $rootScope.$on('audio.paused', function(r, date){
      $scope.$apply(function () {
        $scope.isPaused = true;
      });
    });

    $rootScope.$on('audio.played', function(r, date){
      $scope.$apply(function () {
        $scope.isPaused = false;
      });
    });

  }])
