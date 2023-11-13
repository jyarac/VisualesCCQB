let myShader;
let texture;

let fogNearSlider;
let fogFarSlider;
let fogNearValueLabel; // Etiqueta para el valor de fogNear
let fogFarValueLabel; // Etiqueta para el valor de fogFar

function preload() {
  texture = loadImage("https://webglfundamentals.org/webgl/resources/f-texture.png");
}

function setup() {
  createCanvas(640, 480, WEBGL);
  myShader = createShader(vert, frag);
  shader(myShader);
  myShader.setUniform("tex0", texture);

  fogNearSlider = createSlider(0, 1000, 800);
  fogFarSlider = createSlider(0, 1000, 800);
  fogNearSlider.position(480, 25);
  fogFarSlider.position(480, 55);
  fogNearSlider.input(updateFogNear);
  fogFarSlider.input(updateFogFar);

  const fogNearLabel = createP('fogNear: ');
  fogNearLabel.position(420, 10);
  fogNearValueLabel = createP(fogNearSlider.value()); // Inicializa la etiqueta con el valor actual
  fogNearValueLabel.position(615, 10);

  const fogFarLabel = createP('fogFar: ');
  fogFarLabel.position(420, 40);
  fogFarValueLabel = createP(fogFarSlider.value()); // Inicializa la etiqueta con el valor actual
  fogFarValueLabel.position(615, 40);

  myShader.setUniform("tex0", texture);
  myShader.setUniform("fogNear", fogNearSlider.value());
  myShader.setUniform("fogFar", fogFarSlider.value());
  myShader.setUniform("fogColor", [0.8, 0.9, 1, 1]);

  const camX = -width * 0.5 + 10;
  const camY = height * 0.5 - 240;
  const camZ = ((height / 2.0) / tan(PI * 30.0 / 180.0) - 30) * 0.65;

  camera(camX, camY, camZ, 0, 0, 0, 0, 1, 0);
}

function draw() {
  background(0.8 * 255, 0.9 * 255, 1 * 255);

  myShader.setUniform("fogNear", fogNearSlider.value());
  myShader.setUniform("fogFar", fogFarSlider.value());

  // Actualiza las etiquetas con los valores actuales de los sliders
  fogNearValueLabel.html(fogNearSlider.value());
  fogFarValueLabel.html(fogFarSlider.value());

  const numCubes = 40;
  for (let i = 0; i <= numCubes; ++i) {
    push();
    translate(i * 180 - (numCubes * 60), 0, 0);
    rotateY(frameCount * 0.02 + i * 0.1);
    rotateX(frameCount * 0.02 + i * 0.1);
    myShader.setUniform("tex0", texture);
    noStroke();
    box(100);
    pop();
  }
}

function updateFogNear() {
  const fogNearValue = fogNearSlider.value();
  myShader.setUniform('fogNear', fogNearValue);
}

function updateFogFar() {
  const fogFarValue = fogFarSlider.value();
  myShader.setUniform('fogFar', fogFarValue);
}


const vert = `
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

const frag = `
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