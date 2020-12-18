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

// The dropdowns
var dropdownsContainer = document.querySelector('.post-list-options');
var sortDropdown = document.querySelector('#sort');
var typeDropdown = document.querySelector('#type');

/* -------------------------------------------------------------------------- */
/*                                Functions                                   */
/* -------------------------------------------------------------------------- */

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

// Sort any given array of posts based a criteria specified by "sortby"
function sortPosts(array, sortby) {

  // Create a copy of the array
  var newArr = array.slice();

  // Return the sorted array based on the sortby value
  // - note: sort() and shuffle() both sort the array IN PLACE
  if (sortby === "latest") {
    return newArr.sort(function(a, b) {
      return a.date.localeCompare(b.date) * -1;
    });
  } else if (sortby === "oldest") {
    return newArr.sort(function(a, b) {
      return a.date.localeCompare(b.date);
    });
  } else if (sortby === "random") {
    return shuffle(newArr);
  }

}

// Filter any given array of posts based a criteria specified by "type"
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
/*                             Event listener                                 */
/* -------------------------------------------------------------------------- */

// Update the post list when a new selection is made from any of the dropdowns
dropdownsContainer.addEventListener('input', function(e) {

  // Filter the initial array of posts
  var filtered = filterPosts(postsArray, typeDropdown.value);

  // Sort the filtered array
  var sorted = sortPosts(filtered, sortDropdown.value);

  // Display the result
  updatePostList(sorted);

});
