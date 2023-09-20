let treeDepth = 5; // Profundidad del árbol
let flowerSize = 50; // Tamaño de la flor
let grassCount = 100; // Cantidad de tallos de pasto
let grassMaxHeight = 100; // Altura máxima del pasto

function setup() {
  createCanvas(800, 600, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(0);
  orbitControl();

  // Configuración 1: Árbol
  push();
  translate(-150, 0, 0);
  drawTree(100, treeDepth);
  pop();

  // Configuración 2: Flor
  push();
  translate(0, 0, 0);
  drawFlower(flowerSize, 8);
  pop();

  // Configuración 3: Pasto
  push();
  translate(150, 0, 0);
  drawGrass(grassCount, grassMaxHeight);
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

  for (let i = 0; i < petals; i++) {
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
