function init() {
  // const start = document.querySelector(".start")
  const grid = document.querySelector(".grid");
  // const currentScore = document.querySelector("#current-score-display");
  const invaderPositionIndex = [
    64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 84, 85, 86, 87, 88, 89, 90,
    91, 92, 93, 94, 95, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114,
    115, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 144, 145,
    146, 147, 148, 149, 150, 151, 152, 153, 154, 155,
  ];
  let laserBasePosition = 370;

  const width = 20;
  const gridCellCount = width * width;
  const cells = [];

  function createGrid() {
    for (let i = 0; i < gridCellCount; i++) {
      const cell = document.createElement("div");
      cell.setAttribute("data-index", i);
      cells.push(cell);
      grid.appendChild(cell);
    }
    addLaserBase(laserBasePosition);
  }

  function addInvader() {
    invaderPositionIndex.forEach((invader) => {
      cells[invader].classList.add("addInvader");
    });
  }

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

  window.addEventListener("keydown", moveLaserBase);


  createGrid();
  addInvader();
  // LaserBase();
}

document.addEventListener("DOMContentLoaded", init);
