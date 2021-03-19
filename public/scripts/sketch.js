var fade;
var fadeAmount = 100;
let alvo1 = [20, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800];

let alvo2 = [20, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800];

let alvo3 = [20, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800];

let alvo4 = [20, 200, 400, 600, 800, 900, 600, 700, 800, 1000, 1200];

let alvo5 = [20, 200, 400, 600, 800, 900, 600, 700, 800, 1000, 1200];

let alvo6 = [20, 200, 400, 600, 800, 900, 600, 700, 800, 1000, 1200];

let alvo7 = [20, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800];

let alvo8 = [20, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800];

let alvo9 = [20, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800];

let alvo10 = [20, 200, 400, 600, 800, 900, 600, 700, 800, 1000, 1200];

let alvo11 = [20, 200, 400, 600, 800, 900, 600, 700, 800, 1000, 1200];

let alvo12 = [20, 200, 400, 600, 800, 900, 600, 700, 800, 1000, 1200];

let timeLastUpdated = Date.now();
let x;
let x1;
let x2;
let x3;
let x4;
let x5;
let x6;
let x7;
let x8;
let x9;
let x10;
let x11;
let x12;
const TIME_BETWEEN_RANDOMIZATIONS = 4000;

const TIME_BETWEEN_RANDOMIZATIONS2 = 6000;

let img;

var canvas;

function windowResized() {
  //console.log('resized');
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  clear();
}

function draw() {
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
  // var vol = mic.getLevel();
  // ellipse(width / 2, height / 2, vol * width);
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-10");
  fade = 100;
  textSize(width / 20);
}

function draw() {
  background(245, 244, 240);

  if (Date.now() - timeLastUpdated > TIME_BETWEEN_RANDOMIZATIONS) {
    // generate new random numbers
    x1 = random(alvo1);
    x2 = random(alvo2);
    x3 = random(alvo3);
    x4 = random(alvo4);
    x5 = random(alvo5);
    x6 = random(alvo6);
    x7 = random(alvo7);
    x8 = random(alvo8);
    x9 = random(alvo9);
    x10 = random(alvo10);
    x11 = random(alvo11);
    x12 = random(alvo12);

    // update the time
    timeLastUpdated = Date.now();
  }

  if (Date.now() - timeLastUpdated > TIME_BETWEEN_RANDOMIZATIONS2) {
    x1 = random(alvo1);
    x2 = random(alvo2);
    x3 = random(alvo3);
    x4 = random(alvo4);
    x5 = random(alvo5);
    x6 = random(alvo6);
    x7 = random(alvo7);
    x8 = random(alvo8);
    x9 = random(alvo9);
    x10 = random(alvo10);
    x11 = random(alvo11);
    x12 = random(alvo12);
    // update the time
    timeLastUpdated = Date.now();
  }
  text("+", x1, x4);
  text("+", x1, x5);
  text("+", x1, x6);
  text("+", x2, x4);
  text("+", x2, x5);
  text("+", x2, x6);
  text("+", x3, x4);
  text("+", x3, x5);
  text("+", x3, x6);
  text("+", x1, x4);

  text("+", x7, x10);
  text("+", x7, x11);
  text("+", x7, x12);
  text("+", x8, x10);
  text("+", x8, x11);
  text("+", x8, x12);
  text("+", x9, x10);
  text("+", x9, x11);
  text("+", x9, x12);

  text("+", x1, x10);
  text("+", x1, x11);
  text("+", x1, x12);
  text("+", x2, x10);
  text("+", x2, x11);
  text("+", x2, x12);
  text("+", x3, x10);
  text("+", x3, x11);
  text("+", x3, x12);

  fill(200, 200, 200, fade);

  if (fade < 0) fadeAmount = 0.3;
  if (fade > 255) fadeAmount = -10;

  fade += fadeAmount;
}
