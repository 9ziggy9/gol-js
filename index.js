function initialize() {
  buildGrid();
  initButtons();
}

const randColor = () => "#" + [...Array(6)]
      .map(n => Math.floor(Math.random() * 16).toString(16))
      .join("");

function initButtons() {
  const start = document.getElementById("start");
  const clear = document.getElementById("clear");
  start.addEventListener("click", () => start.classList.contains("off")
			 ? start.setAttribute("class", "on")
			 : start.setAttribute("class", "off"));
  clear.addEventListener("click", () => clearGrid());
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
