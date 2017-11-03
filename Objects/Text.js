function Text(players){
  this.ctx = ctx ;
  this.x = 0;
  this.y = 0;
  this.players = players;
}

Text.prototype.write = function(){
  ctx.font = "40px Permanent Marker";
  ctx.fillText("PJ1 - Red: " + this.players[0].lifes + " -- PJ2 - Green: " + this.players[1].lifes + " | EARLY ACCES v0.2", 10, 50);
};
