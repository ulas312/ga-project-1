function init() {
  // <====== Dom Elements =======>
  const start = document.querySelector("#start");
  const grid = document.querySelector(".grid");
  const livesLeftDisplay = document.querySelector("#lives-left");
  // const currentScore = document.querySelector("#current-score-display");

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
  let lives = 0;

  let invaderBombInterval = null;
  let baseLaserShoot = null;
  let timer = null;

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
    // start.disabled = true;
    moveInvader();
    lives = 3;
    // livesLeftDisplay();
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
        removeInvader();
        invaderPositionIndex = invaderPositionIndex.map((i) => i + 1);
        addInvader();
      } else {
        !goingRight;
        removeInvader();
        invaderPositionIndex = invaderPositionIndex.map((i) => i - 1);
        addInvader();
      }
    }, 900);
  }

  function checkIfHitBottom() {
    invaderPositionIndex.forEach((invader) => {
      if (cells[invader].classList.contains("LaserBase")) {
        console.log("Game over");
        gameOver();
      }
    });
  }

  function gameOver() {
    clearInterval(timer);
    invaderPositionIndex;
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
    cells[laserBasePosition].classList.add("LaserBase");
  }

  function removeLaserBase(laserBasePosition) {
    cells[laserBasePosition].classList.remove("LaserBase");
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
    console.log(e.key);
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
      let bulletPosition = laserBasePosition;
      const playerBulletMoving = setInterval(() => {
        const y = Math.floor(bulletPosition / width);
        if (y === 0) {
          cells[bulletPosition].classList.remove("bullet");
          clearInterval(playerBulletMoving);
        } else if (cells[bulletPosition].classList.contains("addInvader")) {
          cells[bulletPosition].classList.remove("bullet", "addInvader")
          const invaderIndex = invaderPositionIndex.indexOf(bulletPosition)
          invaderPositionIndex.splice(invaderIndex, 1)
          clearInterval(playerBulletMoving)
        } else if (cells[bulletPosition].classList.contains("addShield")) {
          cells[bulletPosition].classList.remove("bullet", "addShield")
          clearInterval(playerBulletMoving)
        } else {
          cells[bulletPosition].classList.remove("bullet"); 
          bulletPosition -= 20;
          cells[bulletPosition].classList.add("bullet");
        }
      }, 100);
    }
  }

  // <====== Laser Base Functions =======>

  // <====== Lives Left Functions =======>
  // function livesLeftDisplay() {
  //   elements.livesLeftDisplay.innerHTML = "";
  //   for (let i = 0; i < lives; i++) {
  //     const invaderLives = document.createElement("img");
  //     invaderLives.src = "../images/invader.png";
  //     invaderLives.classList.add("invaderLives");
  //     elements.livesLeftDisplay.appendChild(invaderLives);
  //   }
  // }

  // <====== Lives Left Functions =======>

  window.addEventListener("keydown", moveLaserBase);
  start.addEventListener("click", startGame);
  window.addEventListener("keyup", shootBullet);

  startGame();
  createGrid();
  addShield();
}

document.addEventListener("DOMContentLoaded", init);
