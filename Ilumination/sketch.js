// Definir variables para los shaders y la transparencia
let phongShadingShader, gouraudShadingShader, alpha = 32;

// Configuración inicial
function setup() {
  createCanvas(640, 480, WEBGL);
  phongShadingShader = createShader(vertPhongShading, fragPhongShading);
  gouraudShadingShader = createShader(vertGouraudShading, fragGouraudShading);

  // Desactivar bordes
  noStroke();
}

// Función principal de dibujo
function draw() {
  background(0);
  orbitControl();

  // Crear esferas con diferentes shaders
  createSphere(-200, 0, 0, 75, color(255, 255, 0), phongShadingShader);
  createSphere(200, 0, 0, 75, color(255, 255, 0), gouraudShadingShader);
}

// Función para crear una esfera con un shader específico
function createSphere(x, y, z, radius, col, selectedShader) {
  push();
  translate(x, y, z);

  // Configurar dirección de la luz basada en la posición del mouse
  const lightX = map(mouseX, 0, width, -1.0, 1.0);
  const lightY = map(mouseY, 0, height, -1.0, 1.0);

  // Configurar variables uniformes en el shader seleccionado
  selectedShader.setUniform("uColor", [red(col) / 255, green(col) / 255, blue(col) / 255]);
  selectedShader.setUniform("uLightDirection", [lightX, lightY, 1.0]);
  selectedShader.setUniform("uAlpha", alpha);

  // Activar el shader seleccionado
  shader(selectedShader);

  // Dibujar la esfera
  sphere(radius);
  pop();
}

// Vertex shader para Phong shading
const vertPhongShading = `
precision mediump float;

attribute vec3 aPosition;
attribute vec3 aNormal;

uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;
uniform mat3 uNormalMatrix;

varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vNormal = normalize(uNormalMatrix * aNormal);
  vPosition = (uModelViewMatrix * vec4(aPosition, 1.0)).xyz;
  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
}
`;

// Fragment shader para Phong shading
const fragPhongShading = `
precision mediump float;

varying vec3 vNormal;
varying vec3 vPosition;

uniform vec3 uColor;
uniform vec3 uLightDirection;
uniform float uAlpha;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 eyeDirection = normalize(-vPosition);
  vec3 lightDirection = normalize(uLightDirection);

  vec3 ambient = vec3(0.2, 0.2, 0.2);
  vec3 diffuse = uColor * max(0.0, dot(normal, lightDirection));

  vec3 reflectionDirection = reflect(-lightDirection, normal);
  vec3 specular = pow(max(dot(reflectionDirection, eyeDirection), 0.0), uAlpha) * vec3(1.0, 1.0, 1.0);

  gl_FragColor = vec4(ambient + diffuse + specular, 1.0);
}
`;

// Vertex shader para Gouraud shading
const vertGouraudShading = `
precision mediump float;

attribute vec3 aPosition;
attribute vec3 aNormal;

uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;
uniform mat3 uNormalMatrix;

uniform vec3 uLightDirection;
uniform vec3 uColor;
uniform float uAlpha;

varying vec4 vColor;

void main() {
  vec3 normal = normalize(uNormalMatrix * aNormal);
  vec3 lightDirection = normalize(uLightDirection);

  vec3 ambient = vec3(0.2, 0.2, 0.2);
  vec3 diffuse = uColor * max(0.0, dot(normal, lightDirection));

  vec3 eyeDirection = normalize(-aPosition);
  vec3 reflectionDirection = reflect(-lightDirection, normal);
  vec3 specular = pow(max(dot(reflectionDirection, eyeDirection), 0.0), uAlpha) * vec3(1.0, 1.0, 1.0);

  vColor = vec4(ambient + diffuse + specular, 1.0);
  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
}
`;

// Fragment shader para Gouraud shading
const fragGouraudShading = `
precision mediump float;

varying vec4 vColor;

void main() {
  gl_FragColor = vColor;
}
`;
