
let vertices = [];
let faces = [];
let lightPosition;
        
function setup() {
  createCanvas(800, 600);
  lightPosition = createVector(0, 0, 500);

  // Define 3D object vertices
  vertices.push(createVector(100, 100, 100));
  vertices.push(createVector(100, -100, 100));
  vertices.push(createVector(100, -100, -100));
  vertices.push(createVector(100, 100, -100));
  vertices.push(createVector(-100, 100, 100));
  vertices.push(createVector(-100, -100, 100));
  vertices.push(createVector(-100, -100, -100));
  vertices.push(createVector(-100, 100, -100));

  // Define 3D object faces
  faces.push([0, 1, 2, 3]);
  faces.push([4, 5, 6, 7]);
  faces.push([0, 4, 7, 3]);
  faces.push([1, 5, 6, 2]);
  faces.push([0, 1, 5, 4]);
  faces.push([3, 2, 6, 7]);

}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  for (let face of faces) {
    let faceVertices = [];
    for (let vertexIndex of face) {
      let vertex = vertices[vertexIndex];
      faceVertices.push(vertex);
    }
    let faceNormal = calculateFaceNormal(faceVertices);
    let lightDirection = p5.Vector.sub(lightPosition, faceVertices[0]);
    lightDirection.normalize();
    let intensity = p5.Vector.dot(faceNormal, lightDirection);

    beginShape();
    for (let vertex of faceVertices) {
      vertex.x = map(vertex.x, -100, 100, -width / 2, width / 2);
      vertex.y = map(vertex.y, -100, 100, -height / 2, height / 2);
      vertex.z = map(vertex.z, -100, 100, -width / 2, width / 2);
      fill(255 * intensity);
      vertex(vertex.x, vertex.y, vertex.z);
    }
    endShape(CLOSE);
  }
}

function calculateFaceNormal(vertices) {
let vector1 = p5.Vector.sub(vertices[1], vertices[0]);
let vector2 = p5.Vector.sub(vertices[2], vertices[0]);
let normal = p5.Vector.cross(vector1, vector2);
normal.normalize();
return normal;
}

