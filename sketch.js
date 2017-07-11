// gui params
var numShapes = 20;
var strokeWidth = 4;
var strokeColor = '#00ddff';
var fillColor = [180, 255, 255];
var drawStroke = true;
var drawFill = true;
var radius = 20;
var shape = ['circle', 'triangle', 'square', 'pentagon', 'star'];
var label = 'label';

// gui
var visible = true;
var gui, gui2;

// dynamic parameters
var bigRadius;

var scribble;

function setup() {

  var tmpCanvas = createCanvas(windowWidth, windowHeight);
  tmpCanvas.parent("p5canvas");

  // Calculate big radius
  bigRadius = height / 3.0;

  // Create Layout GUI
  gui = createGui('Layout', 20, height - 200);
  sliderRange(0, 100, 1);
  gui.addGlobals('numShapes', 'bigRadius');

  // Create Shape GUI
  gui2 = createGui('Style', width - 220, height - 200);
  colorMode(HSB);
  sliderRange(0, 50, 1);
  gui2.addGlobals('shape', 'label', 'radius', 'drawFill', 'fillColor');
  sliderRange(0, 10, 0.1);
  gui2.addGlobals('drawStroke', 'strokeColor', 'strokeWidth');

  // Don't loop automatically
  noLoop();

  scribble = new Scribble();
}


function draw() {

  // clear all
  clear();

  // set fill style
  if (drawFill) {
    fill(fillColor);
  } else {
    noFill();
  }

  // set stroke style
  if (drawStroke) {
    stroke(strokeColor);
    strokeWeight(strokeWidth);
  } else {
    noStroke();
  }

  // draw circles arranged in a circle
  for (var i = 0; i < numShapes; i++) {

    var angle = TWO_PI / numShapes * i;
    var x = width / 2 + cos(angle) * bigRadius;
    var y = height / 2 + sin(angle) * bigRadius;
    var d = 2 * radius;

    // pick a shape
    switch (shape) {

      case 'circle':
        // ellipse(x, y, d, d);
        scribble.scribbleEllipse(x, y, d, d);
        break;

      case 'square':
        rectMode(CENTER);
        // rect(x, y, d, d);
        scribble.scribbleRect(x, y, d, d);
        break;

      case 'triangle':
        ngon(3, x, y, d);
        break;

      case 'pentagon':
        ngon(5, x, y, d);
        break;

      case 'star':
        star(6, x, y, d / sqrt(3), d);
        break;

    }

    // draw a label below the shape
    push();
    noStroke();
    fill(0);
    textAlign(CENTER);
    text(label, x, y + radius + 15);
    pop();

  }

}

function visBin() {
  clear();
  label = document.getElementById('inStrTextbox').value;

  textSize(20);
  noStroke();
  fill(fillColor);
  textAlign(LEFT, TOP);
  var textStr = str(label) + " " + label.length;
  text(textStr, 5, 5);

  var boxSize = 50;
  strokeWeight(5);
  stroke(strokeColor);
  rectMode(LEFT, TOP);
  for (var i = 0; i < label.length; i++) {
    // console.log(label.charAt(i) + " " + label.charCodeAt(i).toString(2) + " " + label.charCodeAt(i).toString(2).length);
    var binLength = (label.charCodeAt(i).toString(2).length <= 8) ? 8 : 16;
    for (var j = 0; j < binLength; j++) {
      var x = (1.5 * j + 1) * boxSize;
      var y = (1.5 * i + 1) * boxSize;
      scribble.scribbleRect(x, y, boxSize, boxSize);

      if (label.charCodeAt(i).toString(2).charAt(j - binLength + label.charCodeAt(i).toString(2).length) == "1") {
        var xCoords = [x - 0.5 * boxSize, x + 0.5 * boxSize, x + 0.5 * boxSize, x - 0.5 * boxSize];
        var yCoords = [y - 0.5 * boxSize, y - 0.5 * boxSize, y + 0.5 * boxSize, y + 0.5 * boxSize];
        var gap = 3.5;
        var angle = 315;
        strokeWeight(3);
        stroke(0, 50, 180);
        scribble.scribbleFilling(xCoords, yCoords, gap, angle);
      }
    }
  }

}


// check for keyboard events
function keyPressed() {
  switch (key) {
    // type [F1] to hide / show the GUI
    case 'p':
      visible = !visible;
      if (visible) gui.show();
      else gui.hide();
      break;
  }
}


// draw a regular n-gon with n sides
function ngon(n, x, y, d) {
  beginShape();
  for (var i = 0; i < n; i++) {
    var angle = TWO_PI / n * i;
    var px = x + sin(angle) * d / 2;
    var py = y - cos(angle) * d / 2;
    vertex(px, py);
  }
  endShape(CLOSE);
}


// draw a regular n-pointed star
function star(n, x, y, d1, d2) {
  beginShape();
  for (var i = 0; i < 2 * n; i++) {
    var d = (i % 2 === 1) ? d1 : d2;
    var angle = PI / n * i;
    var px = x + sin(angle) * d / 2;
    var py = y - cos(angle) * d / 2;
    vertex(px, py);
  }
  endShape(CLOSE);
}
