/*****************************************************************************/
//                            Regular Functions
/*****************************************************************************/

// Reset game
function resetFroggerGame() {
  player = new Player(2, 0);
  allStars = [];
  starNumber = 0;
  document.querySelector('#project-1 .winningPopUp').style.visibility = "hidden";
}

// Random Number Generator
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Simple collision detection
// In this game, objects can be considered as 101 * 83 boxes.
function collides(a, b) {
  let xDistance = Math.abs(a.x - b.x);
  let yDistance = Math.abs(a.y - b.y);
  if (xDistance < 70 && yDistance < 80) {
    return true;
  } else {
    return false;
  }
}

// Check collisions of all entities
function checkCollisions() {

  // Detect star collection
  allStars.forEach(function(star) {
    if (collides(star, player)) {
      star.collected = true;
      starNumber++;
    }
  });
  allStars = allStars.filter(function(star) {
    return star.collected == false;
  });

  // Detect enemy attacks
  allEnemies.forEach(function(enemy) {
    if (collides(enemy, player)) {
      player.x = 202;
      player.y = -20;
      starNumber = 0;
    }
  });

  // Detect player arrival
  if (player.y > 394) {
    // Display congratulations panel
    document.querySelector('#project-1 .winningPopUp').style.visibility = "visible";
    document.querySelector('.score').innerHTML = '× ' + starNumber;
    // Disable player movements
    player.active = false;
  }
}

/*****************************************************************************/
//                Constructor Functions and Object Methods
/*****************************************************************************/

// Enemies that a player must avoid
var Enemy = function(x, y, v) {
  this.sprite = '/demos/project-1/images/cloud.png';
  this.x = x * 101;
  this.y = y * 83 - 20;
  this.v = v;
};

// Update the enemy's position
Enemy.prototype.update = function(dt) {
  // move the enemies at v pixels/second
  // (Multiplying movement by the dt parameter
  // ensures that the game runs at the same speed for all computers.)
  this.x = this.x + this.v * dt;
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// ------------------------------------------------------------------------- //

// The Player Constructor
var Player = function(x, y) {
  this.sprite = '/demos/project-1/images/zoe.png';
  this.x = x * 101;
  this.y = y * 83 - 20;
  this.active = true;
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() {
  // This function is useless at the moment!
};

Player.prototype.handleInput = function(key) {
  // Move player according to keyboard input

  if (this.active === true) {
    // Only respond to arrow keys when player is active
    switch (key) {
      // If statements are used to detect canvas boundaries
      case 'left':
        if (this.x > 0) {
          this.x = this.x - 101;
        }
        break;
      case 'right':
        if (this.x < 404) {
          this.x = this.x + 101;
        }
        break;
      case 'up':
        if (this.y > 63) {
          // This prevents the player from going back to the blue area
          this.y = this.y - 83;
        }
        break;
      case 'down':
        if (this.y < 395) {
          this.y = this.y + 83;
        }
    }
  }
};
// ------------------------------------------------------------------------- //

// Stars that the player can collect
var Star = function(x, y) {
  this.sprite = '/demos/project-1/images/star.png';
  this.x = x * 101;
  this.y = y * 83 - 20;
  this.collected = false;
};

Star.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*****************************************************************************/
//                          Now The Game Starts!
/*****************************************************************************/

// Instantiate entities & initiate variables
var player = new Player(2, 0);
var allStars = [];
var allEnemies = [];
var starNumber = 0;

// Generate the first four enemies
// (so that the canvas isn't completely empty when the game starts)
for (i = 0; i < 4; i++) {
  let x = getRandomInt(0, 4);
  let y = getRandomInt(1, 4);
  let v = getRandomInt(60, 240);
  allEnemies.push(new Enemy(x, y, v));
}

// Generate the rest of the enemies
// (every time an enemy is generated, also go over the entire array and
// delete those enemies that have reached the right edge of the canvas)
setInterval(function() {
  let x = -1;
  let y = getRandomInt(1, 4);
  let v = getRandomInt(60, 240);
  allEnemies.push(new Enemy(x, y, v));
  allEnemies = allEnemies.filter(function(element) {
    return element.x < 505;
  });
}, 1000);

// Generate stars every 3 seconds
// (only add new stars when there are less than three stars)
setInterval(function() {
  if (allStars.length < 3) {
    let x = getRandomInt(0, 4);
    let y = getRandomInt(1, 4);
    allStars.push(new Star(x, y));
  }
}, 3000);

/*****************************************************************************/
//                         Events to Listen For
/*****************************************************************************/

// Listen for key presses and send the keys to the Player.handleInput() method.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});

// The "Play again" button
document.querySelector('.playAgain').addEventListener('click', function() {
  resetFroggerGame();
});
