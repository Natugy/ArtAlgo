let cols, rows;
var canvasHeight 
var canvasWidth 
let w = 50; // Cell size
let grid = [];
let stack = [];
let current;
let generating = true;


function setup() {
  canvasWidth = int(min(windowWidth * 0.8,windowHeight*0.8))
  canvasWidth = canvasWidth - canvasWidth%w
  canvasHeight = canvasWidth
  cnv = createCanvas(canvasWidth, canvasHeight);
  centerCanvas()
  cols = floor(width / w);
  rows = floor(height / w);

  // Initialize Grid
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      grid.push(new Cell(i, j));
    }
  }
  current = grid[0];

}

function draw() {
  background('pink');
  drawText()
  drawWall()
  if (mouseIsPressed){
    let clickI = int(mouseX/w)
    let clickJ = int(mouseY/w)
    cell =searchCell(clickI,clickJ)
    cell.visited = true
  }
  
}

// Centrer le canvas
function centerCanvas() {
    var x = (windowWidth - canvasWidth) *0.5;
    var y = (windowHeight - canvasHeight) *0.5;
    cnv.position(x, y);
}

function drawText(){
  textSize(36)
  fill(255)
  stroke(0);
  strokeWeight(4);
  text('Veux-tu être ma Valentine ? ❤️',canvasWidth*0.05,canvasHeight/2)
}

function drawWall(){
  for (let cell of grid) {
      cell.show();
  }
}

function searchCell(i,j){
  for (let cell of grid){
    if(cell.i ==i & cell.j == j){
      return cell
    }
  }
}




class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true]; // T, R, B, L
    this.visited = false;
  }

  show() {
    if(this.visited==false){
      let x = this.i * w;
      let y = this.j * w;
      if(y%2){
        y =y -w%2
      }
      fill(0)
      strokeWeight(1);
      stroke(255)
      rect(x,y,w,w)
    }
  }

  
}