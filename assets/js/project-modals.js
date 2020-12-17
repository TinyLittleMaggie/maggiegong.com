// Open the corresponding modal when a project item is clicked
var projectItems = document.querySelectorAll('.project-item');
for (var i = 0; i < projectItems.length; i++) {
  projectItems[i].addEventListener('click', function() {
    // Get the number of clicked item
    var itemID = this.id.slice(-1);
    // Find the corresponding modal
    var modal = document.querySelector('#project-' + itemID);
    // Show the modal
    modal.style.display = "block";
  });
}

// Close the modal when clicking:
// 1. Outside the modal
// 2. Inside the close-area
var overlays = document.querySelectorAll('.overlay');
for (var i = 0; i < overlays.length; i++) {
  overlays[i].addEventListener('click', function(e) {
    var overlayClicked = e.target.classList.contains('overlay');
    var closeAreaClicked = e.target.classList.contains('close-area');
    if (overlayClicked || closeAreaClicked) {
      // Hide the modal (and the overlay that contains it)
      this.style.display = "none";
    }
  });
}
