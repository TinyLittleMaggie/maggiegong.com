---
layout:  post
title:   "Memory Game"
type:    "Project"
date:    2019-05-19 09:00:00 +0800
excerpt: A browser-based card matching game where you flip over all the cards to win. Built with HTML, CSS and Vanilla JavaScript.
---

<video controls
    src="https://res.cloudinary.com/tinylittlemaggie/video/upload/v1609246196/maggiegong.com/memory-game/memory-game-demo_eotdpg.mp4"
    poster="https://res.cloudinary.com/tinylittlemaggie/image/upload/v1609246189/maggiegong.com/memory-game/memory-game-thumb_mpbios.png"
    width="100%">

Sorry, your browser doesn't support embedded videos,
but don't worry, you can <a href="https://res.cloudinary.com/tinylittlemaggie/video/upload/v1609246196/maggiegong.com/memory-game/memory-game-demo_eotdpg.mp4">download it</a>
and watch it with your favorite video player!

</video>

<br>

### About the Project

This is the second project I’ve completed with Udacity’s <a href="https://www.udacity.com/course/front-end-web-developer-nanodegree--nd0011" target="_blank">Front-End Development Nanodegree Program</a>. After learning the basics of JavaScript and DOM manipulation, I am using these skills - along with the HTML and CSS skills I’ve learned earlier -  to build a simple browser-based card matching game. (It's currently functional in Chrome browser on desktop.)

<a href="https://tinylittlemaggie.github.io/The-Memory-Game" target="_blank">Play the game!</a><br>
<a href="https://github.com/TinyLittleMaggie/The-Memory-Game" target="_blank">GitHub Repository</a>

<br>

### Specification

The game board consists of a 4 x 4 grid, containing sixteen cards, each with a symbol on one side. There are eight symbols in total, and therefore eight pairs of cards. When the game begins, the cards are shuffled with the symbols face down, then the player reveals two cards at a time to match the pairs until all symbols are revealed.

Each turn:

- The player flips over one card to reveal its symbol
- Then turns over a second card, trying to find the other card with the same symbol.
- If the cards match, both cards stay flipped over.
- If the cards do not match, both cards are flipped face down.

<a href="https://www.youtube.com/watch?v=r5YOzWxcbng" target="_blank">An example by Udacity</a><br>
<a href="https://review.udacity.com/#!/rubrics/591/view" target="_blank">A more detailed project specification</a>

<br>

### The Workflow

The project is broken down into the following steps, and completed over a few days (part-time).​​​​​​​

1. Set up the card deck using HTML & CSS, and use JavaScript to <a href="https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/2450976#2450976" target="_blank">shuffle the card symbols</a> once the page is loaded

2. Set up two sides for each card, and use a combination of <a href="https://www.youtube.com/watch?v=OV8MVmtgmoY" target="_blank">JavaScript and CSS</a> to “flip” it. Event listeners are used to handle the clicks.

3. Work on the matching logic. Use an array to store two of the most recently clicked cards, and compare the symbols inside them. Keep track of the number of matched pairs to determine when the user wins the game.

4. Use three performance indicators: a move counter and its corresponding star rating, and a timer. Display them below the card deck, as well as in a pop-up model when all cards are matched.

5. Package reusable code snippets into functions, particularly those relating to initiating the game (declaring and initialising variables such as the move counter, the card array used for matching logic, etc.) Make it possible to restart during the game, and to play again once finished.

6. Use Git and GitHub for version control throughout the project. (Daniel Shiffman has a wonderful <a href="https://www.youtube.com/playlist?list=PLRqwX-V7Uu6ZF9C0YMKuns9sLDzK6zoiV" target="_blank">tutorial series</a> on this topic!)

Most of the above steps are easy to implement (with help from the Internet!). I’ve found two things particularly interesting: shuffling the cards, and calculating the star rating in real time during the game.

In this project, I’m using the <a href="https://bost.ocks.org/mike/shuffle/" target="_blank">Fisher-Yates shuffling algorithm</a> to randomly arrange the cards, because it is considered <a href="https://bost.ocks.org/mike/shuffle/compare.html" target="_blank">unbiased</a>. I love these visualisations and hope to dive deeper to understand how they work!

Besides, I wrote my own mini algorithm to constantly update the star rating as a player makes more moves during the game. This feature is part of Udacity’s project specification. Although in reality the game would be better off without it (because of course we want to leave it to the congratulations pop-up!), it was fun designing a mechanism that makes the most sense. I’ve played the game oh so many times to determine a reasonable star rating system, and here’s what I’ve come up with: 3 stars for 30 moves or below, 2 stars for moves between 32 and 38 (both ends included), 1 star for moves between 40 and 46 (both ends included) and 0 stars for 48 moves or above.

To display the star rating during the game, an obvious solution is to directly link the current number of moves to this star rating system. But what if a player, say, only manages to match two cards when (s)he has already made 30 moves? Three stars doesn’t seem fair. To solve this problem, I’ve used a variable to store an “estimated minimum moves” by simply adding up the current number of moves and the number of remaining cards. The “estimated minimum moves” means that at any given time during the game, if the player plays all remaining cards perfectly, (s)he will have made this many moves when (s)he wins. This variable is then translated into the star rating displayed below the card deck.

It’s a small thing, but an important step towards justice :)

<br>

### What’s next

1. Code styling & refactoring:
  - Package long and/or repeated code into functions to make it more readable and easier to maintain
  - Currently using one event listener for each card. Need to use event delegation to improve performance
  - Check the code against strict mode

2. Usability & compatibility: The game currently works in Chrome browser on desktop. More work needs to be done to support:
  - Popular browsers: Firefox, Edge, IE, Safari
  - Devices: desktop, tablet, mobile phone

3. Additional functionality:
  - Stop the timer when time is up, and use a different pop up for losing the game
  - Store game score locally, and display player’s highest scores
  - Develop different levels! (e.g. the card deck can be 2x4, 3x4, 4x4, 6x6 etc.)
  - Improve visual feedback by using CSS animations for hovered, clicked, matched, unmatched cards
  - Animate the pop-up model to slide in and out
  - Add sounds to the game!
