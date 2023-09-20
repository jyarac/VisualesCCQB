function setup() {
  createCanvas(680,480, WEBGL);
}

let i=0;

function draw() {
  background(0);
  camera(i,400,400);
  //orbitControl(); //MOVER CON EL MOUSE
  orbitControl();
  i++;
  
  axes();
  //TIPOS DE TRANSFORMACIONES
  //translate(50,100,50);
  //rotateZ(QUARTER_PI);
  //rotateY(QUARTER_PI);
  //scale(0.5,0.5,0.5);
  push(); //GUARDAR EL ESTADO DE LA MATRIZ
  box();
  pop(); //RESTAURAR EL ESTADO DE LA MATRIZ
}

function axes(){
  //STROKEWEIGHT: GROSOR DE LINEA
  strokeWeight(4); 
  //STROKE: COLOR DE LINEA 
  stroke(255, 0, 0);
  line(0, 0, 0, 100, 0, 0);
  
  strokeWeight(4);
  stroke(0,255,0);
  line(0, 0, 0, 0, 100, 0);
  
  strokeWeight(4);
  stroke(0,0,255);
  line(0, 0, 0, 0, 0, 100);
}