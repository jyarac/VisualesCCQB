let citySize = 8;
let blockSize = 50;
let buildingSpacing = 200;
let city = [];
let buildingColors = [];
let index = 0;
let camera, t = 0;
const dt = 0.005;
let controlPoints = [];
let bezierSpline = [];

let x0 = -1050
let y0 = -200
let z0= 310

let x1 = -150
let y1 = 0
let z1= 500

let x2 = -150
let y2 = -0
let z2= 0

let x3 = -30
let y3 = 0
let z3= 20

let x4 = 800
let y4 = 0
let z4= 20

let x5 = 800
let y5 = -200
let z5= -200

let x6 =800
let y6 = 0
let z6 = -1000

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

  // Generate random control points
  for (let i = 0; i < 100; i++) {
    let x = random(-200, 200);
    let y = random(0, 100);
    let z = random(-200, 200);
    let found = false;
    for (let j = 0; j < citySize; j++) {
      for (let k = 0; k < citySize; k++) {
        if (city[j][k] == y) {
          found = true;
          break;
        }
      }
    }
    if (found) {
      i--;
      continue;
    }
    //point(-700,0,400)
    //point(-150,0,400)
    //point(-150,0,100)
    
    //controlPoints.push(createVector(x, y, z));
    
  }
  controlPoints.push(createVector(x0, y0, z0));
    controlPoints.push(createVector(x1, y1, z1));
    controlPoints.push(createVector(x2, y2, z2));
  
    controlPoints.push(createVector(x3, y3, z3));
    controlPoints.push(createVector(x4, y4, z4));
    controlPoints.push(createVector(x5, y5, z5));
  
    controlPoints.push(createVector(x6, y6, z6));
  

  // Calculate the bezier spline
  bezierSpline = calculateBezierSpline(controlPoints);
}

function draw() {
  background(220);
  orbitControl();
  drawCity();

  // Draw Bezier spline
  //stroke(255, 0, 0);
  noFill();
  beginShape();
  for (let point of bezierSpline) {
    vertex(point.x, point.y, point.z);
  }
  endShape();

  // Animate the camera along the spline
  let camPos = getPointOnBezierSpline(bezierSpline, t);
  let lookAtPos = getPointOnBezierSpline(bezierSpline, t + 0.01);
  camera.setPosition(camPos.x, camPos.y, camPos.z);
  camera.lookAt(lookAtPos.x, lookAtPos.y, lookAtPos.z);
  t += dt;
  if (t > 1) t = 0;
  point(x0,y0,z0)
  point(x1,y1,z1)
  point(x2,y2,z2)
  point(x3,y3,z3)
  point(x4,y4,z4)
  point(x5,y5,z5)
  point(x6,y6,z6)


}

function drawCity() {
  index = 0;
  for (let i = 0; i < citySize; i++) {
    let randomColor = buildingColors[index];
    for (let j = 0; j < citySize; j++) {
      push();
      translate(
        i * (blockSize + buildingSpacing) - (citySize - 1) * (blockSize + buildingSpacing) / 2,
        0,
        j * (blockSize + buildingSpacing) - (citySize - 1) * (blockSize + buildingSpacing) / 2
      );
      fill(randomColor);
      box(blockSize, city[i][j], blockSize);
      pop();
      index++;
    }
  }
}

function calculateBezierSpline(points) {
  let result = [];
  for (let t = 0; t <= 1; t += 0.01) {
    let point = getPointOnBezierSpline(points, t);
    result.push(point);
  }
  return result;
}

function getPointOnBezierSpline(points, t) {
  let n = points.length - 1;
  let result = createVector();
  for (let i = 0; i <= n; i++) {
    let coef = binomialCoefficient(n, i) * pow(1 - t, n - i) * pow(t, i);
    result.add(p5.Vector.mult(points[i], coef));
  }
  return result;
}

function binomialCoefficient(n, k) {
  return factorial(n) / (factorial(k) * factorial(n - k));
}

function factorial(n) {
  if (n == 0 || n == 1) return 1;
  return n * factorial(n - 1);
}