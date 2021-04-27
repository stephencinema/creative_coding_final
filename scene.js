let canvas;
let scene1_text;
let scene2_text;
let scene3_text;
let scene4_text;
let scene5_text;

let cols, rows;
let scl = 20;
let w = 1400;
let h = 1000;

let flying = 0;

let terrain = [];

function centerCanvas() { // adapted from https://stackoverflow.com/q/58548249
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  canvas.position(x, y);
}

function setup() {
  frameRate(30);
  let millisecond = millis();
  let second = millisecond * 1000;
  canvas = createCanvas(1200, 700, WEBGL);
  centerCanvas();

  cols = w / scl;
  rows = h / scl;

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }

  scene1_text = createGraphics(300, 300);
  scene1_text.textFont('Helvetica');
  scene1_text.textAlign(CENTER);
  scene1_text.textSize(40);
  scene1_text.fill(255);
  scene1_text.text('SCENE1', 150, 150);
}

function draw() {
  background(0);
  scene1();
  texture(scene1_text);
  noStroke();
  plane(300, 300);
}

function scene1() { // code adapted from Daniel Shiffman https://thecodingtrain.com/CodingChallenges/011-perlinnoiseterrain.html
  flying -= 0.1;
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  push();
  translate(0, 50);
  rotateX(PI / 3);
  fill(300, 200, 0, 150);
  translate(-w / 2, -h / 2);
  for (var y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
  pop();
} // end of scene 1 function
