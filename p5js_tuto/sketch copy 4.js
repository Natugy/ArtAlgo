//variable for initial sun position

let sunHeight = 600; //point below horizon

//variables for color change

let redVal = 0;

let greenVal = 0;


function setup() {
  createCanvas(600, 400);
  noStroke()
}


function draw() {

  //fill background with color based on custom variables
  sky()

  //sun
  sun()

  //mountains
  mountains()

  tree(150, 320, 8)
  tree(210, 320, 8)

  if (sunHeight > 130) {
    sunHeight -=2;
  }

  if (sunHeight < 480) {
    redVal += 4;
    greenVal += 1;
  }
}

function sky(){
  background(redVal, greenVal, 0);
}

function sun() {
  fill(255, 135, 5, 60);
  circle(300, sunHeight, 180);
  fill(255, 100, 0, 100);
  circle(300, sunHeight, 140);
}

function mountains(){
  fill(110, 50, 18);
  triangle(200, 400, 520, 253, 800, 400);
  fill(110,95,20);
  triangle(200,400,520,253,350,400);

  fill(150, 75, 0);
  triangle(-100, 400, 150, 200, 400, 400);
  fill(100, 50, 12);
  triangle(-100, 400, 150, 200, 0, 400); 

  fill(150, 100, 0);
  triangle(200, 400, 450, 250, 800, 400);
  fill(120, 80, 50);
  triangle(200, 400, 450, 250, 300, 400);
}

function tree(x,y,size) {
  // Draw a tree.
  fill(80,30,20);
  rect(x-size,y,size*2,size*6);
  fill(20,130,5);
  triangle(x-size*3,y,x,y-size*8,x+size*3,y)
}