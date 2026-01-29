var pieces = []
var rects = []
var circles = []
var colors = []
let stepGrid = 5
const canvasHeight = 600
const canvasWidth =600

function setup() {
  generateColors()
  createCanvas(canvasWidth, canvasHeight);

  // frameRate(1)
  generateGrid()
  
}
function draw() {
  background(color(10, 20, 40));
  drawCanvas(pieces)
  if (mouseIsPressed == true){
    moveList(rects)
    moveList(circles)
  }

  
}

function createRect(x = random(30, 280), y = random(30, 380), width = random(20, 180), height = random(20, 80), alpha = 255) {
  let rect = {
    type: "rect",
    x: x,
    y: y,
    width: width,
    height: height,
    color: pickColor(alpha),
    speed : int(random(-5,5)),
    direction : int(random(0,2))
  }

  return rect
}


function createcircle(x, y, size = random(20, 80)) {
  // Define circle object.
  let circle = {
    type : "circle",
    x : x,
    y : y,
    size: size,
    lifespan: random(255,300),
    color: pickColor(),
    centerX: canvasWidth / 2,
    centerY: canvasHeight / 2,
    
    speed: random(0.01, 0.05)
  };

  let dx = circle.x - circle.centerX;
  let dy = circle.x - circle.centerY;
  circle.radius = dist(circle.centerX, circle.centerY, x, y);
  circle.angle = atan2(dy, dx);
  return circle;
}

function drawcircle(circle) {
  fill(circle.color);
  ellipse(circle.x, circle.y, circle.size);

}

function drawRect(rectangle){
  // noStroke()
  fill(rectangle.color)
  rect(rectangle.x,rectangle.y,rectangle.width,rectangle.height)
}

function drawForm(form) {
  switch (form.type) {
    case "circle":
      drawcircle(form)
      break
    case "rect":
      drawRect(form)
      break
  }
}

function generateGrid(){
  let pixStep = canvasWidth/stepGrid
  for(i =0; i<canvasWidth; i+=pixStep){
      for(j =0; j<canvasHeight; j+=pixStep){
          createPattern(i,j,pixStep)
      }   
  }
}

function drawCanvas(){
  // moveList(rects)
  // moveList(circles)
  drawList(rects)
  drawList(circles)
}

function drawList(piecesList){
  for (let el of piecesList) {
    drawForm(el)
  }
}

function moveList(piecesList){
  for (let el of piecesList) {
    if (el.type == "rect"){
      rectMove(el)
    }
    if (el.type == "circle"){
      circleMove(el)
    }
  }
}

function rectMove(rect){
  if(rect.direction ==0){
    rect.x += rect.speed
    rect.x = rect.x % canvasWidth
  }
  else {
    rect.y += rect.speed
    rect.y = rect.y % canvasHeight
  }
}

function circleMove(circle){
  circle.angle += circle.speed;
  circle.x = circle.centerX + circle.radius * cos(circle.angle);
  circle.y = circle.centerY + circle.radius * sin(circle.angle);

}

function createPattern(x,y,size){
  let rand = int(random(1,4))
  switch (rand) {
    case 1:
      pattern1(x,y,size)
      break
    case 2:
      pattern2(x,y,size)
      break
    case 3:
      pattern3(x,y,size)
      break
  }
  // pieces.push(createRect(x,y,size,size))
}

function pattern1(x,y,size){
  rects.push(createRect(x,y,size,size))
  rects.push(createRect(x,y,size,size))
  rects.push(createRect(x,y,size,size))
  circles.push(createcircle(x+size/2,y+size/2,size/2))
}

function pattern2(x,y,size){
  rects.push(createRect(x,y,size,size))
  rects.push(createRect(x,y,size,size))
  rects.push(createRect(x,y,size,size))
  rects.push(createRect(x,y,size,size))
}

function pattern3(x,y,size){
  rects.push(createRect(x,y,size,size/2))
  rects.push(createRect(x,y,size,size/2))
  rects.push(createRect(x,y+size/2,size,size/2))
  rects.push(createRect(x,y+size/2,size,size/2))
}

function pattern4(x,y,size){
  rects.push
}

function generateColors(){
  // colors.push(color(10, 20, 40))
  colors.push(color(255, 0, 110))
  colors.push(color(131, 56, 236))
  colors.push(color(255, 190, 11))
  colors.push(color(random(255),random(255),random(255)))
}

function pickColor(alpha = 250){
  let rand = int(random(colors.length));
  let c = colors[rand];

  return color(red(c), green(c), blue(c), alpha);
}