var video = document.querySelector('video');
var videoOverlay = document.querySelector('.video-overlay');

video.addEventListener('play', function() {
  videoOverlay.classList.add('hide');
});
