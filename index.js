const ROWS = 12;
const COLS = 16;
const DIRS = [
  [1,0], // right
  [-1,0], // left
  [0,1], // down
  [0,-1], // up
  [1,-1], // top right
  [-1,-1], // top left
  [-1,1], // bottom left
  [1,1], // bottom right
];
  
function initialize() {
  buildGrid();
  initButtons();
}

const randColor = () => "#" + [...Array(6)]
      .map(n => Math.floor(Math.random() * 16).toString(16))
      .join("");

const isAlive = (x,y) => document.getElementById(`${x},${y}`)
      .classList.contains("alive");

function countNeighbors(x,y) {
  return DIRS
    .filter(([dx,dy]) => (x + dx >= 0 && x + dx < 16) &&
	                 (y + dy >= 0 && y + dy < 12))
    .reduce((count, [dx,dy]) => count + (isAlive(x+dx,y+dy) ? 1 : 0), 0);
}

function saveState() {
  const snapshot = {};
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      snapshot[`${x},${y}`] = countNeighbors(x,y);
    }
  }
  return snapshot;
}

// TODO: Boundary conditions -- talk about toruses?
function nextState() {
  // PROBLEM; neighbors are being mutated in real time, need snapshot
  // of state before doing stuff
  const neighbors = saveState();
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      let current = document.getElementById(`${x},${y}`);
      if (neighbors[`${x},${y}`] < 2) {
	console.log(neighbors);
	current.setAttribute("class", "dead");
      }
      else if (neighbors[`${x},${y}`] === 3) {
	current.setAttribute("class", "alive");
      }
      else if (neighbors[`${x},${y}`] > 3) {
	current.setAttribute("class", "dead");
      }
    }
  }
}

function initButtons() {
  const start = document.getElementById("start");
  const clear = document.getElementById("clear");
  const next = document.getElementById("next");
  start.addEventListener("click", () => start.classList.contains("off")
			 ? start.setAttribute("class", "on")
			 : start.setAttribute("class", "off"));
  clear.addEventListener("click", () => clearGrid());
  next.addEventListener("click", () => nextState());
}

function clearGrid() {
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const current = document.getElementById(`${x},${y}`);
      current.setAttribute("class", "dead");
    }
  }
}

function buildGrid() {
  const grid = document.getElementById("game");
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const cell = document.createElement("div");
      cell.setAttribute("class", "dead");
      cell.setAttribute("id", `${x},${y}`);
      cell.addEventListener("click",
			    () => cell.classList.contains("dead")
			    ? cell.setAttribute("class", "alive")
			    : cell.setAttribute("class", "dead"));
      grid.appendChild(cell);
    }
  }
}

window.onload = initialize;
