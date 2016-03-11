angular.module('application')
  .controller('PlayerController', [ '$scope', '$rootScope', '$http', 'DataSource',  function($scope, $rootScope, $http, DataSource) {

    $scope.playlist = [];
    $scope.audio = new Audio();
    $scope.currentTrack = {};

    DataSource.getAudioTour().then(function(tour) {
      angular.forEach(tour.sections, function(section, sectionKey) {
        angular.forEach(section.sights, function(sight, sightKey) {
          $scope.playlist.push({
            slug: sight.slug,
            title: sight.title,
            audio: sight.audio,
          });
        });
      });

      $scope.setTrack(0);

    });

    $scope.setTrack = function(i, action) {
      $scope.currentTrack = $scope.playlist[i];
      $scope.currentTrack.index = i;
      $scope.audio.src = '/site/audio/' + $scope.currentTrack.audio;
      if('play' == action) {
        console.log("autoplay");
        console.log($scope.audio);
        $scope.audio.play();
      }
    }

    // tell audio element to play/pause, you can also use $scope.audio.play() or $scope.audio.pause();
    $scope.playpause = function(){
      if( $scope.audio.paused ) {
        $scope.audio.play()
      } else {
        $scope.audio.pause();
      }
    };

    // listen for audio-element events, and broadcast stuff
    $scope.audio.addEventListener('play', function(){ $rootScope.$broadcast('audio.play', this); });
    $scope.audio.addEventListener('pause', function(){ $rootScope.$broadcast('audio.pause', this); });
    $scope.audio.addEventListener('ended', function(){ $rootScope.$broadcast('audio.ended', this); });

    // respond to set track messsages
    $rootScope.$on('audio.play', function(r, slug){
      var i = 0;
      angular.forEach($scope.playlist, function(track) {
        if(track.slug == slug) {
          $scope.setTrack(i, 'play');
          $scope.currentTrack.index = i;
        }
        i++;
      });
    });

    // respond to set track messsages
    $rootScope.$on('audio.ended', function(r, slug){
      if( $scope.currentTrack.index +1 < $scope.playlist.length ) {
        $scope.setTrack( $scope.currentTrack.index + 1 );
      } else {
        $scope.setTrack( $scope.currentTrack.index + 1 );
      }
    });

  }]);
