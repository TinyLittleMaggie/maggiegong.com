/* -------------------------------------------------------------------------- */
/*                                Variables                                   */
/* -------------------------------------------------------------------------- */

// The post container
var postContainer = document.querySelector('.post-list');

// A NodeList of all the posts
var posts = document.querySelectorAll('.post-list li');

// Transform posts into an array of objects
var postsArray = [];
for (var i = 0; i < posts.length; i++) {
  var post = {
    date: posts[i].dataset.postDate,
    type: posts[i].dataset.postType,
    node: posts[i]
  }
  postsArray.push(post);
}

// The dropdown elements
var dropdownsContainer = document.querySelector('.post-list-options');
var dropdownButtons = document.querySelectorAll('.post-list-options .button');
var dropdownMenus = document.querySelectorAll('.post-list-options .menu');

/* -------------------------------------------------------------------------- */
/*                                Functions                                   */
/* -------------------------------------------------------------------------- */

// --- 1. Basic dropdown menu behaviours:

// Detect which dropdown options are selected
function getSortByValue() {
  return document.querySelector('#sort input:checked').value;
}
function getTypeValue() {
  return document.querySelector('#type input:checked').value;
}

// Determine whether a dropdown should be opened
function openDropdown(eventTarget) {
  if (eventTarget.classList.contains("button")) {
    return true;
  } else if (eventTarget.classList.contains("selected-option")) {
    return true;
  } else {
    return false;
  }
}

// Determine which option has been selected
function selectedOption(eventTarget) {
  if (eventTarget.classList.contains("radio-circle")) {
    return eventTarget.value;
  } else if (eventTarget.classList.contains("option")) {
    return eventTarget.querySelector(".radio-circle").value;
  } else {
    return false;
  }
}

// Hide all dropdown menus
function hideAllMenus() {
  dropdownMenus.forEach(function(menu) {
    menu.classList.add('hide');
  });
}

// Sort the options in any given menu
function sortOptions(menu) {
  // Save the options in an array
  var options = menu.querySelectorAll('.option');
  var optionsArray = [];
  for (var i = 0; i < options.length; i++) {
    var option = {
      order: options[i].dataset.order,
      node:  options[i]
    }
    optionsArray.push(option);
  }
  // Sort the array by the inherent order of its options
  optionsArray.sort(function(a, b) {
    return b.order - a.order;
  });
  optionsArray.forEach(function(option) {
    menu.prepend(option.node);
  });
  // Place the selected option on top
  optionsArray.forEach(function(option) {
    var checked = option.node.querySelector('input:checked');
    if (checked) {
      menu.prepend(option.node);
    }
  });
}

// --- 2. Sorting the list of posts:

// A helper function that randomizes a given array.
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Sort any given array of posts based on "sortby"
function sortPosts(array, sortby) {

  // Create a copy of the array
  var newArr = array.slice();

  // Return the sorted array based on the sortby value
  // - note: sort() and shuffle() both sort the array IN PLACE
  if (sortby === "Latest on top") {
    return newArr.sort(function(a, b) {
      return a.date.localeCompare(b.date) * -1;
    });
  } else if (sortby === "Oldest on top") {
    return newArr.sort(function(a, b) {
      return a.date.localeCompare(b.date);
    });
  } else if (sortby === "Random") {
    return shuffle(newArr);
  }

}

// Filter any given array of posts based on "type"
function filterPosts(array, type) {

  if (type === "All") {
    return array;
  } else {
    return array.filter(function(post) {
      return post.type === type;
    });
  }

}

// Update the post list with any given array of posts
function updatePostList(array) {

  // Erase the content of the post list
  postContainer.innerHTML = "";

  // Append each node in the array to the post container
  array.forEach(function(post) {
    postContainer.appendChild(post.node);
  });

}

/* -------------------------------------------------------------------------- */
/*                             Event listeners                                */
/* -------------------------------------------------------------------------- */

// --- 1. Basic dropdown menu behaviours

dropdownButtons.forEach(function(button) {
  button.addEventListener('click', function(e) {
    // If a dropdown button is clicked, open the corresponding menu
    if (openDropdown(e.target)) {
      var menu = this.querySelector('.menu');
      // First, hide all menus in case there is already an open one
      hideAllMenus();
      // Then sort the options in the menu before displaying it
      sortOptions(menu);
      // Then display the correct menu for the clicked button
      menu.classList.remove('hide');
    }
    // Update the selected option on display
    if (selectedOption(e.target)) {
      this.querySelector('.selected-option').innerText = selectedOption(e.target);
    }
  });
});

// If a click happens outside of the dropdown, menu should be hidden
document.addEventListener('click', function(e) {
  if (!openDropdown(e.target)) {
    hideAllMenus();
  }
});

// If an .option is clicked, simulate a click on the input element inside of it
dropdownsContainer.addEventListener('click', function(e) {
  if (e.target.classList.contains('option')) {
    e.target.querySelector('input').click();
  }
});

// --- 2. Update the post list when a new selection is made from any of the dropdowns

dropdownsContainer.addEventListener('input', function(e) {

  // Filter the initial array of posts
  var filtered = filterPosts(postsArray, getTypeValue());

  // Sort the filtered array
  var sorted = sortPosts(filtered, getSortByValue());

  // Display the result
  updatePostList(sorted);

});
