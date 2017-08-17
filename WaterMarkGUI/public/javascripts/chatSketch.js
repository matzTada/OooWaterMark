//communication 
var socket = io();

var afterEbit = 'afterEbit';
var afterWmark = 'afterWmark';
var afterDlist = [];

var prevEbit = 'prevEbit';
var prevWmark = 'prevWmark';
var prevDlist = [];


// gui
var gui;

var scribble;
var drawVisBin = true;
var drawDiff = true;
var visBinStyle = ["normal", "hachure"];

var inFillColor = '#00ffff';
var inStrokeColor = '#00ddff';
var outFillColor = '#c9f600';
var outStrokeColor = '#a9cd07';
var diffFillColor = '#FC9CA1';
var diffStrokeColor = '#E33232';

var radius = 40;
var strokeWidth = 2;
// var shape = ['circle', 'triangle', 'square', 'pentagon', 'star'];

// add contents to HTML element when receive event called "chat"
socket.on('after', function(chat) {
  //added for processing.js visualizing
  afterEbit = chat.extract_bits;
  afterWmark = chat.detected_watermark;
  afterDlist = chat.data_list;
});

socket.on('prev', function(chat) {
  //added for processing.js visualizing
  prevEbit = chat.extract_bits;
  prevWmark = chat.detected_watermark;
  prevDlist = chat.data_list;
});


function setup() {
  var tmpCanvas = createCanvas(windowWidth, windowHeight);
  tmpCanvas.parent("p5canvas");

  // Create Shape GUI
  gui = createGui('Style', width - 220, 0);
  colorMode(HSB);
  // gui.addGlobals('shape');
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
  gui.addGlobals('diffStrokeColor');

  gui.hide();

  // Don't loop automatically
  // noLoop();

  scribble = new Scribble();
}


function draw() {
  clear(); // clear all

  push();
  fill(inFillColor);
  noStroke();
  textAlign(CENTER, CENTER);
  translate(windowWidth * 0.02, windowHeight * (0 + 0.25)/2);
  rotate(-PI/2);
  textSize(windowWidth * 0.02);
  text('Before', 0, 0);
  pop();

  drawBars(
    windowWidth * 0.05,
    0,
    windowWidth * 0.90,
    windowHeight * 0.25,
    prevDlist, prevEbit, radius, visBinStyle, inFillColor, inStrokeColor, strokeWidth);

  push();
  fill(outFillColor);
  noStroke();
  textAlign(CENTER, CENTER);
  translate(windowWidth * 0.02, windowHeight * (0.30 + 0.55)/2);
  rotate(-PI/2);
  textSize(windowWidth * 0.02);
  text('Watermarked', 0, 0);
  pop();
 
  drawBars(
    windowWidth * 0.05,
    0 + windowHeight * 0.30,
    windowWidth * 0.90,
    windowHeight * 0.25,
    afterDlist, afterEbit, radius, visBinStyle, outFillColor, outStrokeColor, strokeWidth);

  push();
  fill(diffFillColor);
  noStroke();
  textAlign(CENTER, CENTER);
  translate(windowWidth * 0.02, windowHeight * (0.65 + 0.85)/2);
  rotate(-PI/2);
  textSize(windowWidth * 0.02);
  text('Detected', 0, 0);
  pop();
 
  var afterWmarkBinStr = "";
  for (var i = 0; i < afterWmark.length; i++) {
    if (afterWmark.charCodeAt(i).toString(2).length > 8) afterWmarkBinStr += ('0000000000000000' + afterWmark.charCodeAt(i).toString(2)).slice(-16);
    else afterWmarkBinStr += ('00000000' + afterWmark.charCodeAt(i).toString(2)).slice(-8);
  }

  visBin(
    windowWidth * 0.05,
    0 + windowHeight * 0.65,
    windowWidth * 0.90,
    windowHeight * 0.2,
    afterWmarkBinStr, radius, visBinStyle, diffFillColor, diffStrokeColor, strokeWidth);
}

