//canvas 1
var p5_1_f = function(p) {
  p.setup = function() {
    // p.createCanvas(
    //   document.getElementById("p5canvas_1").getAttribute("width"),
    //   document.getElementById("p5canvas_1").getAttribute("height")
    // );
    p.createCanvas(p.windowWidth, p.windowHeight);
  };
  p.draw = function() {
    p.stroke(0);
    p.fill(255);
    p.rect(0, 0, p.width, p.height);
    p.fill(0);
    p.ellipse(50, 50, 80, 80);
  };
};
var p5_1 = new p5(p5_1_f, 'p5canvas_1');

//canvas 2
var p5_2_f = function(p) {
  p.setup = function() {
    p.createCanvas(
      document.getElementById("p5canvas_2").getAttribute("width"),
      document.getElementById("p5canvas_2").getAttribute("height")
    );
  };

  p.draw = function() {
    p.stroke(0); 
    p.fill(255);
    p.rect(0, 0, p.width, p.height);
    p.fill(255);
    p.stroke(0);
    p.ellipse(50, 50, 80, 80);
  };
};
var p5_2 = new p5(p5_2_f, 'p5canvas_2');