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

  // Don't loop automatically
  // noLoop();

  scribble = new Scribble();
}


function draw() {
  clear(); // clear all

  // //afterEbit extract_bits left
  // textSize(radius / 2);
  // noStroke();
  // fill(inFillColor);
  // textAlign(LEFT, TOP);
  // var textStr = str(afterEbit) + " " + afterEbit.length + "\n";
  // text(textStr, 5, 5);

  // //watermark detected_watermark
  // textSize(radius / 2);
  // noStroke();
  // fill(outFillColor);
  // textAlign(LEFT, TOP);
  // var textStr = str(afterWmark) + " " + afterWmark.length + "\n";
  // for (var i = 0; i < afterWmark.length; i++) {
  //   textStr += afterWmark.charCodeAt(i).toString(2) + " ";
  //   if (i % 5 == 4) textStr += "\n";
  // }
  // text(textStr, 5 + windowWidth / 2, 5);
  // var textStrHeight = (textStr.split("\n").length + 1) * radius / 2;

  // var afterWmarkBinStr = "";
  // for (var i = 0; i < afterWmark.length; i++) {
  //   if (afterWmark.charCodeAt(i).toString(2).length > 8) afterWmarkBinStr += ('0000000000000000' + afterWmark.charCodeAt(i).toString(2)).slice(-16);
  //   else afterWmarkBinStr += ('00000000' + afterWmark.charCodeAt(i).toString(2)).slice(-8);
  // }

  // visBin(windowWidth / 2, textStrHeight, afterWmarkBinStr, radius, visBinStyle, outFillColor, outStrokeColor, strokeWidth);

  drawBars(
    10, 
    0, 
    windowWidth * 0.8, 
    windowHeight * 0.40, 
    afterDlist, afterEbit, radius, visBinStyle, inFillColor, inStrokeColor, strokeWidth);
  drawBars(
    10, 
    0 + windowHeight * 0.45, 
    windowWidth * 0.8, 
    windowHeight * 0.40, 
    prevDlist, prevEbit, radius, visBinStyle, outFillColor, outStrokeColor, strokeWidth);
}

function drawBars(posX, posY, posW, posH, list, ebit, boxSize, style, fillColor, strokeColor, strokeWidth) { //0 : normal, 1 : hachure
  stroke(strokeColor);
  rect(posX, posY, posW, posH)
  noStroke;

  var maxValue = 0;
  for (var j in list) { //get maximum value in list
    if (maxValue < list[j]) maxValue = list[j];
  }

  rectMode(CORNER);
  for (var j in list) {
    var w = posW / (list.length * 1.5);
    var h = posH * 0.95 * list[j] / maxValue;
    var x = (1.5 * j + 0.25) * w + posX;
    var y = posY + (posH - h);

    //text
    noStroke();
    fill(fillColor);
    textSize(w/2);
    textAlign(CENTER, BOTTOM);
    text(list[j], x + w / 2, y);
    textAlign(CENTER, TOP);
    text(ebit.charAt(j), x + w / 2, y + h);

    //fill
    if(ebit.charAt(j) == '1'){
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

function visBin(posX, posY, afterEbitBinStr, boxSize, style, fillColor, strokeColor, strokeWidth) { //0 : normal, 1 : hachure
  rectMode(CENTER);

  for (var j = 0; j < afterEbitBinStr.length; j++) {
    var x = (1.5 * (j % 8) + 1) * boxSize + posX;
    var y = (1.5 * Math.floor(j / 8) + 1) * boxSize + posY;

    if (afterEbitBinStr.charAt(j) == "1") {
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
