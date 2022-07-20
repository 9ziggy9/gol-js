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
  console.log(`counting neighbors of ${x},${y}`);
  return DIRS.reduce((count, d) => count + (isAlive(x+d[0],y+d[1]) ? 1 : 0), 0);
}

function fnDebug() {
  console.log(countNeighbors(8,6));
}

function initButtons() {
  const start = document.getElementById("start");
  const clear = document.getElementById("clear");
  const debug = document.getElementById("debug");
  start.addEventListener("click", () => start.classList.contains("off")
			 ? start.setAttribute("class", "on")
			 : start.setAttribute("class", "off"));
  clear.addEventListener("click", () => clearGrid());
  debug.addEventListener("click", () => fnDebug());
}

function clearGrid() {
  for (let y = 0; y < 12; y++) {
    for (let x = 0; x < 16; x++) {
      const current = document.getElementById(`${x},${y}`);
      current.setAttribute("class", "dead");
    }
  }
}

function buildGrid() {
  const grid = document.getElementById("game");
  for (let y = 0; y < 12; y++) {
    for (let x = 0; x < 16; x++) {
      const cell = document.createElement("div");
      // cell.setAttribute("class", "cell");
      // cell.setAttribute("style", `background-color: ${randColor()}`);
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
