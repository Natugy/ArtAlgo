/**
 * Integrated Maze Generator (DFS) & Solver (A*)
 * Built for p5.js
 */

let cols, rows;
var canvasHeight 
var canvasWidth 
let w = 20; // Cell size
let grid = [];
let stack = [];
let current;
let generating = true;

// Pathfinding variables
let openSet = [];
let closedSet = [];
let startPoint, endPoint;
let path = [];
let currentPath = 0;
let drawPath = [];
let solving = false;
let showingPathEnd = true

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
  background(40);

  // Render the cells
  if(generating | solving |showingPathEnd){
    for (let cell of grid) {
      cell.show();
    }
  }

  if (generating) {
    handleGeneration();
  } else if (solving) {
    handleAStar();
    // drawSearchSets();
  }
  else {
    drawEndLine()
  }

  
}

// Centrer le canvas
function centerCanvas() {
    var x = (windowWidth - canvasWidth) *0.5;
    var y = (windowHeight - canvasHeight) *0.5;
    cnv.position(x, y);
}

/** --- PHASE 1: GENERATION --- **/
function handleGeneration() {
  current.visited = true;
  current.highlight(color(0, 255, 0, 150));
  
  let next = current.checkNeighbors();
  if (next) {
    next.visited = true;
    stack.push(current);
    removeWalls(current, next);
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  } else {
    generating = false;
    startSolving(); // Transition to Phase 2
  }
}

/** --- PHASE 2: PATHFINDING (A*) --- **/
function startSolving() {
  startPoint = grid[0];
  endPoint = grid[grid.length - 1];
  
  openSet.push(startPoint);
  solving = true;
  
  // Initialize A* properties
  for (let cell of grid) {
    cell.f = 0; cell.g = 0; cell.h = 0;
    cell.previous = undefined;
  }
}

function handleAStar() {
  if (openSet.length > 0) {
    let winner = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) winner = i;
    }
    let currentSolver = openSet[winner];

    if (currentSolver === endPoint) {
      console.log("DONE!");
      solving = false;
    }

    openSet.splice(winner, 1);
    closedSet.push(currentSolver);

    let neighbors = currentSolver.getValidNeighbors();
    for (let neighbor of neighbors) {
      if (!closedSet.includes(neighbor)) {
        let tempG = currentSolver.g + 1;
        let newPath = false;

        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }

        if (newPath) {
          neighbor.h = dist(neighbor.i, neighbor.j, endPoint.i, endPoint.j);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = currentSolver;
        }
      }
    }

    // Reconstruct Path
    path = [];
    let temp = currentSolver;
    path.push(temp);
    while (temp.previous) {
      path.push(temp.previous);
      temp = temp.previous;
    }
  }
}

/** --- HELPER FUNCTIONS --- **/
function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) return -1;
  return i + j * cols;
}

function removeWalls(a, b) { // T,R,B,L
  let x = a.i - b.i;
  if (x === 1) { a.walls[3] = false; b.walls[1] = false; }
  else if (x === -1) { a.walls[1] = false; b.walls[3] = false; }
  let y = a.j - b.j;
  if (y === 1) { a.walls[0] = false; b.walls[2] = false; }
  else if (y === -1) { a.walls[2] = false; b.walls[0] = false; }
}

function drawSearchSets() {
  for (let cell of closedSet) cell.highlight(color(255, 0, 0, 50));
  for (let cell of openSet) cell.highlight(color(0, 255, 0, 50));
  
  noFill();
  stroke(45, 197, 244);
  // stroke(255, 215, 0);
  strokeWeight(w / 3);
  beginShape();
  for (let p of path) vertex(p.i * w + w / 2, p.j * w + w / 2);
  endShape();
}

function drawEndLine(){
  noFill();
  strokeWeight(w / 3);
  // stroke(255, 0, 15);
  stroke(255, 215, 0);
  // stroke(45, 197, 244);
  beginShape();
  if (currentPath<path.length) {
    drawPath.push(path[currentPath])
    currentPath++
  }
  else {
    showingPathEnd =false
  }
  for (let p of drawPath) vertex(p.i * w + w / 2, p.j * w + w / 2);
  endShape();
  
}

/** --- CELL CLASS --- **/
class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true]; // T, R, B, L
    this.visited = false;
  }

  show() {
    let x = this.i * w;
    let y = this.j * w;
    stroke(255);
    strokeWeight(1);
    if (this.walls[0]) line(x, y, x + w, y);
    if (this.walls[1]) line(x + w, y, x + w, y + w);
    if (this.walls[2]) line(x + w, y + w, x, y + w);
    if (this.walls[3]) line(x, y + w, x, y);
    if (this.visited && generating) {
      noStroke();
      fill(100, 0, 200, 100);
      rect(x, y, w, w);
    }
  }

  highlight(c) {
    noStroke();
    fill(c);
    rect(this.i * w, this.j * w, w, w);
  }

  checkNeighbors() {
    let neighbors = [];
    let top = grid[index(this.i, this.j - 1)];
    let right = grid[index(this.i + 1, this.j)];
    let bottom = grid[index(this.i, this.j + 1)];
    let left = grid[index(this.i - 1, this.j)];

    if (top && !top.visited) neighbors.push(top);
    if (right && !right.visited) neighbors.push(right);
    if (bottom && !bottom.visited) neighbors.push(bottom);
    if (left && !left.visited) neighbors.push(left);

    return neighbors.length > 0 ? random(neighbors) : undefined;
  }

  getValidNeighbors() {
    let neighbors = [];
    let top = grid[index(this.i, this.j - 1)];
    let right = grid[index(this.i + 1, this.j)];
    let bottom = grid[index(this.i, this.j + 1)];
    let left = grid[index(this.i - 1, this.j)];

    if (top && !this.walls[0]) neighbors.push(top);
    if (right && !this.walls[1]) neighbors.push(right);
    if (bottom && !this.walls[2]) neighbors.push(bottom);
    if (left && !this.walls[3]) neighbors.push(left);
    return neighbors;
  }
}
