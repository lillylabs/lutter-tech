angular.module('application')
  .service('AudioPlayer', [ '$http', 'DataSource',  function( $http, DataSource ) {

    var audio = new Audio();
    var currentTrack = {};

    var playTrack = function(slug) {
      DataSource.getSight(slug).then(function(sight) {
        currentTrack = slug;
        audio.src = DataSource.getAudioForSight(sight);
        audio.play();
      });
    }

    var toggleCurrentTrack = function() {
      if(audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    }

    var playPauseTrack = function(slug) {

      if(currentTrack !== slug) {
        playTrack(slug);
      } else {
        toggleCurrentTrack();
      }
    }

    var isPlayingTrack = function(slug) {
      return currentTrack === slug && !audio.paused;
    }

    // listen for audio-element events, and broadcast stuff
    audio.addEventListener('play', function(){
      $rootScope.$broadcast('audio.stateChanged', this);
    });
    audio.addEventListener('pause', function(){
      $rootScope.$broadcast('audio.stateChanged', this);
    });
    audio.addEventListener('ended', function(){
      $rootScope.$broadcast('audio.stateChanged', this);
    });

    return {
      isPlayingTrack: isPlayingTrack,
      playPauseTrack: playPauseTrack
    }

  }]);
