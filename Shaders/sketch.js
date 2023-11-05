//preload f-texture.png
let angle = 0;
let img;

function preload(){
  img = loadImage('f-texture.png');
}

function setup() {
  createCanvas(710, 400, WEBGL);
}

function draw() {
  background(200);
  rotateX(angle);
  rotateY(angle * 0.3);
  rotateZ(angle * 1.2);

  // pass image as texture
  texture(img);
  box(200, 200, 200);

  angle += 0.03;
}