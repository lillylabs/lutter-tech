angular.module('application')
  .service('AudioPlayer', [ '$rootScope', '$http', 'DataSource',  function($rootScope, $http, DataSource) {

    var audio = new Audio();
    var currentTrack = {};

    var playTrack = function(slug) {
      DataSource.getSight(slug).then(function(sight) {
        currentTrack = slug;
        audio.src = '/site/audio/' + sight.audio;
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
    audio.addEventListener('play', function(){ $rootScope.$broadcast('audio.played', this); });
    audio.addEventListener('pause', function(){ $rootScope.$broadcast('audio.paused', this); });
    audio.addEventListener('ended', function(){ $rootScope.$broadcast('audio.ended', this); });

    // respond to set track messsages
    $rootScope.$on('audio.playPause', function(r, slug){
      console.log("play pause");
      playPauseTrack(slug);
    });

    return {
      isPlayingTrack: isPlayingTrack
    }

  }]);
