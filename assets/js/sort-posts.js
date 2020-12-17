/* ----- Randomizing an array: -----

   This is a helper function that randomizes a given array.
   https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

*/

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

/* ----- Sorting the posts: -----

   The initial post list is sorted by date (latest on top)
   Sorting is done by saving a copy of this list as an array,
   then manipulating the elements in this array.

*/

// The post container
var postContainer = document.querySelector('.post-list');

// A NodeList of all the posts
var posts = document.querySelectorAll('.post-list li');

// Store the above NodeList in an array
var postsArray = [];
for (var i = 0; i < posts.length; i++) {
  postsArray.push(posts[i]);
}

function sortByLatest() {

  // Erase the content of the post list
  postContainer.innerHTML = "";

  // Append each element in the postsArray to the post container
  postsArray.forEach(function(post) {
    postContainer.appendChild(post);
  });

}

function sortByOldest() {

  // Erase the content of the post list
  postContainer.innerHTML = "";

  // Append each element in the postsArray to the post container
  postsArray.slice().reverse().forEach(function(post) {
    postContainer.appendChild(post);
  });

}

function sortByRandom() {

  // Erase the content of the post list
  postContainer.innerHTML = "";

  // Append each element in the postsArray to the post container
  shuffle(postsArray).forEach(function(post) {
    postContainer.appendChild(post);
  });

}
