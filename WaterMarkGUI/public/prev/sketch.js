// gui params
var inFillColor = '#00ffff';
var inStrokeColor = '#00ddff';
var outFillColor = '#c9f600';
var outStrokeColor = '#a9cd07';
var diffFillColor = '#FC9CA1';

var radius = 40;
var strokeWidth = 4;
// var shape = ['circle', 'triangle', 'square', 'pentagon', 'star'];
var input = 'input';
var output = 'output';

// gui
var gui;

var scribble;
var drawVisBin = true;
var drawDiff = true;
var visBinStyle = ["hachure", "normal"];

// var gotStr;

function setup() {
  var tmpCanvas = createCanvas(windowWidth, windowHeight);
  tmpCanvas.parent("p5canvas");

  // Create Shape GUI
  gui = createGui('Style', width - 220, 0);
  colorMode(HSB);
  // gui.addGlobals('shape');
  gui.addGlobals('input');
  gui.addGlobals('output');
  gui.addGlobals('drawVisBin');
  gui.addGlobals('drawDiff');
  sliderRange(0, 50, 1);
  gui.addGlobals('radius');
  sliderRange(0, 10, 0.1);
  gui.addGlobals('strokeWidth');
  gui.addGlobals('visBinStyle');
  gui.addGlobals('inFillColor');
  gui.addGlobals('inStrokeColor');
  gui.addGlobals('outFillColor');
  gui.addGlobals('outStrokeColor');
  gui.addGlobals('diffFillColor');

  // Don't loop automatically
  // noLoop();

  scribble = new Scribble();

  // gotStr = "input value";
}


function draw() {
  clear(); // clear all

  textSize(radius / 2);
  noStroke();
  fill(inFillColor);
  textAlign(LEFT, TOP);
  var textStr = str(input) + " " + input.length + "\n";
  for (var i = 0; i < input.length; i++) {
    textStr += input.charCodeAt(i).toString(2) + " ";
    if (i % 5 == 4) textStr += "\n";
  }
  text(textStr, 5, 5);
  var textStrHeight = (textStr.split("\n").length + 1) * radius / 2;

  var inputBinStr = "";
  for (var i = 0; i < input.length; i++) {
    if (input.charCodeAt(i).toString(2).length > 8) inputBinStr += ('0000000000000000' + input.charCodeAt(i).toString(2)).slice(-16);
    else inputBinStr += ('00000000' + input.charCodeAt(i).toString(2)).slice(-8);
  }

  textSize(radius / 2);
  noStroke();
  fill(outFillColor);
  textAlign(LEFT, TOP);
  var textStr = str(output) + " " + output.length + "\n";
  for (var i = 0; i < output.length; i++) {
    textStr += output.charCodeAt(i).toString(2) + " ";
    if (i % 5 == 4) textStr += "\n";
  }
  text(textStr, 5 + windowWidth / 2, 5);
  var textStrHeight = (textStr.split("\n").length + 1) * radius / 2;

  var outputBinStr = "";
  for (var i = 0; i < output.length; i++) {
    if (output.charCodeAt(i).toString(2).length > 8) outputBinStr += ('0000000000000000' + output.charCodeAt(i).toString(2)).slice(-16);
    else outputBinStr += ('00000000' + output.charCodeAt(i).toString(2)).slice(-8);
  }

  var diffBinStr = "";
  for (var i = 0; i < outputBinStr.length; i++) {
    diffBinStr += (outputBinStr.charAt(i) != inputBinStr.charAt(i)) ? "1" : "0";
  }

  if (drawVisBin) {
    visBin(0, textStrHeight, inputBinStr, radius, visBinStyle, inFillColor, inStrokeColor, strokeWidth);
    visBin(windowWidth / 2, textStrHeight, outputBinStr, radius, visBinStyle, outFillColor, outStrokeColor, strokeWidth);
    if (drawDiff) {
      visBin(windowWidth / 2, textStrHeight, diffBinStr, radius, visBinStyle, diffFillColor, outStrokeColor, strokeWidth)
    }
  }
}

// function getValue(){
//   gotStr = document.getElementById('inStrTextbox').value;
//   visBin(gotStr);
// }

function visBin(posX, posY, inputBinStr, boxSize, style, fillColor, strokeColor, strokeWidth) { //0 : normal, 1 : hachure

  for (var j = 0; j < inputBinStr.length; j++) {
    var x = (1.5 * (j % 8) + 1) * boxSize + posX;
    var y = (1.5 * Math.floor(j / 8) + 1) * boxSize + posY;

    if (inputBinStr.charAt(j) == "1") {
      if (style == "normal") {
        noStroke();
        fill(fillColor);
        rectMode(CENTER);
        rect(x, y, boxSize, boxSize)
      } else if (style == "hachure") {
        var xCoords = [x - 0.5 * boxSize, x + 0.5 * boxSize, x + 0.5 * boxSize, x - 0.5 * boxSize];
        var yCoords = [y - 0.5 * boxSize, y - 0.5 * boxSize, y + 0.5 * boxSize, y + 0.5 * boxSize];
        var gap = 3.5;
        var angle = 315;
        strokeWeight(strokeWidth * 0.5);
        stroke(fillColor);
        scribble.scribbleFilling(xCoords, yCoords, gap, angle);
      }
    }
    strokeWeight(strokeWidth);
    stroke(strokeColor);
    noFill();
    if (style == "normal") {
      rect(x, y, boxSize, boxSize)
    } else if (style == "hachure") {
      scribble.scribbleRect(x, y, boxSize, boxSize);
    }

  }
}



// check for keyboard events
function keyPressed() {
  console.log(key);
  switch (key) {
    default: break;
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

// // pick a shape
// switch (shape) {

//   case 'circle':
//     // ellipse(x, y, d, d);
//     scribble.scribbleEllipse(x, y, d, d);
//     break;

//   case 'square':
//     rectMode(CENTER);
//     // rect(x, y, d, d);
//     scribble.scribbleRect(x, y, d, d);
//     break;

//   case 'triangle':
//     ngon(3, x, y, d);
//     break;

//   case 'pentagon':
//     ngon(5, x, y, d);
//     break;

//   case 'star':
//     star(6, x, y, d / sqrt(3), d);
//     break;

// }
