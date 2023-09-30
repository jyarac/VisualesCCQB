let cols, rows,radius;
let scl =10; 
let flying = 0;
function setup() {
  createCanvas(640, 480, WEBGL);
}
function draw() {
  background(125);
  rotateX(PI / 3);
  radius = 180;
  cols = floor(width / scl);
  rows = floor(height / scl)
  fill(0, 50, 200, 128);
  stroke(200);
  flying -= 0.1;
  let yoff = flying;
  for (let y = 0; y < rows; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols + 1; x++) {
      let lat = map(y, 0, rows, 0, PI);
      let lon = map(x, 0, cols, -PI, PI);
      let noiseFactor = map(noise(x * 0.1, y * yoff), 0, 1, -70, 70); 

      let x1 = (radius + noiseFactor) * sin(lat) * cos(lon);
      let y1 = (radius + noiseFactor) * sin(lat) * sin(lon);
      let z1 = (radius + noiseFactor) * cos(lat);

      let lat2 = map(y + 1, 0, rows, 0, PI);
      let lon2 = map(x, 0, cols, -PI, PI);
      let noiseFactor2 = map(noise(x * 0.1, (y + 1) *yoff), 0, 1, -70, 70);

      let x2 = (radius + noiseFactor2) * sin(lat2) * cos(lon2);
      let y2 = (radius + noiseFactor2) * sin(lat2) * sin(lon2);
      let z2 = (radius + noiseFactor2) * cos(lat2);
      yoff += 0.05;
      vertex(x1, y1, z1);
      vertex(x2, y2, z2);
    }
    endShape();
  }
}