function drawBars(posX, posY, posW, posH, list, ebit, boxSize, style, fillColor, strokeColor, strokeWidth) { //0 : normal, 1 : hachure
  // stroke(strokeColor);
  // rectMode(CORNER);
  // rect(posX, posY, posW, posH)
  // noStroke;

  var dataSize = 32;
  // var dataSize = list.length;

  var maxValue = 0;
  //get maximum value in list
  for (var j = 0; j < dataSize; j++) {
    if (maxValue < list[j]) maxValue = list[j];
  }

  rectMode(CORNER);
  for (var j = 0; j < dataSize; j++) {
    var w = posW / (dataSize * 1.5);
    var h = posH * 0.90 * list[j] / maxValue;
    var x = (1.5 * j + 0.25) * w + posX;
    var y = posY + (posH - h);

    //text
    noStroke();
    fill(fillColor);
    textSize(w / 2);
    textAlign(CENTER, BOTTOM);
    text(String(list[j]), x + w / 2, y);
    textAlign(CENTER, TOP);
    text(ebit.charAt(j), x + w / 2, y + h);

    //fill
    if (ebit.charAt(j) == '1') {
      if (style == "normal") {
        noStroke();
        fill(fillColor);
        rect(x, y, w, h)
      } else if (style == "hachure") {
        var xCoords = [x, x + w, x + w, x];
        var yCoords = [y, y, y + h, y + h];
        var gap = 3.5;
        var angle = 315;
        strokeWeight(strokeWidth * 0.5);
        stroke(fillColor);
        scribble.scribbleFilling(xCoords, yCoords, gap, angle);
      }
    }

    //rect
    strokeWeight(strokeWidth);
    stroke(strokeColor);
    noFill();
    if (style == "normal") {
      rect(x, y, w, h)
    } else if (style == "hachure") {
      scribble.scribbleRect(x + w / 2, y + h / 2, w, h);
    }

  }
}

function visBin(posX, posY, posW, posH, binStr, boxSize, style, fillColor, strokeColor, strokeWidth) { //0 : normal, 1 : hachure
  rectMode(CORNER);

  for (var j = 0; j < binStr.length; j++) {
    var boxSize = posW / (1.5 * binStr.length);
    var x = (0.25 + 1.5 * j) * boxSize + posX;
    var y = posY;

    if ((j + 1) % 8 == 0) {
      var startx = x - (7 * 1.5 + 0.125) * boxSize;
      var endx = x + (1.0 + 0.125) * boxSize;
      // var infoy = y + (2 + j / 8) * boxSize;
      var infoy = y + (3) * boxSize;
      stroke(strokeColor);
      line(startx, infoy, endx, infoy);
      stroke(fillColor);
      line(startx, infoy, startx, infoy - boxSize/2);
      line(endx, infoy, endx, infoy - boxSize/2);

      //text
      noStroke();

      fill(fillColor);
      textSize(boxSize);
      textAlign(CENTER, BOTTOM);
      text(afterWmark.charCodeAt(Math.floor(j / 8)), 
        (startx + endx) / 2, 
        infoy);

      fill(strokeColor);
      textSize(boxSize * 2.5);      
      textAlign(CENTER, TOP);
      text(afterWmark.charAt(Math.floor(j / 8)), 
        (startx + endx) / 2, 
        infoy);

    }

    if (binStr.charAt(j) == "1") {
      if (style == "normal") {
        noStroke();
        fill(fillColor);
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

function visBinPast(posX, posY, posW, posH, binStr, boxSize, style, fillColor, strokeColor, strokeWidth) { //0 : normal, 1 : hachure
  rectMode(CORNER);

  for (var j = 0; j < binStr.length; j++) {
    var x = (1.5 * (j % 8)) * boxSize + posX;
    var y = (1.5 * Math.floor(j / 8)) * boxSize + posY;

    if ((j + 1) % 8 == 0) {
      //text
      noStroke();
      fill(fillColor);
      textSize(boxSize);
      textAlign(LEFT, CENTER);
      text(afterWmark.charCodeAt(Math.floor(j / 8)) + " " + afterWmark.charAt(Math.floor(j / 8)), 
        x + boxSize * 1.5, 
        y + boxSize * 0.5);
    }

    if (binStr.charAt(j) == "1") {
      if (style == "normal") {
        noStroke();
        fill(fillColor);
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
