let cloudOneX = 50;
let lineXone = 0;
let lineYone = 0;

  lineXone = random(0, width);
  lineYone = random(0, height/2);

function setup() {
  createCanvas(400, 400);
}

function draw() {
  cloudOneX = frameCount % width


  background("navy");
  frameRate(15)

  stroke("yellow");
  line(lineXone, lineYone, lineXone + 30, lineYone - 30);
  //white part of moon
  fill(255)
  circle(350,50,100)

  // hide the rest
  fill("navy")
  strokeWeight(0)
  circle(325,50,100)

  // Mountains

  fill("grey")
  stroke("black")
  strokeWeight(1)
  triangle(-50,300,100,100,200,300)

  fill("grey")
  triangle(100,300,300,100,450,300)

  //grass
  fill("green")
  rect(0,300,400,100)

  //cloud
  fill(255);
  ellipse(cloudOneX, 50, 80, 40);  
  ellipse(cloudOneX - 40, 100, 60, 20);
  ellipse(cloudOneX + 20, 150, 40, 10);

  //growing tree
  //trunk
  fill("rgb(118,80,72)");
  rect(40, 270, 15, 50);
  //leaves
  fill("green");
  triangle(25, 270, 45, 240 - frameCount % 290, 70, 270);

  //text
  fill(255)
  text(`mouseX :${mouseX}, mouseY: ${mouseY}`, 20, 20); 

  lineXone = random(0, width);
  lineYone = random(0, height/2);

}
