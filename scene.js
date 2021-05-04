let canvas;
let scene = 1;

let scene1_text, scene2_text, scene3_text;

let cols, rows;
let scl = 20;
let w = 1400;
let h = 1000;

let flying = 0;
let terrain = [];

let scene1_sound, scene2_sound, scene3_sound;

function centerCanvas() { // adapted from https://stackoverflow.com/q/58548249
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  canvas.position(x, y);
}

function preload() {
  scene1_sound = loadSound('assets/nosleepgolddreams.wav');
}

function setup() {
  frameRate(30);
  canvas = createCanvas(1200, 700, WEBGL);
  centerCanvas();
  normalMaterial();
  cam = createCamera();

  cols = w / scl;
  rows = h / scl;

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }

  scene1_text = createGraphics(2000, 300);
  scene1_text.textFont('Helvetica');
  scene1_text.textStyle(BOLD);
  scene1_text.textAlign(CENTER);
  scene1_text.textSize(40);
  scene1_text.fill(0, 0, 230);
  scene1_text.text('NO SLEEP, HAVING GOLD DREAMS', 980, 150);

  scene2_text = createGraphics(300, 300);
  scene2_text.textFont('Helvetica');
  scene2_text.textAlign(CENTER);
  scene2_text.textSize(40);
  scene2_text.fill(0);
  scene2_text.text('SCENE2', 150, 150);
}

function draw() {
  if (scene == 1) {
    background(130, 130, 255);
    scene1();
    texture(scene1_text);
    noStroke();
    plane(2000, 300);
  }

  if (scene == 2) {
    background(255);
    scene2();
    texture(scene2_text);
    noStroke();
    plane(300, 300);
  }
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
      vertex(x * scl, (y + 5) * scl, terrain[x][y + 6]);
    }
    endShape();
  }
  pop();
} // end of scene 1 function

function scene2() {
  normalMaterial();
  push();
  translate(270, 0, 0);
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  box(70, 70, 70);
  pop();
}

function keyPressed() {
  scene++;
  if (scene > 3) {
    scene = 1;
  }
}

function mousePressed() {
  if (scene == 1){
    scene1_sound.play();
    //scene1_sound.setVolume(0.5);
    scene1_sound.loop();
  }
}
