let angle = 0;
let img;
let fogfarSliderValue, fognearSliderValue;

function preload(){
  img = loadImage('f-texture.png');
}



//creating vertex and fragment shaders
const vertex = `
#ifdef GL_ES
precision mediump float;
#endif

attribute vec3 aPosition;
attribute vec2 aTexCoord;
varying vec2 vTexCoord;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

precision mediump float; 
uniform sampler2D texture;
uniform float fogNear; 
uniform float fogFar; 
uniform vec3 fogColor;
varying float vFogDepth;

void main() {
  vTexCoord = aTexCoord;
  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
}
`;

const fragment = `
#ifdef GL_ES
precision mediump float;
#endif

uniform float fogNear;
uniform float fogFar;
uniform vec3 fogColor;
uniform sampler2D tex0;
varying vec2 vTexCoord;

void main() {
  vec3 color = texture2D(tex0, vTexCoord).rgb;
  float depth = gl_FragCoord.z / gl_FragCoord.w;
  float fogFactor = smoothstep(fogNear, fogFar, depth);
  vec3 finalColor = mix(color, fogColor, fogFactor);

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

function setup() {
  createCanvas(1200, 800, WEBGL);
  //creating shader
  myShader = createShader(vertex, fragment);
  shader(myShader);

  // Create and configure sliders
  fogfarSlider = createSlider(0, 1000, 800);
  fogfarSlider.position(1300, 55);
  fogfarSlider.input(updateFogFarValue);


  fognearSlider = createSlider(0, 1000, 800);
  fognearSlider.input(updateFogNearValue);
  fognearSlider.position(1300, 25);

  //updating shader values
  
  myShader.setUniform("fogNear", fognearSlider.value());
  myShader.setUniform("fogFar", fogfarSlider.value());
  //set fog color to gray
  myShader.setUniform("fogColor", [0.784, 0.784, 0.784]);
  myShader.setUniform("tex0", img);
  // Create labels
  let fogfarLabel = createDiv('Fogfar');
  fogfarLabel.position(1300, 40);
  let fognearLabel = createDiv('Fognear');
    fognearLabel.position(1300,10);

  //adjusting camera position to see the cubes
  const camX = width *0.2+250;
  const camY = height * 0.5 - 240;
  const camZ = ((height / 2.0) / tan(PI * 30.0 / 180.0) - 30) * 1;
  camera(camX, camY, camZ, 0, 0, 0, 0, 1, 0);
}

function draw() {
  background(200);

  myShader.setUniform("fogNear", fognearSlider.value());
  myShader.setUniform("fogFar", fogfarSlider.value());



  // Draw the center cube
  push(); // Save the current transformation matrix
  rotateX(angle);
  rotateY(angle * 0.3);
  rotateZ(angle * 1.2);
  myShader.setUniform("tex0", img);
  noStroke(); //stroke deleted to see the fog effect
  box(200, 200, 200);
  pop(); // Restore the transformation matrix

  // Define the padding between the cubes
  let padding = 200;
  // Define the fog


  // Draw 5 cubes behind the center cube
  for(let i = 1; i <= 20; i++){
    push(); // Save the current transformation matrix
    translate(0, 0, -220 * i - padding * i); // Move the drawing context behind the center cube
    
    rotateX(angle);
    rotateY(angle * 0.3);
    rotateZ(angle * 1.2);
    myShader.setUniform("tex0", img);
    noStroke(); //stroke deleted to see the fog effect
    box(200, 200, 200);
    pop(); // Restore the transformation matrix
  }


  

  angle += 0.03;
}


function updateFogNearValue() {
  myShader.setUniform('fogNear', fogNearSlider.value());
}

function updateFogFarValue() {
  myShader.setUniform('fogFar', fogFarSlider.value());
}
