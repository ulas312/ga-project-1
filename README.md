## ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)


## General Assembly, Software Engineering Immersive Project-1


## Completed over 7 days solo.


## Project #1: The Game


---


## Overview


### Classic Space Invaders


Space Invaders is a classic arcade game from the 80s. The player aims to shoot an invading alien armada, before it reaches the planet's surface using a mounted gun turret.


The player can only move left or right. The aliens also move from left to right, and also down each time they reach the side of the screen. The aliens also periodically drop bombs towards the player.


Once the player has destroyed a wave of aliens, the game starts again. The aim is to achieve the highest score possible before either being destroyed by the aliens, or allowing them to reach the planet's surface.


---


### Technical Requirements


Your app must:


- **Render a game in the browser**
- **Design logic for winning** & **visually display which player won**
- **Include separate HTML / CSS / JavaScript files**
- Stick with **KISS (Keep It Simple Stupid)** and **DRY (Don't Repeat Yourself)** principles
- Use **Javascript for **DOM manipulation\*\*
- **Deploy your game online**, where the rest of the world can access it
- Use **semantic markup** for HTML and CSS (adhere to best practices)


---


## Technologies used


- HTML 5
- CSS
- Javascript
- Git and GitHub
- Figma
- Adobe Illustrator
- Google Fonts


---


## Deployment


Visit the site here - [Space Invaders](https://ulas312.github.io/ga-project-1/)


---


![Space invaders game play](https://media.giphy.com/media/25p2OUAhuKIENRAK3x/giphy.gif)


<p>The game is played with the left and right arrows to move the player along the bottom of the game screen. The player is able to shoot lasers towards the alien invaders by pressing the spacebar.</P>


---


## Planning Process


<p>The game is made up on one page with 3 sections</p>


<li>Start game - click here to play</li>
<li>Game</li>
<li>Game over - play again</li>
</ul>


<p>For my theme Idea I wanted to keep it retro and go for a copy of the classic game. Wanted to make the page seem like the screen of the 40th anniversary edition of the space invaders arcade 1up .
</p>


<p>I then used Figma to do a mockup and a mood board for design ideas as well as a little Pseudocode </P>


![Figma](https://i.postimg.cc/Hx0fzKhz/Screenshot-2023-01-02-at-22-45-21.png)


---


## Build Process


### Graphics


- Most of the graphics and sprites I created using Adobe Illustrator were in the right .png format I needed so there wasn't a background to them.


![Sprites](https://i.postimg.cc/SR96F6zG/sprite.png)


### Grid


- The game is based on a 20 x 20 grid. I created the divs using a for loop, and pushed them to an empty array.


```js
const width = 20;
const gridCellCount = width * width;


function createGrid() {
 for (let i = 0; i < gridCellCount; i++) {
   const cell = document.createElement('div');
   if (i < width) cell.classList.add('ceiling');
   if (i > width ** 2 - width - 1) cell.classList.add('floor');
   cell.setAttribute('data-index', i);
   cells.push(cell);
   grid.appendChild(cell);
 }
 addLaserBase(laserBasePosition);
}
```


- I generated an array of aliens and displayed them on a grid by appending the class aliens to the divs. To create their movement patterns, I utilised a for-each loop to shift the index of the aliens array and then passed the aliens' indexes to the div index to present their movements.


```javascript
function addInvader() {
 invaderPositionIndex.forEach((invader) => {
   cells[invader].classList.add('addInvader');
 });
}


function removeInvader() {
 invaderPositionIndex.forEach((invader) => {
   cells[invader].classList.remove('addInvader');
 });
}
```


```javascript
function moveInvader() {
 timer = setInterval(() => {
   checkIfHasHitWall();
   checkIfHitBottom();
   if (goingRight) {
     audioInvaderMovement.play();
     removeInvader();
     invaderPositionIndex = invaderPositionIndex.map((i) => i + 1);
     addInvader();
   } else {
     audioInvaderMovement.play();
     !goingRight;
     removeInvader();
     invaderPositionIndex = invaderPositionIndex.map((i) => i - 1);
     addInvader();
   }
 }, 900);
}
```


- I developed a function using setInterval to move the player's lasers and the alien's bombs. The function moves the index of the player's laser upwards and the alien bomb class downwards at regular intervals. Additionally, I included a collision detection condition within the function to trigger an explosive sprite sheet class and remove the alien when the player's laser hits the alien.


```js
function shootBullet(e) {
 if (e.keyCode === 32) {
   e.preventDefault();
   audioLaser.play();
   let bulletPosition = laserBasePosition;
   const playerBulletMoving = setInterval(() => {
     const y = Math.floor(bulletPosition / width);
     if (y === 0) {
       cells[bulletPosition].classList.remove('bullet');
       clearInterval(playerBulletMoving);
     } else if (cells[bulletPosition].classList.contains('addInvader')) {
       cells[bulletPosition].classList.remove('bullet', 'addInvader');
       cells[bulletPosition].classList.add('addInvader-Explosion');
       audioInvaderKilled.play();
       setTimeout(() => {
         cells[bulletPosition].classList.remove('addInvader-Explosion');
         audioInvaderKilled.play();
       }, 300);
       const invaderIndex = invaderPositionIndex.indexOf(bulletPosition);
       invaderPositionIndex.splice(invaderIndex, 1);
       score = score + 100;
       currentScore.textContent = score;
       clearInterval(playerBulletMoving);
     } else if (cells[bulletPosition].classList.contains('addShield')) {
       cells[bulletPosition].classList.remove('bullet', 'addShield');
       clearInterval(playerBulletMoving);
     } else {
       cells[bulletPosition].classList.remove('bullet');
       bulletPosition -= 20;
       cells[bulletPosition].classList.add('bullet');
     }
   }, 100);
 }
}
```


- The game has 3 sections - start of the game, playing the game and the ending. Each section had to be shown and hidden at different times. This was done with hidden classes in CSS that get called at the times needed with JavaScript.


```js
intro.classList.add('hidden');
ending.classList.add('hidden');


function startGame() {
 moveInvader();
 endGameCheck();
 addShield();
 shootBombs();
 setInterval(shootBombs, 1300);
 intro.classList.add('hidden');
 ending.classList.add('hidden');
 lives = 3;


 function gameOver(gameOverStatement) {
   result.classList.remove('hidden');
   result.innerHTML = gameOverStatement;
   removeInvader();
   removeLaserBase();
   clearInterval(timer);
   clearInterval(shootBombs);
   clearInterval(invaderBombInterval);
   clearInterval(baseLaserShoot);
   clearInterval(score);
   clearInterval(endGameChecker);
   grid.classList.remove('grid');
   grid.classList.add('hidden');
   ending.classList.remove('hidden');
 }
}
```


- Just like the original Space Invaders game I added the original sound effects for different parts of the game as well as a retro theme song that you have the option to toggle on at the start menu.


```javascript
function playIntroAudio() {
 audioElement.src = './sounds/spaceinvaders1.mpeg';
 audioElement.play();
}
playButton.addEventListener('click', playIntroAudio);
```


- In the following code snippet you can see every time the space key was pressed it would play an audio clip and fire the bullet. When the bullet hits a target either the shield or the alien invaders it would again make a sound effect and would also add then remove a graphic of an explosion.


```javascript
function shootBullet(e) {
 if (e.keyCode === 32) {
   e.preventDefault();
   audioLaser.play();
   let bulletPosition = laserBasePosition;
   const playerBulletMoving = setInterval(() => {
     const y = Math.floor(bulletPosition / width);
     if (y === 0) {
       cells[bulletPosition].classList.remove('bullet');
       clearInterval(playerBulletMoving);
     } else if (cells[bulletPosition].classList.contains('addInvader')) {
       cells[bulletPosition].classList.remove('bullet', 'addInvader');
       cells[bulletPosition].classList.add('addInvader-Explosion');
       audioInvaderKilled.play();
       setTimeout(() => {
         cells[bulletPosition].classList.remove('addInvader-Explosion');
         audioInvaderKilled.play();
       }, 300);
       const invaderIndex = invaderPositionIndex.indexOf(bulletPosition);
       invaderPositionIndex.splice(invaderIndex, 1);
       score = score + 100;
       currentScore.textContent = score;
       clearInterval(playerBulletMoving);
     } else if (cells[bulletPosition].classList.contains('addShield')) {
       cells[bulletPosition].classList.remove('bullet', 'addShield');
       clearInterval(playerBulletMoving);
     } else {
       cells[bulletPosition].classList.remove('bullet');
       bulletPosition -= 20;
       cells[bulletPosition].classList.add('bullet');
     }
   }, 100);
 }
}
```


![Start page](https://i.postimg.cc/jjGhZHvt/Screenshot-2023-02-23-at-12-58-54.png)


---


## Wins & Challenges


### Wins


- This being the first project built on my own with JavaScript it was a very rewarding challenge that I learnt a lot from.
- One great outcome from this project was the use of EventListener's to manipulate the DOM.
- One of the funniest parts was the sound effects. When I managed to implement the html audio it really made the project feel better.


### Challenges


- The logic behind the movements of the invader's was challenging and I still have a bug that I couldn't resolve in time, once the end lines get hit they wrap through the walls.
- Responsiveness, I didn't check the responsiveness of the game till late and noticed that the grid did not adjust to the background. As the grid is within a specific black spot on the background, this gets smaller as the screen size changes but the grid does not.


## Future Features


- My biggest annoyance on this project is responsiveness. I created the game on my large screen at an off aspect ratio and didn't consider this till the last day but by then it was too late and I couldn't spend the time to make it more responsive. I would like to revisit this project and change this to have a game that looks nicer.
- Another bug I found later on is if you take out the left or right column of invaders the bug would happen if all the invaders would go through the walls.
- Implement the game over/restart screen.
- Add different levels/waves of invaders.





