let citySize = 8;
let blockSize = 50;
let buildingSpacing = 100;
let city = [];
let buildingColors = [];
let index = 0;
let camera, t = 0;
const dt = 0.005;

let controlPoints = [
  { x: -150, y: 100, z: -150 },
  { x: 250, y: 100, z: -150 },
  { x: 250, y: 150, z: 950 },
  { x: -150, y: 150, z: 950 },
  { x: 100, y: 100, z: 100 }
];

function setup() {
  createCanvas(800, 600, WEBGL);
  camera = createCamera();

  for (let i = 0; i < citySize; i++) {
    city[i] = [];
    for (let j = 0; j < citySize; j++) {
      city[i][j] = random(50, 200);
      buildingColors.push(color(random(255), random(255), random(255)));
    }
  }
}

function draw() {
  background(220);
  orbitControl();

  let splinePoint = getSplinePoint(t);
  //camera.setPosition(splinePoint.x, splinePoint.y, splinePoint.z);

  let lookAtPoint = getSplinePoint(t + dt);
  //camera.lookAt(lookAtPoint.x, lookAtPoint.y, lookAtPoint.z);

  t += dt;
  if (t > 1) t = 0;

  drawCity();
  drawSpline();
}

function drawCity() {
  index = 0;
  for (let i = 0; i < citySize; i++) {
    let randomColor = buildingColors[index];
    for (let j = 0; j < citySize; j++) {
      push();
      translate(i * (blockSize + buildingSpacing) - (citySize - 1) * (blockSize + buildingSpacing) / 2, 0, j * (blockSize + buildingSpacing) - (citySize - 1) * (blockSize + buildingSpacing) / 2);
      fill(randomColor);
      box(blockSize, city[i][j], blockSize);
      pop();
      index++;
    }
  }
}

function drawSpline() {
  stroke(255, 0, 0); // Color rojo para la spline
  noFill();
  beginShape();
  for (let i = 0; i <= 1; i += 0.01) {
    let point = getSplinePoint(i);
    vertex(point.x, point.y, point.z);
  }
  endShape();
}

function getSplinePoint(t) {
  let p0 = controlPoints[0];
  let p1 = controlPoints[1];
  let p2 = controlPoints[2];
  let p3 = controlPoints[3];

  let x = catmullRom(t, p0.x, p1.x, p2.x, p3.x);
  let y = catmullRom(t, p0.y, p1.y, p2.y, p3.y);
  let z = catmullRom(t, p0.z, p1.z, p2.z, p3.z);

  return createVector(x, y, z);
}

function catmullRom(t, p0, p1, p2, p3) {
  let v0 = (p2 - p0) * 0.5;
  let v1 = (p3 - p1) * 0.5;
  let t2 = t * t;
  let t3 = t2 * t;

  return (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3) * 0.5;
}