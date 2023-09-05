const {Engine, World, Mouse, MouseConstraint, Events} = Matter;

let engine, world, bird, ground, birdImg, boxImg, boxImg2, pigImg, boxes = [], pigs = [], birds = [];
let mouseConstraint, slingshot;

function preload() { 
  birdImg = loadImage('bird.png');
  pigImg = loadImage('pig.png')
  slinImg = loadImage("slingshot.png");
  landscape = loadImage("landscape.jpg");
  box1Img = loadImage('box1.png');
  box2Img = loadImage('box2.png');
  
}

function setup() {
  const canvas = createCanvas(1400, 480);
  //put landscape in background
 

  engine = Engine.create();
  world = engine.world;
  
  const mouse = Mouse.create(canvas.elt);
  mouse.pixelRatio = pixelDensity();
  
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse
  });
  World.add(world, mouseConstraint);
  
  bird = new Bird(150, 375, 25, 5, birdImg);
  pig1 = new Pig(760, 370, 20, 5, pigImg);
  pig2 = new Pig(760, 400, 20, 5, pigImg);
  pig3 = new Pig(1010, 320, 20, 5, pigImg);
  pig4 = new Pig(1030, 365, 20, 7, pigImg);

  slingshot = new SlingShot(bird, slinImg);
  Events.on(engine, 'afterUpdate', 
    () => slingshot.fly(mouseConstraint));
  
  ground = new Ground(width/2, height - 10, width, 20);


  for (let i=0; i<3; i++){
    pig1 = new Pig(760, 30*(i+1), 15, 1, pigImg);
    const box1 = new Box(710, 60*(i+1), 50, 50, box1Img);
    const boxx = new Box(850, 60*(i+1), 50, 50, box1Img);
    const box2 = new Box(780, 40*(i+1), 200, 20, box2Img);
    const box3 = new Box(1000, 60*(i+1), 50, 50, box1Img);
    const box4 = new Box(1140, 60*(i+1), 50, 50, box1Img);
    const box5 = new Box(1070, 40*(i+1), 200, 20, box2Img);
    pig2= new Pig(1050, 30*(i+1), 15, 1, pigImg);
    boxes.push(box1);
    boxes.push(boxx);
    boxes.push(pig1);
    boxes.push(box2);
    boxes.push(box3);
    boxes.push(box5);
    boxes.push(box4);
    boxes.push(pig2); 
  }

  
}


function draw() {
  background(128);
  background(landscape);
  Engine.update(engine);
  
  slingshot.show();
  bird.show();
  pig1.show();
  //pig2.show();
  //pig3.show();
  //pig4.show();
  
  ground.show();
  colisionHandler(boxes);
  
  
}


function keyPressed(){
  if (key == ' ' && !slingshot.hasBird()) {
    World.remove(world, bird.body);
    bird = new Bird(150, 375, 25, 5, birdImg);
    slingshot.attach(bird);
  }
}

function colisionHandler(boxes) {
  for (const box of boxes) {
    box.show();
    
    // Verificar si el pájaro está lo suficientemente cerca de la caja
    const d = dist(bird.body.position.x, bird.body.position.y, box.body.position.x, box.body.position.y);
    if (d < bird.body.circleRadius + box.w / 2 && box.life > 0) {
      // Reducir la vida de la caja cuando el pájaro la toque
      box.life -= 2000; // Puedes ajustar el valor de reducción
    }
    
    // Eliminar las cajas con vida cero o menos
    if (box.life <= 0) {
      Matter.World.remove(world, box.body);
      // Aquí puedes agregar cualquier otra acción cuando una caja se queda sin vida
    }
  }
}