let citySize = 8; 
let blockSize = 50;
let buildingSpacing = 100; 
let city = [];
let buildingColors = [];
let path = [];
let index = 0;

let controlPoints = [];
let numControlPoints = 4;

let camera, angle = 0, radius = 200;

function setup() {
    createCanvas(800, 600, WEBGL);
    
    for (let i = 0; i < citySize; i++) {
        city[i] = [];
        for (let j = 0; j < citySize; j++) {
            city[i][j] = random(50, 200);
            buildingColors.push(color(random(255), random(255), random(255)));
        }
    }

    for (let i = 0; i < numControlPoints; i++) {
        controlPoints.push(generateControlPoint());
    }
    
    camera = createCamera();
}

function draw() {
    background(220);
    orbitControl();

    drawCity();
    drawSpline();

    if (controlPoints.length > 1) {
        let t = map(sin(angle), -1, 1, 0, 1);
        let splinePos = p5.Vector.lerp(controlPoints[0], controlPoints[1], t);
        
        camera.setPosition(splinePos.x, splinePos.y, splinePos.z);
        if (t >= 1) {
            controlPoints.shift();
            controlPoints.push(generateControlPoint());
        }
    }

    angle += 0.05;
}

function drawCity() {
    index = 0;
    for (let i = 0; i < citySize; i++) {
        let randomColor = buildingColors[index];
        for (let j = 0; j < citySize; j++) {
            push();
            translate(i * (blockSize + buildingSpacing) - (citySize - 1) * (blockSize + buildingSpacing) / 2, 0, j * (blockSize + buildingSpacing) - (citySize - 1) * (blockSize + buildingSpacing) / 2);
            fill(randomColor)
            box(blockSize, city[i][j], blockSize);
            pop();
            index++;
        }
    }
}

function drawSpline() {
    stroke(255, 0, 0);
    noFill();
    beginShape();
    for (let v of controlPoints) {
        vertex(v.x, v.y, v.z);
    }
    endShape();
}

function generateControlPoint() {
    let x = floor(random(citySize));
    let z = floor(random(citySize));
    
    while (city[x][z] > 0) {
        x = floor(random(citySize));
        z = floor(random(citySize));
    }
    
    return createVector(x * (blockSize + buildingSpacing) - (citySize - 1) * (blockSize + buildingSpacing) / 2, 0, z * (blockSize + buildingSpacing) - (citySize - 1) * (blockSize + buildingSpacing) / 2);
}
