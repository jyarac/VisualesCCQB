let gl, camera, testComparator, shapes = [], enableZBuffer = true;

function setup() {
  createCanvas(640, 480, WEBGL);
  camera = createCamera();
  
  gl = this._renderer.GL;

  for (let i = -2; i < 2; i++) {
    for (let j = -2; j < 2; j++) {
      for (let k = -2; k < 2; k++) {
        createPyramid(75*i, 75*j, 75*k);
      }
    }
  }
  
  // Hint: camera.eyeX, camera.eyeY, camera.eyeZ
  testComparator = (a, b) => {
        
    // Calcula la distancia desde el centro de la cara a la cámara.
let distA = sqrt(pow(camera.eyeX - (a.p1.x + a.p2.x + a.p3.x) / 3, 2) + pow(camera.eyeY - (a.p1.y + a.p2.y + a.p3.y) / 3, 2) + pow(camera.eyeZ - (a.p1.z + a.p2.z + a.p3.z) / 3, 2));

// Calcula la distancia desde el centro de la cara a la cámara.
let distB = sqrt(pow(camera.eyeX - (b.p1.x + b.p2.x + b.p3.x) / 3, 2) + pow(camera.eyeY - (b.p1.y + b.p2.y + b.p3.y) / 3, 2) + pow(camera.eyeZ - (b.p1.z + b.p2.z + b.p3.z) / 3, 2));

// Devuelve la diferencia entre las distancias.
return distB - distA;
  };

  noStroke();
}

function draw() {
  background(0);
  orbitControl();
  
  shapes.sort(testComparator);
  shapes.forEach(s => s.show());
}

function keyPressed() {
  if (key === ' '){
    enableZBuffer = !enableZBuffer;
    if (enableZBuffer) {
      gl.enable(gl.DEPTH_TEST);
    } else {
      gl.disable(gl.DEPTH_TEST);
    }
  }
}

function createPyramid(x, y, z) {
  let p1 = createVector(x + random(75), y + random(75), z);
  let p2 = createVector(x + 10 + random(75), y + 10 + random(75), z);
  let p3 = createVector(x + random(75), y + 10 + random(75), z);
  let p4 = createVector(x + random(75), y + random(75), z + 1 + random(75));

  let face1 = new PyramidFace(p1, p2, p3);
  let face2 = new PyramidFace(p1, p2, p4);
  let face3 = new PyramidFace(p1, p3, p4);
  let face4 = new PyramidFace(p2, p4, p3);

  shapes.push(face1, face2, face3, face4);
}

class PyramidFace {
  constructor(p1, p2, p3) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.col = color(random(255),random(255),random(255))
  }

  show() {
    fill(this.col);
    beginShape();
    vertex(this.p1.x, this.p1.y, this.p1.z);
    vertex(this.p2.x, this.p2.y, this.p2.z);
    vertex(this.p3.x, this.p3.y, this.p3.z);
    endShape(CLOSE);
  }
}