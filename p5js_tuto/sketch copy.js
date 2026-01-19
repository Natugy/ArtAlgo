function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(135, 206, 235);

  fill("yellow");
  stroke("orange");
  strokeWeight(20);
  circle(550,50,100);

  fill("green")
  stroke("black")
  strokeWeight(1)
  rect(0,200,600,200)

  textSize(75)
  text("🌸", 100, 250);
  text("🐞", mouseX, mouseY);
}
