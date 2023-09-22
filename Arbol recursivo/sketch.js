let barkTexture;
let leafTexture;
let growthFactor = 0.5; // Factor de crecimiento del árbol.

function preload() {
  barkTexture = loadImage('corteza.png'); 
  leafTexture = loadImage('pngegg.png'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(200);
  translate(0,height/2);  // Centramos el árbol verticalmente
  branch(10 + growthFactor * frameCount); // La longitud de la rama inicial aumenta con el tiempo.
}

function branch(len) {
  strokeWeight(map(len, 10, 150, 0.5, 5));
  stroke(70, 40, 20);
  texture(barkTexture);
  line(0, 0, 0, 0, -len - 2, 0);
  translate(0, -len, 0);

  if (len > 10) {
    for (var i = 0; i < 3; i++) {
      rotateY(random(10, 140));
      push();
      rotateZ(random(20, 50));
      branch(len * 0.8); 
      pop();
    }
  } else {
    texture(leafTexture);
    noStroke();
    translate(5, 0, 0);
    rotateZ(90);
    beginShape();
    for (var i = 45; i < 135; i++) {
      var rad = 7;
      var x = rad * cos(i);
      var y = rad * sin(i);
      vertex(x, y);
    }
    for (var i = 135; i > 45; i--) {
      var rad = 7;
      var x = rad * cos(i);
      var y = rad * sin(-i) + 20;
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}
