
let w;
let columns;
let rows;
let board;
let next;
let paused = false;
let font1 

function setup() {
  // Set simulation framerate to 10 to avoid flickering
  frameRate(10);
  createCanvas(1200, 600);
  w = 20;
  // Calculate columns and rows
  columns = 40;
  rows = 40;

  // Wacky way to make a 2D array is JS
  board = new Array(columns);
  for (let i = 0; i < columns; i++) {
    board[i] = new Array(rows);
  }
  // Going to use multiple 2D arrays and swap them
  next = new Array(columns);
  for (i = 0; i < columns; i++) {
    next[i] = new Array(rows);
  }
  init();
}
function preload() {
  font1 = loadFont("Lato.ttf")
}

function draw() {
  background(255);
  if(!paused){
    generate();
  }
  strokeWeight(1)
  for ( let i = 0; i < columns;i++) {
    for ( let j = 0; j < rows;j++) {
      if ((board[i][j] == 1)) fill(0);
      else fill(255);
      stroke(0);
      rect(i * w, j * w, w-1, w-1);
    }
  }
  generateText()

}

function keyPressed(){
  //detect if a or b or c is pressed
  if (key == 'a' || key == 'A') {
    //call function initA
    initA();
  } else if (key == 's' || key == 'S') {
    //call function initB
    initB();
  }
  else if (key == 'D' || key == 'D') {
    //call function initC
    initC();
  }
  //detect if f is pressed and call init
  else if (key == 'f' || key == 'F') { 
    init();
  }
  //detect if e is pressed and call delete
  else if (key == 'e' || key == 'E') {
    deleteAll();
  }
  else if(key == 'p'){
    paused = !paused
  }

}
//create function deleteAll
function deleteAll() {
  //put in 0 every cell
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
        board[i][j] = 0;
        next[i][j] = 0;
    }
  }
}
 
//create function initA
function initA() {
//create glider gun
  board[1][5] = 1;
  board[1][6] = 1;
  board[2][5] = 1;
  board[2][6] = 1;
  board[11][5] = 1;
  board[11][6] = 1;
  board[11][7] = 1;
  board[12][4] = 1;
  board[12][8] = 1;
  board[13][3] = 1;
  board[13][9] = 1;
  board[14][3] = 1;
  board[14][9] = 1;
  board[15][6] = 1;
  board[16][4] = 1;
  board[16][8] = 1;
  board[17][5] = 1;
  board[17][6] = 1;
  board[17][7] = 1;
  board[18][6] = 1;
  board[21][3] = 1;
  board[21][4] = 1;
  board[21][5] = 1;
  board[22][3] = 1;
  board[22][4] = 1;
  board[22][5] = 1;
  board[23][2] = 1;
  board[23][6] = 1;
  board[25][1] = 1;
  board[25][2] = 1;
  board[25][6] = 1;
  board[25][7] = 1;
  board[35][3] = 1;
  board[35][4] = 1;
  board[36][3] = 1;
  board[36][4] = 1;
}

// Fill board randomly
function init() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      // Lining the edges with 0s
      if (i == 0 || j == 0 || i == columns-1 || j == rows-1) board[i][j] = 0;
      // Filling the rest randomly
      else board[i][j] = floor(random(2));
      next[i][j] = 0;
    }
  }
}

//create mousePressed function
function mousePressed() {
  //detect the cell that the mouse is over
  let x = floor(mouseX / w);
  let y = floor(mouseY / w);
  //if the cell is 0, make it 1
  if (board[x][y] == 0) {
    board[x][y] = 1;
  }
  //if the cell is 1, make it 0
  else {
    board[x][y] = 0;
  }
}

// The process of creating the new generation
function generate() {

  // Loop through every spot in our 2D array and check spots neighbors
  for (let x = 1; x < columns - 1; x++) {
    for (let y = 1; y < rows - 1; y++) {
      // Add up all the states in a 3x3 surrounding grid
      let neighbors = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          neighbors += board[x+i][y+j];
        }
      }

      // A little trick to subtract the current cell's state since
      // we added it in the above loop
      neighbors -= board[x][y];
      // Rules of Life
      if      ((board[x][y] == 1) && (neighbors <  2)) next[x][y] = 0;           // Loneliness
      else if ((board[x][y] == 1) && (neighbors >  3)) next[x][y] = 0;           // Overpopulation
      else if ((board[x][y] == 0) && (neighbors == 3)) next[x][y] = 1;           // Reproduction
      else                                             next[x][y] = board[x][y]; // Stasis
    }
  }

  // Swap!
  let temp = board;
  board = next;
  next = temp;
}

function generateText(){
  //textSize(30); 
  //fill(0); 
  //text("El juego de la vida", width/2, 30); 
  
  fill(240,240,240)
  rect(850, 40, 345, 170);
  
  
  textFont(font1)
  fill(0)
  textSize(24); 
  strokeWeight(1) 
  text("El juego de la vida.", 855,35); 
  textSize(15); 
  strokeWeight(0.5) 
  text("Presione la tecla p para pausar el juego.", 855,60); 
  text("Presione la tecla e para limpiar la pantalla.", 855,90); 
  text("Presione la tecla f para crear un juego aleatorio.", 855,120); 
  text("Presione la tecla a para cargar el modelo glider gun.", 855,150); 
}
