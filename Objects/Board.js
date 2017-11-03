function Board(ctx) {
  this.ctx = ctx ;
  this.x = 0;
  this.y = 0;
  this.img = new Image();
  this.img.src = "./img/floor.jpg";
  this.width = window.innerWidth;
  this.height = window.innerHeight;
};

Board.prototype.drawBoard = function(){
  this.ctx.clearRect(0, 0, this.width, this.height);
  this.ctx.drawImage(this.img, 0, 0, this.width, this.height);
};

Board.prototype.update = function(players, powers, state){
  this.drawBoard();
  players.forEach(function(e){
    e.draw();
  });
  if(state)powers.draw();
};
