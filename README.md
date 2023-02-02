## ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

## General Assembly, Software Engineering Immersive Project-1

## Project #1: The Game

---

## Overview

Let's start out with something fun - **a game!**

Everyone will get a chance to **be creative**, and work through some really **tough programming challenges** – since you've already gotten your feet wet with Javascript, it's up to you to come up with a fun and interesting game to build.

**You will be working individually for this project**, but we'll be guiding you along the process and helping as you go. Show us what you've got!

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

## Classic Space Invaders

Space Invaders is a classic arcade game from the 80s. The player aims to shoot an invading alien armada, before it reaches the planet's surface using a mounted gun turret.

The player can only move left or right. The aliens also move from left to right, and also down each time the reach the side of the screen. The aliens also periodically drop bombs towards the player.

Once the player has destroyed a wave of aliens, the game starts again. The aim is to achieve the highest score possible before either being destroyed by the aliens, or allowing them to reach the planet's surface.

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

The website is deployed on Heroku, you can see it here: ...

---

![Space invaders game play](https://media.giphy.com/media/25p2OUAhuKIENRAK3x/giphy.gif)

<p>The game is played with the left and right arrows to move the player along the bottom of the game screen. The player is able to shoot lasers towards the alien invaders by pressing the spacebar.</P>

---

## Planning Process

<p>The game is made up on one page with 3 sections</p>
<ul>
<li>Start game - click here to play</li>
<li>Game</li>
<li>Game over - play again</li>
</ul>

<p>For my theme Idea I wanted to keep ot retro and go for a copy of the classic game. Wanted t make the page seem like the screen of the 40th anniversary edition of the space invaders arcade 1up .
</p>

![1up space invaders arcade](https://i.postimg.cc/4x5s4Y5w/6333608-sd.jpg)

<p>I then used Figma to do a mockup and a mood board for design ideas as well as a little Pseudocode </P>

![Figma](https://i.postimg.cc/Hx0fzKhz/Screenshot-2023-01-02-at-22-45-21.png)

![Mockup](https://i.postimg.cc/ZRJfbqwP/Screenshot-2023-01-01-at-23-32-20.png)

---

## Build Process

### Grid

![Grid](https://i.postimg.cc/Jn18BZrG/Screenshot-2023-01-02-at-22-52-31.png)

<p>The grid is where the game takes place.</p>
<ul>
<li>The grid is 20 x 20</li>
</br>
</ul>

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

<p>The other key parts</p>

<ul>
<li>Laser base placement and movement. Laser base shooting lasers that collide with the shields, invaders and there bombs.</li>

```js
let laserBasePosition = 370;

function moveLaserBase(e) {
  // console.log(e.key);
  const x = laserBasePosition % width;
  const y = Math.floor(laserBasePosition / width);
  // console.log({ x, y });
  if (e.key === 'ArrowRight' && x < width - 1) {
    moveRight();
  } else if (e.key === 'ArrowLeft' && x > 0) {
    moveLeft();
  }
}

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

<li>Invaders placement and movements. Invaders dropping bombs and them colliding with the shields and laser base.</li>
<p>Created a _variables.scss file with a simple calculation and heights for the navbar, body & footer.</p>

```js
 let invaderPositionIndex = [
    44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 64, 65, 66, 67, 68, 69, 70,
    71, 72, 73, 74, 75, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 104,
    105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 124, 125, 126, 127,
    128, 129, 130, 131, 132, 133, 134, 135,
 ],

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

    function shootBombs() {
    let bombs =
      invaderPositionIndex[
        Math.floor(Math.random() * invaderPositionIndex.length)
      ];
    let bombPosition = (bombs += width);
    const bombMovement = window.setInterval(() => {
      const y = Math.floor(bombPosition / width);
      if (cells[bombPosition].classList.contains("laserBase")) {
        cells[bombPosition].classList.remove("bomb");
        cells[bombPosition].classList.add("addBase-Explosion");
        audioBaseExplosion.play();
        setTimeout(() => {
          cells[bombPosition].classList.remove("addBase-Explosion");
        }, 300);
        clearInterval(bombMovement);
        lives--;
        livesLeftDisplay.textContent = lives;
        console.log("hit");
      } else if (y === 19) {
        cells[bombPosition].classList.remove("bomb");
        clearInterval(bombMovement);
      } else if (cells[bombPosition].classList.contains("addShield")) {
        cells[bombPosition].classList.remove("addShield");
        cells[bombPosition].classList.remove("bomb");
        cells[bombPosition].classList.add("addBase-Explosion");
        setTimeout(() => {
          cells[bombPosition].classList.remove("addBase-Explosion");
        }, 300);
        clearInterval(bombMovement);
      } else {
        cells[bombPosition].classList.remove("bomb");
        bombPosition = bombPosition += width;
        cells[bombPosition].classList.add("bomb");
      }
    }, 300);
  }

```

<li>With the game having 3 sections the start game, playing the game and the ending thee had to be shown and hidden at different times.</li>
<p>This was done with hidden classes in CSS that gets called at the times needed with JavaScript.</p>
</ul>

```js
intro.classList.add('hidden');
ending.classList.add('hidden');

  function startGame() {
    moveInvader();
    endGameCheck();
    addShield();
    shootBombs();
    setInterval(shootBombs, 1300);
    intro.classList.add("hidden");
    ending.classList.add("hidden");
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
```

---

## Wins & Challenges

### Wins

- This being the first project built on my own with JavaScript it was a very rewarding challenge that I learnt a lot from.
- One great outcome from this project was the use of EventListener's to manipulate the DOM.

### Challenges

- The logic behind the movements of the invader's was challenging and I still have a bug that I couldn't resolve in time, once the end lines get hit they wrap threw the walls.
- Responsiveness, I didn't check the responsiveness of the game till late and noticed that the grid did not adjust to the background. As the grid is within a specific black spot on the background, this gets smaller as the screen size changes but the grid does not.

## Future Features

- Make it more responsive.
- Fix the bug of going through the walls.
- Implement the game over/restart screen.
- Add different levels/waves of invaders.
