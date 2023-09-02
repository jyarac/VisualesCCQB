const {Engine, World, Mouse, MouseConstraint, Events} = Matter;

let engine, world, bird, ground, birdImg, boxImg, boxes = [];
let mouseConstraint, slingshot;

function preload() {
  birdImg = loadImage('bird.png');
  boxImg = loadImage('box.png');
  slinImg = loadImage("slingshot.png");
  landscape = loadImage("landscape.jpg");
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
  slingshot = new SlingShot(bird, slinImg);
  Events.on(engine, 'afterUpdate', 
    () => slingshot.fly(mouseConstraint));
  
  ground = new Ground(width/2, height - 10, width, 20);
  
  for (let i=0; i<8; i++){
    const box = new Box(width * 3.0 / 4.0, 50*(i+1), 50, 50, boxImg);
    boxes.push(box);
  }
  for (let i=0; i<8; i++){
    const box = new Box(width * 3.0 / 4.0 + 75, 50*(i+1), 50, 50, boxImg);
    boxes.push(box);
  }
}


function draw() {
  background(128);
  background(landscape);
  Engine.update(engine);
  
  slingshot.show();
  bird.show();
  
  ground.show();
  
  for (const box of boxes) {
    box.show();
  }
}

function keyPressed(){
  if (key == ' ' && !slingshot.hasBird()) {
    World.remove(world, bird.body);
    bird = new Bird(150, 375, 25, 5, birdImg);
    slingshot.attach(bird);
  }
}


function collisionHandler(event) {
  const pairs = event.pairs;

  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i];

    // Check if the collision involves a bird and a box
    if (pair.bodyA.label === 'bird' && pair.bodyB.label === 'box') {
      console.log('Bird collided with Box');
      // You can add your collision handling logic here
    } else if (pair.bodyA.label === 'box' && pair.bodyB.label === 'bird') {
      console.log('Bird collided with Box');
      // You can add your collision handling logic here
    }
  }
}