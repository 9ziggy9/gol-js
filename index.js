function initialize() {
  console.log("Hello, world");
  buildGrid();
}

const randColor = () => "#" + [...Array(6)]
      .map(n => Math.floor(Math.random() * 16).toString(16))
      .join("");

function buildGrid() {
  const grid = document.getElementById("game");
  for (let y = 0; y < 12; y++) {
    for (let x = 0; x < 16; x++) {
      const cell = document.createElement("div");
      cell.setAttribute("class", "cell");
      cell.setAttribute("style", `background-color: ${randColor()}`);
      grid.appendChild(cell);
    }
  }
}

window.onload = initialize;
