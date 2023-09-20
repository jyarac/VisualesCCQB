function setup() {
  createCanvas(680, 400, WEBGL);
}

let i = 0;

function draw() {
  background(0);
  //camera(0, 400, 400);
  orbitControl();
  
  axes();

  translate(25, -25, 0)
  
  translate(-25, 25, 0)
  rotateZ(QUARTER_PI)

  scale(1.0)
  translate(-25, -25, 0)
  
  box(50);

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
