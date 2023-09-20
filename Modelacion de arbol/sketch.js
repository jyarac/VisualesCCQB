let treeDepth = 5; // Profundidad del árbol
let treeHeight = 10; // Altura inicial del árbol
let maxTreeHeight = 100; // Altura máxima del árbol
let flowerSize = 5; // Tamaño inicial de la flor
let maxFlowerSize = 50; // Tamaño máximo de la flor
let petalCount = 8; // Cantidad de pétalos
let grassCount = 100; // Cantidad de tallos de pasto
let grassMaxHeight = 10; // Altura máxima del pasto

function setup() {
  createCanvas(800, 600, WEBGL);
  angleMode(DEGREES);
  frameRate(30); // Reducir la velocidad de fotogramas
}

function draw() {
  background(0);
  orbitControl();

// Configuración 1: Árbol
  push();
  translate(-150, 0, 0);
  drawTree(treeHeight, treeDepth);
  if (treeHeight < maxTreeHeight) {
    treeHeight += 0.5; // Incrementa gradualmente la altura del árbol
  }
  pop();

  // Configuración 2: Flor (con animación)
  push();
  translate(0, 0, 0);
  drawFlower(flowerSize, petalCount);
  if (flowerSize < maxFlowerSize) {
    flowerSize += 0.1; // Incrementa gradualmente el tamaño de la flor
    petalCount++; // Añade gradualmente más pétalos
  }
  pop();

  // Configuración 3: Pasto
  push();
  translate(150, 0, 0);
  drawGrass(grassCount, grassMaxHeight);
  if (grassMaxHeight < 100) {
    grassMaxHeight += 0.1; // Incrementa gradualmente la altura del pasto
  }
  pop();

  axes();
}

function drawTree(len, depth) {
  if (depth > 0) {
    stroke(139, 69, 19); // Marrón
    strokeWeight(2);
    line(0, 0, 0, 0, -len, 0); // Tronco

    translate(0, -len);
    for (let i = 0; i < 3; i++) {
      push();
      rotate(random(-30, 30));
      drawTree(len * random(0.6, 0.8), depth - 1);
      pop();
    }
  }
}

function drawFlower(radius, petals) {
  noStroke();
  fill(255, 0, 0); // Rojo
  sphere(radius);

  for (let i = 0; i < min(petals, petalCount); i++) {
    push();
    rotate(360 / petals * i);
    translate(0, radius * 1.5);
    fill(255, 255, 0); // Amarillo
    ellipse(0, 0, 40, 80);
    pop();
  }
}

function drawGrass(count, maxHeight) {
  noStroke();
  fill(0, 255, 0); // Verde

  for (let i = 0; i < count; i++) {
    let x = random(-width / 2, width / 2);
    let y = random(-height / 2, height / 2);
    let h = random(20, maxHeight);

    push();
    translate(x, y, h / 2);
    box(5, 5, h);
    pop();
  }
}

function axes() {
  strokeWeight(4);
  stroke(255, 0, 0);
  line(0, 0, 0, 100, 0, 0);

  strokeWeight(4);
  stroke(0, 255, 0);
  line(0, 0, 0, 0, 100, 0);

  strokeWeight(4);
  stroke(0, 0, 255);
  line(0, 0, 0, 0, 0, 100);
}
