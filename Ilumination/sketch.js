let lightDir;

function setup() {
  createCanvas(600, 400, WEBGL);
  noStroke();

  // Definir la dirección de la luz
  lightDir = createVector(0, -1, -1);
}

function draw() {
  background(0);

  push()
  ambientLight(50); // Luz ambiental débil
  // Configurar la luz direccional para la luz difusa
  directionalLight(255, 255, 255, lightDir.x, lightDir.y, lightDir.z);
  // Ajustar la luz especular para agregar el componente especular
  specularMaterial(250);
  shininess(20); // Ajusta esto para ver el efecto sobre el brillo especular
  // Posicionar la dirección de la luz dinámicamente con el ratón
  lightDir.set((mouseX - width / 2) * 0.01, -1, (mouseY - height / 2) * 0.01);  

  translate(-100, 0, 0);
  fill(100, 200, 200);
  sphere(70);
  pop()

  push()
  // Configuración de la luz ambiente
  ambientLight(100); // Luz débil que no depende de la dirección
  
  // Configurar la luz direccional para el efecto Gouraud aproximado
  directionalLight(255, 255, 255, lightDir.x, lightDir.y, lightDir.z);
  
  // Mover la luz con el ratón para ver el efecto dinámico
  lightDir.set(mouseX - width / 2, mouseY - height / 2, -100);
  lightDir.normalize();

  translate(100,0,0)
  fill(100, 200, 200);
  sphere(70);
  pop()
  
}