let canvas;
let scene = 1;

let scene1_text, scene2_text, scene3_text;

let img;

let cols, rows;
let scl = 20;
let w = 1400;
let h = 1000;

let flying = 0;
let terrain = [];

let scene1_sound, scene2_sound, scene3_sound;

let zoff = 0;
let inc = 0.1;
let zinc = 0.02;
let start = 0;
let minVal = -50;
let maxVal = 50;
let startInc = 0;

const tileCount = 100;
const noiseScale = 0.05;

let grid;
let xnoise;
let ynoise;
let t = 0;
let r = 0;

function centerCanvas() { // adapted from https://stackoverflow.com/q/58548249
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  canvas.position(x, y);
}

function preload() {
  scene1_sound = loadSound('assets/nosleepgolddreams.wav');
  scene2_sound = loadSound('assets/instantgratification.wav');
  scene3_sound = loadSound('assets/realtimereflections.wav');

  img = loadImage('assets/pretty_soldier_sailor_moon_cover.png');

  reflection = loadAnimation('assets/pretty_soldier_sailor_moon_cover.png', 'assets/trending_topic_cover.png');
}

function setup() {
  frameRate(30);
  canvas = createCanvas(1200, 700, WEBGL);
  centerCanvas();
  normalMaterial();
  cam = createCamera();

  cols = w / scl;
  rows = h / scl;

  for (let x = 0; x < cols; x++) {
    terrain[x] = [];
    for (let y = 0; y < rows; y++) {
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

  scene2_text = createGraphics(2000, 300);
  scene2_text.textFont('Helvetica');
  scene1_text.textStyle(BOLD);
  scene2_text.textAlign(CENTER);
  scene2_text.textSize(40);
  scene2_text.fill(0, 0, 230);
  scene2_text.text('INSTANT GRATIFICATION, YOU NEED', 980, 150);

  scene3_text = createGraphics(2000, 300);
  scene3_text.textFont('Helvetica');
  scene1_text.textStyle(BOLD);
  scene3_text.textAlign(CENTER);
  scene3_text.textSize(40);
  scene3_text.fill(0, 0, 230);
  scene3_text.text('REAL TIME REFLECTIONS', 980, 150);
}

function draw() {
  if (scene == 1) {
    frameRate(60);
    background(130, 130, 255);
    scene1();
    texture(scene1_text);
    noStroke();
    plane(2000, 300);
  }

  if (scene == 2) {
    frameRate(10);
    background(255);
    push();
    scene2();
    pop();
    texture(scene2_text);
    noStroke();
    plane(2000, 300);
  }

  if (scene == 3) {
    frameRate(10);
    background(0);
    animation(reflection, 125, 500);
    scene3();
    texture(scene3_text);
    noStroke();
    plane(2000, 300);
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
  for (let x = -550; x < width; x += 100) {
    for (let y = -300; y < height; y += 100) {
      push();
      translate(x, y);
      rotateY(frameCount * 0.05);
      fill(0, 0, 230);
      plane(50, 50);
      pop();
      translate(270, 0, 0);
      rotateY(frameCount * 0.05);
      fill(0, 0, 230);
      plane(50, 50);
    }
  }
} // end of scene 2 funtion

function scene3() {
  push();
  rotateX(PI / 3);
  translate(-w / 2, -h / 2);

  let yoff = -start;

  fill(0, 0, 150);
  for (let y = 0; y < rows - 1; y++) {
    let xoff = 0;
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x * scl, y * scl, map(noise(xoff, yoff, zoff), 0, 1, minVal, maxVal));
      vertex(x * scl, (y + 1) * scl, map(noise(xoff, yoff, zoff), 0, 1, minVal, maxVal));
      xoff += inc;
    }
    yoff += inc;
    endShape();
  }
  zoff += zinc;
  start += startInc;
  pop();

  push();
  translate(240, 0, 100);
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  texture(img);
  box(70, 70, 70);
  pop();

  push();
  translate(-320, 0, 0);
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  texture(img);
  box(70, 70, 70);
  pop();
} // end of scene 3 function

function keyPressed() {
  scene++;

  if (scene == 1) {
    scene3_sound.stop();
  }

  if (scene == 2) {
    scene1_sound.stop();
  }

  if (scene == 3) {
    scene2_sound.stop();
  }

  if (scene > 3) {
    scene3_sound.stop();
    scene = 1;
  }
}

function mousePressed() {
  if (scene == 1) {
    scene1_sound.play();
    scene1_sound.setVolume(0.5);
    //scene1_sound.loop();
  }

  if (scene == 2) {
    scene2_sound.play();
    scene2_sound.setVolume(0.5);
    //scene2_sound.loop();
  }

  if (scene == 3) {
    scene3_sound.play();
    scene3_sound.setVolume(0.5);
    //scene3_sound.loop();
  }
}
