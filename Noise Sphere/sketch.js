function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
let r;

let bumpSlider, thetaSlider, phySlider;
let bumpiness, thetaValue, phyValue;



function setup(){
  createCanvas(700, 700, WEBGL);//size(600, 400);
  angleMode(DEGREES);
  colorMode(HSB);
  stroke(199, 80, 88);
  // stroke(321, 0, 100);
  strokeWeight(3);
  noFill();

  r = width/3;

  bumpiness = createDiv();
  bumpiness.class("valueDisplay");
  bumpSlider = createSlider(0, 1.5, 0.2, 0.01);
  bumpSlider.class("Slider");

  thetaValue = createDiv();
  thetaValue.class("valueDisplay");
  thetaSlider = createSlider(0, 10, 6, 0.1);
  thetaSlider.class("Slider");

  phyValue = createDiv();
  phyValue.class("valueDisplay");
  phySlider = createSlider(0, 10, 5, 0.1);
  phySlider.class("Slider");

  pixelDensity(1);
}

function draw(){
  // background(230, 50, 15);
  clear();
  orbitControl(4, 4);//Mouse control

  rotateX(65);
  beginShape(POINTS);
  for(let theta = 0; theta < 180; theta += 2){
    for(let phy = 0; phy < 360; phy += 2){
      let x = r*(1+bumpSlider.value()*sin(thetaSlider.value()*theta)*sin(phySlider.value()*phy)) * sin(1*theta) * cos(phy);
      let y = r*(1+bumpSlider.value()*sin(thetaSlider.value()*theta)*sin(phySlider.value()*phy)) * sin(1*theta) * sin(phy);
      let z = r*(1+bumpSlider.value()*sin(thetaSlider.value()*theta)*sin(phySlider.value()*phy)) * cos(1*theta);
      vertex(x, y, z);
    }
  }
  endShape();

  bumpiness.html("bumpiness: " + bumpSlider.value());
  thetaValue.html("theta value: " + thetaSlider.value());
  phyValue.html("phy value: " + phySlider.value());
}