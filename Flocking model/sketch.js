let flock;
let text;
let bg;
let obstacles = [];

function setup() {
  bg = loadImage("assets/landscape.jpg");
  createCanvas(640, 360);
  createP("Click para hacer aparecer obstaculos.");
  flock = new Flock();
  //instantiate the obstacle in the middle of the screen
  //obstacle = new Obstacle(width / 2, height / 2, 100, 100);
  //obstacles = new Obstacle(width / 2, height / 2, 100, 100);
  
  //
  // Añade un conjunto inicial de boids al sistema
  for (let i = 0; i < 40; i++) {
    let b = new Boid(width / 2,height / 2);
    flock.addBoid(b);
  }
}
function preload() {
  obstacleImage = loadImage("assets/tree.png"); // Carga la imagen
}

function draw() {
  
  background(bg);
  stroke(226, 204, 0);
  //obstacle.show();
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].show();
  }
  flock.run();
}

// Añade un nuevo boid al sistema
/*
function mouseDragged() {
  flock.addBoid(new Boid(mouseX, mouseY));
}*/

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Objeto Flock
// Hace pocas cosas, simplemente administra el arreglo de todos los boids

function Flock() {
  // Un arreglo para todos los boids
  this.boids = []; // Inicializar el arreglo
}


Flock.prototype.run = function() {
  for (let i = 0; i < this.boids.length; i++) {
    this.boids[i].run(this.boids);  // Pasar la lista entera de boids a cada boid de forma individual
  }
}

Flock.prototype.addBoid = function(b) {
  this.boids.push(b);
}


function Boid(x, y) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(random(-1, 1),random(-1, 1));
  this.position = createVector(x,y);
  this.r = 3.0;
  this.maxspeed = 3;    // Velocidad máxima
  this.maxforce = 0.05; // Fuerza de viraje máxima
  //put a image for the agent
  this.img = loadImage("assets/bird.png");
}

Boid.prototype.run = function(boids) {
  this.flock(boids);
  this.update();
  this.borders();
  this.render();
}

Boid.prototype.applyForce = function(force) {
  // Posibilidad de agregar masa aquí si queremos A = F / M
  this.acceleration.add(force);
}

// Acumular una nueva aceleración cada vez basado en tres reglas
Boid.prototype.flock = function(boids) {
  let sep = this.separate(boids);   // Separación
  let ali = this.align(boids);      // Alineamiento
  let coh = this.cohesion(boids);   // Cohesión
  let avoi = this.avoid(obstacles);
  // Dar un peso arbitrario a cada fuerza
  sep.mult(1.5);
  ali.mult(1.0);
  coh.mult(1.0);
  avoi.mult(2.0);
  // Suma los vectores de fuerza a la aceleración
  this.applyForce(sep);
  this.applyForce(ali);
  this.applyForce(coh);
  this.applyForce(avoi);
}

// Método para actualizar ubicación
Boid.prototype.update = function() {
  // Refrescar velocidad
  this.velocity.add(this.acceleration);
  // Limitar velocidad
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // Resetear acceleración a 0 en cada ciclo
  this.acceleration.mult(0);
}

// Un método que calcula y aplica una fuerza de viraje hacia una posición objetivo
// VIRAJE = DESEADO - VELOCIDAD
Boid.prototype.seek = function(target) {
  let desired = p5.Vector.sub(target, this.position);  // Un vector apuntando desde la ubicación hacia el objetivo
  // Normalizar deseado y escalar según velocidad máxima
  desired.normalize();
  desired.mult(this.maxspeed);
  // Viraje = Deseado - Velocidad
  let steer = p5.Vector.sub(desired, this.velocity);
  steer.limit(this.maxforce);  // Limita al máximo de fuerza de viraje
  return steer;
}

Boid.prototype.render = function() {
  // Calculate the angle of rotation for the image based on the velocity
  let theta = this.velocity.heading() + radians(90);

  // Translate and rotate the canvas
  push();
  translate(this.position.x, this.position.y);
  rotate(theta);

  // Display the image at the translated and rotated position
  imageMode(CENTER);  // Set the image origin to the center
  image(this.img, 0, 0, this.r * 8, this.r * 8);  // Adjust size as needed

  // Restore the canvas to its original state
  pop();
}
// Wraparound, salir por un borde y aparecer por el contrario
Boid.prototype.borders = function() {
  if (this.position.x < -this.r)  this.position.x = width +this.r;
  if (this.position.y < -this.r)  this.position.y = height+this.r;
  if (this.position.x > width + this.r) this.position.x = -this.r;
  if (this.position.y > height+ this.r) this.position.y = -this.r;
}
// Separación
// Método que revisa los boids cercanos y vira para alejarse de ellos
Boid.prototype.separate = function(boids) {
  let desiredseparation = 25.0;
  let steer = createVector(0, 0);
  let count = 0;
  // Por cada boid en el sistema, revisa si está muy cerca
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position, boids[i].position);
    // Si la distancia es mayor a 0 y menor que una cantidad arbitraria (0 cuando eres tú mismo)
    if ((d > 0) && (d < desiredseparation)) {
      // Calcular el vector apuntando a alejarse del vecino
      let diff = p5.Vector.sub(this.position, boids[i].position);
      diff.normalize();
      diff.div(d);        // Peso por distancia
      steer.add(diff);
      count++;            // Mantener registro de cantidad
    }
  }
  // Promedio -- divide por la cantidad
  if (count > 0) {
    steer.div(count);
  }

  // Mientras el vector sea mayor a 0
  if (steer.mag() > 0) {
    // Implementa Reynolds: Viraje = Deseado - Velocidad
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }
  return steer;
}

// Alineamiento
// Para cada boid cercano en el sistema, calcula la velocidad promedio
Boid.prototype.align = function(boids) {
  let neighbordist = 50;
  let sum = createVector(0, 0);
  let count = 0;
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position,boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].velocity);
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxspeed);
    let steer = p5.Vector.sub(sum, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
}

// Cohesión
// Para la ubicación promedio (centro) de todos los boids cercanos, calcula el vector de viraje hacia esa ubicación.
Boid.prototype.cohesion = function(boids) {
  let neighbordist = 50;
  let sum = createVector(0, 0);   // Empieza con un vector vacío para acumular todas las posiciones
  let count = 0;
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position,boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].position); // Añada posición
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    return this.seek(sum);  // Vira hacia la posición
  } else {
    return createVector(0, 0);
  }
}

Boid.prototype.avoid = function(obstacles) {
  let desiredseparation = 50.0;
  let steer = createVector(0, 0);
  let count = 0;
  
  for (let i = 0; i < obstacles.length; i++) {
    let d = p5.Vector.dist(this.position, obstacles[i].position);
    
    if (d > 0 && d < desiredseparation) {
      let diff = p5.Vector.sub(this.position, obstacles[i].position);
      diff.normalize();
      diff.div(d);
      steer.add(diff);
      count++;
    }
  }
  
  if (count > 0) {
    steer.div(count);
  }
  
  if (steer.mag() > 0) {
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }
  
  return steer;
};


//create an object called obstacle
function Obstacle(x, y, w, h) {
  this.position = createVector(x, y);
  this.w = w;
  this.h = h;
  this.img = loadImage("tree.png");
  this.img = obstacleImage;
}
Obstacle.prototype.show = function() {
  image(this.img, this.position.x, this.position.y, this.w, this.h);
}
function mouseClicked() {
  obstacles.push(new Obstacle(mouseX, mouseY, 50, 50));
}
