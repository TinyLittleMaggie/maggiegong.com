---
layout:  post
title:   "Frogger Game"
type:    "Project"
date:    2019-06-23 09:00:00 +0800
excerpt: A revamp of the classic arcade game where you move the character across the canvas while avoiding collision with obstacles. Built with object-oriented JavaScript & HTML canvas.
---

<video controls
    src="https://res.cloudinary.com/tinylittlemaggie/video/upload/v1609240695/maggiegong.com/frogger-game/frogger-game-demo_crdmz7.mp4"
    poster="https://res.cloudinary.com/tinylittlemaggie/image/upload/v1609241055/maggiegong.com/frogger-game/frogger-game-demo-thumb_xjyr9i.png"
    width="100%">

Sorry, your browser doesn't support embedded videos,
but don't worry, you can <a href="https://res.cloudinary.com/tinylittlemaggie/video/upload/v1609240695/maggiegong.com/frogger-game/frogger-game-demo_crdmz7.mp4">download it</a>
and watch it with your favorite video player!

</video>

<br>

### 1. How to Play

Help Zoe (the little red thingy at the top) move to the other side of the canvas using your arrow keys. Avoid the dark clouds and collect as many stars as possible!

<a href="https://tinylittlemaggie.github.io/The-Frogger-Game" target="_blank">Play the game!</a><br>
<a href="https://github.com/TinyLittleMaggie/The-Frogger-Game" target="_blank">GitHub Repository</a>

<br>

### 2. The Concept

This is the third project I've completed with Udacity's <a href="https://www.udacity.com/course/front-end-web-developer-nanodegree--nd0011" target="_blank">Front-End Web Development Nanodegree</a>. It is based on a classic arcade game called “Frogger”. The idea is simple: a player will cross the game board while avoiding collision with the enemies. Basic graphic assets and a game engine (the “scaffold” of the code) are provided by the online programme, and students are required to complete the rest of the game using JavaScript.

The graphic assets provided to us weren’t the most pretty ones :P , and I felt quite compelled to make my own version. As I explored this idea, I realised that I wanted the game to have a story. I wanted little Zoe to cross the game board to get to her hopes and dreams on the other side, and I hoped that while doing so, she could stave off the unhelpful thoughts and cherish the good memories. That’s what the clouds and the stars are about :) Yes, I know, I’m making a big deal of it! But it’s always helpful to have a reason for what you are doing. Because of this personal connection, I had a great time drawing the graphic assets, and felt motivated to develop the concept.

<a href="https://www.youtube.com/watch?v=kaifTslArtY" target="_blank">Demo by Udacity</a><br>
<a href="https://review.udacity.com/#!/rubrics/15/view" target="_blank">Project requirements</a>

<br>

### 3. The Workflow

#### 3.1 Understanding the game loop & delta time

The most time-consuming step of this project was to understand Udacity’s game engine well enough to build on top of it. After digging through the code and researching around, my understanding is this: the game engine works like a “flip book”, and the graphic assets are repeatedly rendered at varying locations on the screen to create the illusion of animation. If we break this down further, each frame (or each “game loop”) involves the following steps:

1. Update: update the data of each object, such as its x and y location on the canvas
2. Render: clear up the canvas, then draw the images at the updated locations
3. Repeat: repeat the above!

Since the frequency at which the images are rendered (i.e. the frame rate) can vary depending on the computer’s processing power (among other factors), if we move an object by, for example, incrementing its location by 100 pixels for each frame, then its velocity depends on the frame rate. In this case, if someone has a faster computer, or has closed down all the other programmes running in the background, the object might move faster. In order to move the objects at consistent velocities for anyone at any given time, we’re introducing the delta time!

Let’s say we have an environment where the frame rate is _**F**_, and we have rendered an object at the location: _**(x, y)**_. We then ask the browser to draw the next frame whenever it’s ready. The new location of this object is _**(x’, y’)**_, and the time between these two frames is _**▵t**_ (delta time).

