var keyPressed = {};
var marcadores = [0, 0];
var c1 = "red";
var c2 = "green";
//var c3 = "blue";
var game;
var ctx;
window.onload = function(){
  //Create Canvas
  var canvas = document.getElementById('tutorial');
  ctx = canvas.getContext('2d');
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  //Start the game!
  game  = new Game(ctx);
  game.start();

  //Capture keydown and keyup
  document.onkeydown = function(e){
    keyPressed[e.keyCode] = true;
  };

  document.onkeyup = function(e){
    delete keyPressed[e.keyCode];
  };
};
