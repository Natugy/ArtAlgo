
var canvasHeight 
var canvasWidth 
let astres = [];
const G = 0.5; // Force de la gravité
let data;
let dataLength;

function preload() {
  // On charge les villes de la Gironde (Bordeaux, etc.)
  // Tu peux changer '33' par n'importe quel numéro de département
  let url = 'https://geo.api.gouv.fr/communes?codeDepartement=33&fields=nom,population&format=json';
  data = loadJSON(url);
  dataLength = Object.keys(data).length
}

function setup() {
  canvasWidth = int(min(windowWidth * 0.8,windowHeight*0.8))
  // canvasWidth = canvasWidth - canvasWidth%w
  canvasHeight = canvasWidth
  cnv = createCanvas(canvasWidth, canvasHeight);
  centerCanvas()
  

  // for (let i = 0; i < Object.keys(data).length; i++) {
  //   let v = data[i];
  //   if (v.population && v.population > 5000) { // On filtre les trop petites villes pour la fluidité
  //     let x = random(width);
  //     let y = random(height);
  //     astres.push(new Astre(x, y, v.population, v.nom));
  //   }
  // }
  console.log(data);
  let i = random(0,Object.keys(data).length)
  console.log(data[i]);
  
  // frameRate(15) 
}

function centerCanvas() {
    var x = (windowWidth - canvasWidth) *0.5;
    var y = (windowHeight - canvasHeight) *0.5;
    cnv.position(x, y);
}
function draw() {
  background(10, 15, 30, 50); // Traînée légère pour l'effet spatial

  for (let a of astres) {
    for (let autre of astres) {
      if (a !== autre) {
        a.attirer(autre);
      }
    }
    a.update();
    a.show();
  } 

}

function mousePressed(){
  addAstra(mouseX,mouseY);
}

function addAstra(x,y){
  let v = pickCity();
  astres.push(new Astre(x, y, v.population, v.nom));

}

function pickCity(){
  let checked = false;
  var newCity = null
  while (checked == false ){
    let i = floor(random(0,Object.keys(data).length))
    newCity = data[i];
    // console.log(newCity);
    
    if(newCity!= undefined && newCity.population && newCity.population > 5000){
      checked =true
    }
  }
  // console.log(newCity)
  return newCity;
}


class Astre {
  constructor(x, y, pop, nom) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(0.5); // Vitesse initiale aléatoire
    this.acc = createVector(0, 0);
    this.nom = nom;
    this.pop = pop;
    
    // On utilise la racine carrée pour que la taille reste esthétique
    this.mass = sqrt(pop) * 0.5; 
    this.r = sqrt(pop) * 0.2; 
  }

  attirer(autre) {
    let force = p5.Vector.sub(this.pos, autre.pos);
    let distanceSq = constrain(force.magSq(), 100, 1000); // Évite les forces infinies (collisions)
    let forceMag = (G * this.mass * autre.mass) / distanceSq;
    force.setMag(forceMag);
    autre.acc.add(p5.Vector.div(force, autre.mass));
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0); // Reset l'accélération
    
    // Rebond sur les bords
    if (this.pos.x < 0 || this.pos.x > width) this.vel.x *= -1;
    if (this.pos.y < 0 || this.pos.y > height) this.vel.y *= -1;
  }

  show() {
    noStroke();
    // Couleur basée sur la taille (plus c'est gros, plus c'est brillant)
    fill(150, 200, 255, 200);
    ellipse(this.pos.x, this.pos.y, this.r);
    
    // Affiche le nom des grandes villes
    if (this.pop > 20000) {
      fill(255);
      textAlign(CENTER);
      text(this.nom, this.pos.x, this.pos.y + this.r + 10);
    }
  }
}