![Delta time explained](https://res.cloudinary.com/tinylittlemaggie/image/upload/v1609240691/maggiegong.com/frogger-game/delta-explained_hdeayf.png)

Instead of incrementing the object’s location by a certain number of pixels per frame (thus causing its velocity to vary for different environments or to fluctuate over time), we will programme the object to move _**▵x = v • ▵t**_ between two frames. Therefore, the new location is:

<p style="text-align: center;"><em>x’ = x + ▵x  = x +  v • ▵t</em></p>

This is reflected in the code as follows:

```javascript
// Enemies that a player must avoid
var Enemy = function(x, y, v) {
  this.sprite = 'images/cloud.png';
  this.x = x * 101;
  this.y = y * 83 - 20;
  this.v = v;
};

// Update the enemy's position
Enemy.prototype.update = function(dt) {
  this.x = this.x + this.v * dt;
};
```

Over the period of **one second**, the number of frames rendered is _**F**_, and the distance that the object will have travelled is: _**S = ▵x • F = v • ▵t • F**_, where _**▵t • F = 1**_. Therefore, the object will have travelled _**S = v**_, which is the constant that we assigned to the object as its “velocity”. In this way, we are making sure that no matter how fast (or slow) the objects are rendered, they will move at a consistent velocity:

<p style="text-align: center;"><em>v pixels/second</em></p>

<br>

#### 3.2 Using Object-oriented JavaScript to implement basic functionalities

This project has been a great exercise to help me understand the basic concepts in object-oriented programming. The player (Zoe), the clouds and the stars are all instances of their respective classes. All these objects have their own set of data (properties) and functionalities (methods). For example:

- All these objects have an x location and a y location. In addition, an enemy has a velocity property, a player has a boolean property "active" that controls its mobility, and a star has a boolean property "collected" that indicates whether it’s been collected.
- A player can move left, right, up and down. It can't move off the canvas, and it can’t move back to the blue zone once it enters the grey zone.
- An array is used to store all the enemies (i.e. clouds). These enemies are generated at random y location every 1 second, and they move across the canvas horizontally at varying speeds. Once they move off the canvas, they’re deleted from the array.
- Another array is used to store all the collectibles (i.e. stars). These collectibles are generated at random location every 3 seconds, and will be removed from the array once the player collects them. Also, a new collectible won’t be generated unless there are less than 3 of them in the canvas.

I’ve also written a simple collision detection function to check the game status:

- If the player runs into a cloud, it will be moved back to its starting position and all stars previously collected are lost.
- If the player moves onto a star, the star can be collected.
- Once the player reaches the bottom of the game board, the game is won and the number of stars is displayed.

<br>

#### 3.3 Drawing the graphic assets

The graphic assets and the code were actually developed in parallel. It was a bit of a messy / iterative process, where I was coding the game’s functionalities while coming up with new ideas and immediately drawing new assets that then get incorporated into the code. (So much fun!)

<br>

![](https://res.cloudinary.com/tinylittlemaggie/image/upload/v1609240692/maggiegong.com/frogger-game/game-assets-sketches_guocj7.jpg)_Hand-drawn sketches_

<br>

![](https://res.cloudinary.com/tinylittlemaggie/image/upload/v1609240693/maggiegong.com/frogger-game/prototype_uuav8k.png)_Building and testing basic functionalities_

<br>

![](https://res.cloudinary.com/tinylittlemaggie/image/upload/v1609240693/maggiegong.com/frogger-game/game-assets-colored_f76j7e.png)_Graphic assets made in Tayasui Sketches (on iPad!)_

<br>

### 4. What’s Next

1. I think there is something unclear in my understanding about the game loop and delta time, and I could definitely revisit some lost knowledge in calculus!

2. The distribution / placement of the clouds needs to be optimised. For example, sometimes there are too many clouds clustered around a certain area and the player can be cornered easily. Is there a way to make the clouds a bit more spread out? Also, why do they not look so random? (There are often several clouds with the same y location generated in a row)

3. The stars are sometimes created at the same location. A player can sometimes collect two stars at once. How to randomise the location of a newly created star while avoiding overlapping it with previously created ones?

4. I’d like to change the way that the game responds to a player-enemy collision. Instead of immediately sending the player back to its starting position and taking away all the collected stars, I want to place the player in a cloud bubble where it will be stuck for a few seconds before it can move again. (Going back to the story behind the game, when you get too caught up in thinking, you lose the precious time that you could otherwise spend enjoying the moment :P) The main goal of the game will then become “to collect as many stars as possible within a limited amount of time”.

5. I would love to play with background music and sound effects too!

