
var canvasHeight 
var canvasWidth 
let nbDummy = 100
let citys = [];
let dummys = [];
const G = 0.5; // Force de la gravité
let data;
let dataLength;
let limitePop = 5000

function preload() {
  let url = 'https://geo.api.gouv.fr/communes?codeDepartement=36&fields=nom,population&format=json';
  data = loadJSON(url);
  dataLength = Object.keys(data).length
}


function setup() {
  canvasWidth = int(min(windowWidth * 0.8,windowHeight*0.8))
  // canvasWidth = canvasWidth - canvasWidth%w
  canvasHeight = canvasWidth
  cnv = createCanvas(canvasWidth, canvasHeight);
  centerCanvas()
  
  for (let index = 0; index < nbDummy; index++) {
    generateDummy()
  }

  noStroke()
}

function centerCanvas() {
    var x = (windowWidth - canvasWidth) *0.5;
    var y = (windowHeight - canvasHeight) *0.5;
    cnv.position(x, y);
}


function draw() {
  background("gray")
  for(let city of citys){
    for(let dummy of dummys){
      city.attirer(dummy)
      if(city.collide(dummy)) dummy.setInactive()
    }
    city.draw()
  }

  for(let dummy of dummys){
    dummy.update()
    dummy.draw()
  }

  removeInactive()
  regenerateDummy()
}

function removeInactive(){
  dummys = dummys.filter(dum => dum.active ==true)
}

function regenerateDummy(){
  if(dummys.length < nbDummy/4){
    for(let i =dummys.length; i<nbDummy; i++){
      generateDummy()
    } 
  }
}


function generateDummy(){
  let x = floor(random(0,canvasWidth))
  let y = floor(random(0,canvasHeight))
  dummys.push(new Dumby(x,y))
}

function pickCity(){
  let checked = false;
  var newCity = null
  while (checked == false ){
    let i = floor(random(0,Object.keys(data).length))
    newCity = data[i];
    // console.log(newCity);
    
    if(newCity!= undefined && newCity.population && newCity.population > limitePop){
      checked =true
    }
  }
  // console.log(newCity)
  return newCity;
}

function mousePressed(){
  let newCity = pickCity()
  citys.push(new City(mouseX,mouseY,newCity.nom,newCity.population))
}

class Dumby {

  constructor(x,y){
    this.dir = p5.Vector.random2D().mult(0.5)
    this.pos = createVector(x,y)
    this.acc = createVector(0, 0);
    this.active =true
  }

  update(){

    this.dir.add(this.acc); 
    this.dir.limit(5);     
    this.pos.add(this.dir); 
    this.acc.mult(0);
 
    if (this.pos.x > width) {
      this.pos.x = 0;
    } else if (this.pos.x < 0) {
      this.pos.x = width;
    }

    // Idem pour le haut et le bas
    if (this.pos.y > height) {
      this.pos.y = 0;
    } else if (this.pos.y < 0) {
      this.pos.y = height;
    }
  }

  isHovered() {
    return false
  }

  setInactive(){
    this.active =false
  }


  draw() {
    fill("white");
    rect(this.pos.x, this.pos.y, 5, 10);
    
  }



}

class City {
  constructor(x,y,name,pop){
    this.x =x
    this.y = y
    this.name = name
    this.pos = createVector(x,y)
    this.pop = pop
    this.mass = sqrt(pop) * 0.25; 
    this.r = sqrt(pop) * 0.2; 
    this.rayonAttraction = this.mass *1.5
    this.nbAttracted = 0
  }

  isHovered() {
      return mouseX > this.pos.x - this.r&& 
            mouseX < this.pos.x + this.r && 
            mouseY > this.pos.y - this.r&& 
            mouseY < this.pos.y + this.r;
    }


  collide(dummy){
    if(dummy.pos.x<(this.pos.x+this.r) &&dummy.pos.x>(this.pos.x-this.r) && dummy.pos.y<(this.pos.y+this.r) &&dummy.pos.y>(this.pos.y-this.r)){
      this.nbAttracted++
      return true
    }
    return false
  }

  attirer(autre) {
    let distBetween = dist(this.pos.x,this.pos.y,autre.pos.x,autre.pos.y)
    if(distBetween<=this.rayonAttraction){
      let force = p5.Vector.sub(this.pos, autre.pos);
      let distanceSq = constrain(force.magSq(), 100, 1000); // Évite les forces infinies (collisions)
      let forceMag = (G * this.mass * 1) / distanceSq;
      force.setMag(forceMag);
      autre.acc.add(p5.Vector.div(force, 1));
    }
  }

  draw(){
    
    if(this.isHovered()){
      noStroke();
      fill(200, 100, 100, 50); 
      ellipseMode(CENTER);
      circle(this.pos.x, this.pos.y, this.rayonAttraction *2);
  
      fill(200, 100, 100);
      rectMode(CENTER); 
      rect(this.pos.x, this.pos.y, this.r, this.r);
      fill(0);
      textAlign(CENTER);
      text(this.name + "("+this.pop+")", this.pos.x, this.pos.y);
      text(this.nbAttracted, this.pos.x, this.pos.y + 20);
      rectMode(CORNER); 
    }
    else {
      fill(200, 100, 100);
      rectMode(CENTER); 
      rect(this.pos.x, this.pos.y, this.r, this.r);
      rectMode(CORNER); 
    }
  }
}



