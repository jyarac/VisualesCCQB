let angle = 0;
let img;

function preload(){
  img = loadImage('f-texture.png');
}

function setup() {
  createCanvas(1200, 800, WEBGL);
}

function draw() {
  background(200);
  //allow user to drag to rotate
  orbitControl();
  
  // Draw the center cube
  push(); // Save the current transformation matrix
  rotateX(angle);
  rotateY(angle * 0.3);
  rotateZ(angle * 1.2);
  texture(img);
  box(200, 200, 200);
  pop(); // Restore the transformation matrix

  // Define the padding between the cubes
  let padding = 50;

  // Draw 5 cubes behind the center cube
  for(let i = 1; i <= 5; i++){
    push(); // Save the current transformation matrix
    translate(0, 0, -220 * i - padding * i); // Move the drawing context behind the center cube
    rotateX(angle);
    rotateY(angle * 0.3);
    rotateZ(angle * 1.2);
    texture(img);
    box(200, 200, 200);
    pop(); // Restore the transformation matrix
  }

  // Draw 5 cubes in front of the center cube
  for(let i = 1; i <= 5; i++){
    push(); // Save the current transformation matrix
    translate(0, 0, 220 * i + padding * i); // Move the drawing context in front of the center cube
    rotateX(angle);
    rotateY(angle * 0.3);
    rotateZ(angle * 1.2);
    texture(img);
    box(200, 200, 200);
    pop(); // Restore the transformation matrix
  }

  angle += 0.03;
}