let citySize = 8; 
let blockSize = 50;
let buildingSpacing = 100; // Espacio entre los edificios
let city = [];
let buildingColors = [];
let path = [];
let index = 0;

function setup() {
    createCanvas(800, 600, WEBGL);
    for (let i = 0; i < citySize; i++) {
        city[i] = [];
        for (let j = 0; j < citySize; j++) {
            city[i][j] = random(50, 200);
            buildingColors.push(color(random(255), random(255), random(255)));
        }
    }
}

function draw() {
    background(220);
    orbitControl();  // Permite rotar la vista con el ratón
    
    drawCity();
}

function drawCity() {
    index = 0
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
