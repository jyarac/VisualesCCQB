let citySize = 10; 
let blockSize = 50;
let city = [];

function setup() {
    createCanvas(800, 600, WEBGL);
    for (let i = 0; i < citySize; i++) {
        city[i] = [];
        for (let j = 0; j < citySize; j++) {
            city[i][j] = random(50, 200);
        }
    }
}

function draw() {
    background(220);
    orbitControl();  // Allows you to rotate the view using the mouse
    drawCity();
}

function drawCity() {
    for (let i = 0; i < citySize; i++) {
        for (let j = 0; j < citySize; j++) {
            push();
            translate(i * blockSize - citySize * blockSize / 2, 0, j * blockSize - citySize * blockSize / 2);
            box(blockSize, city[i][j], blockSize);
            pop();
        }
    }
}
