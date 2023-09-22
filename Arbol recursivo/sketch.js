let barkTexture;
let leafTexture;
let growthFactor = 0.5; // Factor de crecimiento del árbol.
let maxHeight = 30; // Altura máxima del árbol. 

function preload() {
  barkTexture = loadImage('corteza.png'); 
  leafTexture = loadImage('pngegg.png'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  
}

function draw() {
  orbitControl();
  background(0);
  translate(0,height/2);  // Centramos el árbol verticalmente
  if (10 + growthFactor * frameCount < maxHeight) {
  branch(10 + growthFactor * frameCount); // La longitud de la rama inicial aumenta con el tiempo.
  console.log(10 + growthFactor * frameCount);
  }
}

function branch(len) {
  strokeWeight(map(len, 10, 150, 0.5, 5));
  stroke(70, 40, 20);
  //image(barkTexture,0, 0, 0, 0)
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
      var r = 80 + random(-20,20);
      var g = 120+ random(-20,20);
      var b = 40+ random(-20,20);

      fill(r,g,b,200);
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

