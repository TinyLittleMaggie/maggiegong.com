// Play buttons (play button & replay button)
var playBtns = document.querySelectorAll('.play-btn');
// The video element
var video = document.querySelector('video');
// The overlay to display before the video starts
var videoOverlay = document.querySelector('.video-overlay');
// The overlay to display when the video ends
var videoOverlayAfter = document.querySelector('.video-overlay-after');

// Hide the controls at first
video.controls = false;

// Behaviours of custom play buttons
playBtns.forEach(function(button) {
  button.addEventListener('click', function() {
    // Hide the overlays
    videoOverlay.classList.add('hide');
    videoOverlayAfter.classList.add('hide');
    // Play the video
    video.play();
    // Show the default video controls while video is playing
    video.controls = true;
  });
});

// When the video ends:
video.addEventListener('ended', function() {
  // Move playhead to the beginning of the video
  this.currentTime = 0;
  // Hide the video controls
  video.controls = false;
  // Show the overlay with "replay" button
  videoOverlayAfter.classList.remove('hide');
});
