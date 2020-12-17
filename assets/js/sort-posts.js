/* -------------------- Define useful variables: -------------------- */

// The post container
var postContainer = document.querySelector('.post-list');

// A NodeList of all the posts
var posts = document.querySelectorAll('.post-list li');

// Store the above NodeList in a few arrays
var allPostsArray = [];
var projectsArray = [];
var experimentsArray = [];
var thoughtsArray = [];

for (var i = 0; i < posts.length; i++) {
  var type = posts[i].dataset.postType;
  // Save all posts in the allPostsArray
  allPostsArray.push(posts[i]);
  if (type === "Project") {
    projectsArray.push(posts[i]);
  } else if (type === "Experiment") {
    experimentsArray.push(posts[i]);
  } else if (type === "Thoughts") {
    thoughtsArray.push(posts[i]);
  }
}

// The dropdowns
var sortBy = document.querySelector('#sort');
var type = document.querySelector('#type');


/* -------------------- Randomize an array: --------------------

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

/* -------------------- Sort the posts: --------------------

   The initial post list is sorted by date (latest on top)
   Sorting is done by saving a copy of this list as an array,
   then manipulating the elements in this array.

*/

// 1. Sort by latest on top
function sortByLatest() {

  // Erase the content of the post list
  postContainer.innerHTML = "";

  // Append each element in the allPostsArray to the post container
  allPostsArray.forEach(function(post) {
    postContainer.appendChild(post);
  });

}

// 2. Sort by oldest on top
function sortByOldest() {

  // Erase the content of the post list
  postContainer.innerHTML = "";

  // Append each element in the reversed copy of allPostsArray to the post container
  allPostsArray.slice().reverse().forEach(function(post) {
    postContainer.appendChild(post);
  });

}

// 3. Randomize the list
function sortByRandom() {

  // Erase the content of the post list
  postContainer.innerHTML = "";

  // Append each element in the randomized copy of allPostsArray to the post container
  shuffle(allPostsArray.slice()).forEach(function(post) {
    postContainer.appendChild(post);
  });

}

/* -------------------- Filter the posts: -------------------- */

function showProjects() {

  // Erase the content of the post list
  postContainer.innerHTML = "";

  // Append each element in the projectsArray to the post container
  projectsArray.forEach(function(post) {
    postContainer.appendChild(post);
  });

}

function showExperiments() {

  // Erase the content of the post list
  postContainer.innerHTML = "";

  // Append each element in the experimentsArray to the post container
  experimentsArray.forEach(function(post) {
    postContainer.appendChild(post);
  });

}

function showThoughts() {

  // Erase the content of the post list
  postContainer.innerHTML = "";

  // Append each element in the thoughtsArray to the post container
  thoughtsArray.forEach(function(post) {
    postContainer.appendChild(post);
  });

}

// --- Add event listener to the dropdowns

sortBy.addEventListener('input', function(e) {
  var selected = e.target.value;
  if (selected === "latest") {
    sortByLatest();
  } else if (selected === "oldest") {
    sortByOldest();
  } else {
    sortByRandom();
  }
});

type.addEventListener('input', function(e) {
  var selected = e.target.value;
  if (selected === "project") {
    showProjects();
  } else if (selected === "experiment") {
    showExperiments();
  } else if (selected === "thoughts") {
    showThoughts();
  } else {
    sortByLatest();
  }
});

