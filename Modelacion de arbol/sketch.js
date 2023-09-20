function setup() {
  createCanvas(680, 400, WEBGL);
  angleMode(DEGREES); // Cambia el modo de ángulo a grados
}

let angle = 0; // Variable para controlar el ángulo de crecimiento

function draw() {
  background(0);
  orbitControl();
  
  translate(0, height / 2); // Alinea el centro del tronco con la mitad de la altura
  
  // Llama a una función que dibuja la estructura
  drawPlant(100, 10); // Los valores son solo ejemplos
  
  axes();
}

function drawPlant(len, level) {
  if (level > 0) {
    // Dibuja un tronco
    stroke(139, 69, 19); // Color marrón
    strokeWeight(2);
    line(0, 0, 0, 0, -len, 0); // Dibuja el tronco hacia abajo

    translate(0, -len); // Mueve el punto de origen al extremo del tronco
    push(); // Guarda la transformación actual
    rotate(angle); // Rota a la derecha
    drawPlant(len * 0.67, level - 1); // Dibuja una rama derecha recursivamente
    pop(); // Restaura la transformación anterior

    push(); // Guarda la transformación actual
    rotate(-angle); // Rota a la izquierda
    drawPlant(len * 0.67, level - 1); // Dibuja una rama izquierda recursivamente
    pop(); // Restaura la transformación anterior
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
