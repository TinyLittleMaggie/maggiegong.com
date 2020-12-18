// Select elements
var exploreBtn = document.querySelector('.explore-btn');
var tides = document.querySelector('.tides');
var projectItems = document.querySelectorAll('.project-item');

// Once the visitor clicks the "explore" button, it will fade out.
// Since it's hidden by setting opacity to 0, the button is still there,
// and is still clickable. We need to use a variable to keep track of
// whether it has been clicked, so that it can be disabled once clicked.
var btnClicked = false;

function showProjectItems() {
  for (var i = 0; i < projectItems.length; i++) {
    projectItems[i].classList.remove('hide');
  }
}

exploreBtn.addEventListener('click', function() {

  if (!btnClicked) {

    // Hide the explore button
    exploreBtn.classList.add('hide');

    // Move the tides up
    tides.classList.add('high');

    setTimeout(function() {
      // When the tides are at the highest point (2s after animation started),
      // sneakily show the project items behind them.
      showProjectItems();
      // Move the tides back to original position
      tides.classList.remove('high');
    }, 2000);

    // Mark btnClicked as true so the animation can't be triggered again
    btnClicked = true;

  }
});
