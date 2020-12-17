// Resize (shrink/expand) the nav bar based on scroll position
var navbar = document.querySelector('.site-header');
function resizeNav() {
  if (window.scrollY > 10) {
    navbar.classList.add('small');
  } else {
    navbar.classList.remove('small');
  }
}
setInterval(resizeNav, 100);
