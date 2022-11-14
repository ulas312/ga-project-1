function init() {
  const start = document.querySelector("#start");
  const grid = document.querySelector(".grid");
  // const currentScore = document.querySelector("#current-score-display");
  let invaderPositionIndex = [
    64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 84, 85, 86, 87, 88, 89, 90,
    91, 92, 93, 94, 95, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114,
    115, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 144, 145,
    146, 147, 148, 149, 150, 151, 152, 153, 154, 155,
  ];
  let direction = 1;
  let gamePlaying = false;
  let laserBasePosition = 370;
  let goingRight = true;
  const shieldPositionIndex = [
    322, 323, 324, 325, 328, 329, 330, 331, 334, 335, 336, 337,
  ];

  const width = 20;
  const gridCellCount = width * width;
  const cells = [];

  // <====== Grid Functions =======>
  function createGrid() {
    for (let i = 0; i < gridCellCount; i++) {
      const cell = document.createElement("div");
      // cell.textContent = i;
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
    setInterval(moveInvader, 1000);
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

  function moveInvader() {
    const leftSide = invaderPositionIndex[0] % width === 0;
    const rightSide =
      invaderPositionIndex[invaderPositionIndex.length - 1] % width ===
      width - 1;
    removeInvader();
    if (goingRight && rightSide) {
      for (let i = 0; i < invaderPositionIndex.length; i++) {
        console.log("going right");
        invaderPositionIndex[i] += width + 1;
        direction = -1;
        goingRight = false;
      }
    }
    if (leftSide && !goingRight) {
      for (let i = 0; i < invaderPositionIndex.length; i++) {
        console.log("going left");
        invaderPositionIndex[i] += width - 1;
        direction = 1;
        goingRight = true;
      }
      for (let i = 0; i < invaderPositionIndex.length; i++) {
        invaderPositionIndex[i] += direction;
      }
    }
    addInvader();
  }
  // <====== Invader Functions =======>

  // <====== Laser Base Functions =======>
  function addLaserBase(laserBasePosition) {
    cells[laserBasePosition].classList.add("LaserBase");
  }

  function removeLaserBase(laserBasePosition) {
    cells[laserBasePosition].classList.remove("LaserBase");
  }
  // <====== Laser Base Functions =======>

  // <====== Shield Functions =======>
  function addShield() {
    for (let i = 0; i < shieldPositionIndex.length; i++) {
      cells[shieldPositionIndex[i]].classList.add("addShield");
    }
  }
  // <====== Shield Functions =======>

  // <====== base movements Functions =======>
  // function baseShoot (e) {
  //   if(e.key === 32 &&)
  // }

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
  // <====== base movements Functions =======>

  // function playGame() {
  //   gamePlaying = true;
  //   setInterval(moveInvader, 100);
  // }

  start.addEventListener("click", startGame);
  window.addEventListener("keydown", moveLaserBase);

  createGrid();
  addInvader();
  addShield();
}

document.addEventListener("DOMContentLoaded", init);
