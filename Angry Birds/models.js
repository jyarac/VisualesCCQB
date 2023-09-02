class Bird {
    constructor(x, y, r, m, img){
      this.body = Matter.Bodies.circle(x, y, r, {restitution: 0.5});
      Matter.Body.setMass(this.body, m);
      Matter.World.add(world, this.body);
      this.img = img;
      this.label = "bird";
    }
    
    show() {
      push();
      translate(this.body.position.x, this.body.position.y);
      rotate(this.body.angle);
      fill(255);
      //ellipse(0, 0, 2*this.body.circleRadius, 2*this.body.circleRadius);
      imageMode(CENTER);
      image(this.img, 0, 0, 2*this.body.circleRadius, 2*this.body.circleRadius);
      pop();
    } 
  }
  
  class Box {
    constructor(x, y, w, h, img, options = {}) {
      this.body = Matter.Bodies.rectangle(x, y, w, h, options);
      this.w = w;
      this.h = h;
      this.img = img;
      this.life = 100;
      // Establece una vida inicial para las cajas
      Matter.World.add(world, this.body);
    }
  
    show() {
      push();
      translate(this.body.position.x, this.body.position.y);
      rotate(this.body.angle);
    
      if (this.life > 0) {
        if (this.img) {
          imageMode(CENTER);
          image(this.img, 0, 0, this.w, this.h);
        } else {
          // Calcular el color en función de la vida restante
          let boxColor = color(50, 200, 0);
          boxColor.setAlpha(map(this.life, 0, 100, 100, 255)); // Cambiar la opacidad
          fill(boxColor);
          noStroke();
          rectMode(CENTER);
          rect(0, 0, this.w, this.h);
        }
      }
    
      pop();
    }
    
    
  }

  class Pig{
    constructor(x, y, r, m, img){
      this.body = Matter.Bodies.circle(x, y, r, {restitution: 0.5});
      Matter.Body.setMass(this.body, m);
      Matter.World.add(world, this.body);
      this.img = img;
      this.label = "pig";
      this.life = 150;
    }

    show() {
      push();
      translate(this.body.position.x, this.body.position.y);
      rotate(this.body.angle);
      if (this.img) {
        imageMode(CENTER);
        image(this.img, 0, 0,2*this.body.circleRadius, 2*this.body.circleRadius );
      } else {
        // fill(50, 200, 0);
        // noStroke();
        // rectMode(CENTER);
        // rect(0, 0, this.w, this.h);
      }
      pop();
    }
    
  }
  
  class Ground extends Box {
    
    constructor(x, y, w, h){
      super(x, y, w, h, null, {isStatic: true});
    }
    
  }
  
  class SlingShot {
    constructor(body, img){
      const options = {
        pointA: {
          x: body.body.position.x,
          y: body.body.position.y
        },
        bodyB: body.body,
        length: 5,
        stiffness: 0.05
      }
      this.img = img;
      this.sling = Matter.Constraint.create(options);
      Matter.World.add(world, this.sling);
    }
    
    show(){

      if (this.sling.bodyB != null){
        stroke(0);
        strokeWeight(4);
        line(this.sling.pointA.x, this.sling.pointA.y,
          this.sling.bodyB.position.x, this.sling.bodyB.position.y);

      }
      image(this.img, this.sling.pointA.x-35    , this.sling.pointA.y-20, 65, 110);
    }
    
    fly(mConstraint){
      if (this.sling.bodyB != null 
        && mConstraint.mouse.button === -1
        && this.sling.bodyB.position.x > 170) {
          this.sling.bodyB = null;
        }
    }
   
     hasBird(){
       return this.sling.bodyB != null;
     }
     
     attach(bird){
       this.sling.bodyB = bird.body;
     }
  
  }