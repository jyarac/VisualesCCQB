// Daniel Shiffman
// Code for: https://youtu.be/E1B4UoSQMFw

// variables: A B
// axiom: A
// rules1: (A → AB), (B → A)
var angle;
var axiom = "F";
var sentence = axiom;

var len = 100;

var rules1 = [];
rules1[0] = {
  a: "F",
  b: "FF+[+F-F'F]-[-F/F+F]"
  
  
}
//hagan la configuraion que quieran con las siguientes reglas
var rules2 = [];
rules2[0] = {
  a: "F",

  b: "F+[+F-F/F]-[-F+F]FF"
  
}
rules2[1] = {
    a: "X",
    //b: "/F[+X]F['X]+X"

    b: "/F[+X]F['X]+X"
}
var rules3 = [];
rules3[0] = {
  a: "F",
  b: "FF/[+F-F-F]'[-F+X-F]"
}
function preload() {
  barkTexture = loadImage('corteza.png'); 
  leafTexture = loadImage('pngegg.png'); 
}
function draw(){
    drawTree();
    orbitControl();
}

function drawTree() {
    background(51);
    resetMatrix();
    translate(width/50, height/2);
    stroke(255, 100);
    for (var i = 0; i < sentence.length; i++) {
      var current = sentence.charAt(i);
      if (current == "F") {
        line(0, 0, 0, -len);
        translate(0, -len);
      } else if (current == "+") {
        rotate(angle);
      } else if (current == "-") {
        rotate(-angle)
      } else if (current == "[") {
        push();
      } else if (current == "]") {
        pop();
      } else if (current == "X") {
        line(0, 0, 0, -len/2);
        translate(0, -len/2);
      } else if (current == "/") { 
        rotateY(angle);
      } else if (current == "'") {
        rotateY(-angle);
      }
  }
}


//para usar un conjutno diferente de reglas cambien esta funcion
function generate(actualRules) {
  len *= 0.5;
  var nextSentence = "";
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    var found = false;
    for (var j = 0; j < actualRules.length; j++) {
      if (current == actualRules[j].a) {
        found = true;
        nextSentence += actualRules[j].b;
        break;
      }
    }
    if (!found) {
      nextSentence += current;
    } 
  }
  sentence = nextSentence;
}
function setup() {
    createCanvas(windowWidth, windowHeight/1.2, WEBGL); 
    angle = radians(25);
    background(51);
    var button1 = createButton("Crear siguiente generacion configuracion 1");
    var button2 = createButton("Crear siguiente generacion configuracion 2");
    var button3 = createButton("Crear siguiente generacion configuracion 3");
    var restartButton = createButton("Reiniciar configuracion");
    button1.mousePressed(useRules1);
    button2.mousePressed(useRules2);
    button3.mousePressed(useRules3);
    restartButton.mousePressed(restart);
  }
function restart(){
    len = 100;
    sentence = axiom;
}

function useRules1(){
    generate(rules1);
}
function useRules2(){
    generate(rules2);
}
function useRules3(){
    generate(rules3);
}