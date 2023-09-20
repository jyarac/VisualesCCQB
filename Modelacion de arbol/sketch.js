let treeDepth = 5; // Profundidad del árbol
let flowerSize = 5; // Tamaño inicial de la flor
let maxFlowerSize = 50; // Tamaño máximo de la flor
let petalCount = 8; // Cantidad de pétalos
let grassCount = 100; // Cantidad de tallos de pasto
let grassMaxHeight = 100; // Altura máxima del pasto

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
  drawTree(100, treeDepth);
  pop();

  // Configuración 2: Flor (con animación)
  push();
  translate(0, 0, 0);
  drawFlower(flowerSize, petalCount);
  if (flowerSize < maxFlowerSize) {
    flowerSize += 0.5; // Incrementa gradualmente el tamaño de la flor
    petalCount++; // Añade gradualmente más pétalos
  }
  pop();

  // Configuración 3: Pasto
  push();
  translate(150, 0, 0);
  drawGrass(grassCount, grassMaxHeight);
  pop();

  axes();
}

function drawTree(len, depth) {
  // (Código del árbol, sin cambios)
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
