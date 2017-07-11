var p5_1_f = function(p){
  p.setup = function(){
    p.createCanvas(640, 480);
  };

  p.draw = function(){
    p.fill(0);
    p.ellipse(50, 50, 80, 80);
  };
};
var p5_1 = new p5(p5_1_f, 'p5canvas_1');

var p5_2_f = function(p){
  p.setup = function(){
    p.createCanvas(640, 480);
  };

  p.draw = function(){
    p.fill(255);
    p.stroke(0);
    p.ellipse(50, 50, 80, 80);
  };
};
var p5_2 = new p5(p5_2_f, 'p5canvas_2');

