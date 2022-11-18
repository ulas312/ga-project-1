function init() {
  // <====== Dom Elements =======>
  const start = document.querySelector("#start");
  const grid = document.querySelector("#grid");
  const result = document.querySelector("#result");
  const livesLeftDisplay = document.querySelector("#lives-left");
  const finalScore = document.querySelector("#final-score");
  const currentScore = document.querySelector("#current-score-display");
  const audioElement = document.querySelector("#audio-theme-song");
  const playButton = document.querySelector("#play");
  const intro = document.querySelector("#instructions-box");
  const ending = document.querySelector("#game-over-box");
  const audioLaser = document.querySelector("#audio-laser");
  const audioInvaderMovement = document.querySelector(
    "#audio-invader-movement"
  );
  const audioInvaderKilled = document.querySelector("#audio-invader-killed");
  const audioBaseExplosion = document.querySelector("#audio-base-explosion");
  audioInvaderKilled.src = "../sounds/invaderkilled.wav";
  audioLaser.src = "../sounds/shoot.wav";
  audioBaseExplosion.src = "../sounds/explosion.wav";
  audioInvaderMovement.src = "../sounds/fastinvader3.wav";

  // <====== Game Variables =======>
  let invaderPositionIndex = [
    44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 64, 65, 66, 67, 68, 69, 70,
    71, 72, 73, 74, 75, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 104,
    105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 124, 125, 126, 127,
    128, 129, 130, 131, 132, 133, 134, 135,
  ];
  let invaderArray = invaderPositionIndex.slice();
  let direction = 1;
  let gameStarted = false;
  let laserBasePosition = 370;
  let goingRight = true;
  const shieldPositionIndex = [
    322, 303, 304, 325, 328, 309, 310, 331, 334, 315, 316, 337,
  ];
  const width = 20;
  const gridCellCount = width * width;
  const cells = [];
  let lives = 3;
  let score = 0;
  let invaderBombInterval = null;
  let baseLaserShoot = null;
  let endGameChecker = null;
  let timer = null;
  // let muted = true;

  // <====== Grid Functions =======>
  function createGrid() {
    for (let i = 0; i < gridCellCount; i++) {
      const cell = document.createElement("div");
      if (i < width) cell.classList.add("ceiling");
      if (i > width ** 2 - width - 1) cell.classList.add("floor");
      cell.setAttribute("data-index", i);
      cells.push(cell);
      grid.appendChild(cell);
    }
    addLaserBase(laserBasePosition);
  }
  // <====== Grid Functions =======>

  // <====== Game Start Functions =======>
  function startGame() {
    moveInvader();
    endGameCheck();
    addShield();
    shootBombs();
    setInterval(shootBombs, 1300);
    intro.classList.add("hidden");
    ending.classList.add("hidden");
    lives = 3;

    // move spaceship
    // drop bombs
    // shoot
    // lives 3
    // hide instuctions
    // start.classList.add("hidden");
    // grid.classList.remove("hidden");
    // grid.classList.add("grid");
  }
  // <====== Game Start Functions =======>

  // <====== Invader Functions =======>
  function addInvader() {
    invaderPositionIndex.forEach((invader) => {
      cells[invader].classList.add("addInvader");
    });
  }

  function removeInvader() {
    invaderPositionIndex.forEach((invader) => {
      cells[invader].classList.remove("addInvader");
    });
  }

  function checkIfHasHitWall() {
    const hasHitWall =
      invaderPositionIndex[0] % width === 0 ||
      invaderPositionIndex[invaderPositionIndex.length - 1] % width ===
        width - 1;
    if (hasHitWall) {
      removeInvader();
      invaderPositionIndex = invaderPositionIndex.map((i) => i + width);
      addInvader();
      goingRight = !goingRight;
    }
  }

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

  function checkIfHitBottom() {
    invaderPositionIndex.forEach((invader) => {
      if (cells[invader].classList.contains("laserBase")) {
        // console.log("Game over");
        gameOver(`Game Over! Your score was ${score}`);
      }
    });
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

  // <====== Invader Functions =======>

  // <====== Shield Functions =======>
  function addShield() {
    for (let i = 0; i < shieldPositionIndex.length; i++) {
      cells[shieldPositionIndex[i]].classList.add("addShield");
    }
  }
  // <====== Shield Functions =======>

  // <====== Laser Base Functions =======>
  function addLaserBase(laserBasePosition) {
    cells[laserBasePosition].classList.add("laserBase");
  }

  function removeLaserBase(laserBasePosition) {
    cells[laserBasePosition].classList.remove("laserBase");
  }

  function moveRight() {
    removeLaserBase(laserBasePosition);
    laserBasePosition++;
    addLaserBase(laserBasePosition);
  }

  function moveLeft() {
    removeLaserBase(laserBasePosition);
    laserBasePosition--;
    addLaserBase(laserBasePosition);
  }

  function moveLaserBase(e) {
    // console.log(e.key);
    const x = laserBasePosition % width;
    const y = Math.floor(laserBasePosition / width);
    // console.log({ x, y });
    if (e.key === "ArrowRight" && x < width - 1) {
      moveRight();
    } else if (e.key === "ArrowLeft" && x > 0) {
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
          cells[bulletPosition].classList.remove("bullet");
          clearInterval(playerBulletMoving);
        } else if (cells[bulletPosition].classList.contains("addInvader")) {
          cells[bulletPosition].classList.remove("bullet", "addInvader");
          cells[bulletPosition].classList.add("addInvader-Explosion");
          audioInvaderKilled.play();
          setTimeout(() => {
            cells[bulletPosition].classList.remove("addInvader-Explosion");
            audioInvaderKilled.play();
          }, 300);
          const invaderIndex = invaderPositionIndex.indexOf(bulletPosition);
          invaderPositionIndex.splice(invaderIndex, 1);
          score = score + 100;
          currentScore.textContent = score;
          clearInterval(playerBulletMoving);
        } else if (cells[bulletPosition].classList.contains("addShield")) {
          cells[bulletPosition].classList.remove("bullet", "addShield");
          clearInterval(playerBulletMoving);
        } else {
          cells[bulletPosition].classList.remove("bullet");
          bulletPosition -= 20;
          cells[bulletPosition].classList.add("bullet");
        }
      }, 100);
    }
  }

  // <====== Laser Base Functions =======>

  // <====== End Game Functions =======>
  function endGameCheck() {
    endGameChecker = window.setInterval(() => {
      let y = null;
      invaderArray.forEach((invaderArray) => {
        y = Math.floor(invaderArray / width);
      });
      if (lives === 0) {
        gameOver(`Game Over! Your score was ${score}`);
        return;
      } else if (y === 19) {
        gameOver(`Game Over! Your score was ${score}`);
      }
      return;
    }, 100);
  }

  function gameOver(gameOverStatement) {
    result.classList.remove("hidden");
    result.innerHTML = gameOverStatement;
    removeInvader();
    removeLaserBase();
    clearInterval(timer);
    clearInterval(shootBombs);
    clearInterval(invaderBombInterval);
    clearInterval(baseLaserShoot);
    clearInterval(score);
    clearInterval(endGameChecker);
    grid.classList.remove("grid");
    grid.classList.add("hidden");
    ending.classList.remove("hidden");

    // invaderPositionIndex;
  }

  // <====== End Game Functions =======>

  // <====== Audio Functions =======>
  function playIntroAudio() {
    audioElement.src = "./sounds/spaceinvaders1.mpeg";
    audioElement.play();
  }
  playButton.addEventListener("click", playIntroAudio);

  // function playSoundEffects() {
  //   muted = !muted;
  //   if (muted) {
  //     audioLaser.muted = true;
  //   } else if (!muted) {
  //     audioLaser.muted = false;
  //   }
  // }

  // <====== Audio Functions =======>

  window.addEventListener("keydown", moveLaserBase);
  start.addEventListener("click", startGame);
  window.addEventListener("keyup", shootBullet);

  createGrid();
  // addShield();
}

document.addEventListener("DOMContentLoaded", init);

// Bugs
// if shoot the first row of invaders they wrap through the walls
// invaders touch side and go down and across one
// bullets never stop dropping
// basses need to reset on start
