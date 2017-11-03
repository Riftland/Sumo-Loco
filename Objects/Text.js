function Text(players){
  this.ctx = ctx ;
  this.players = players;
}

Text.prototype.write = function(){
  ctx.font = "40px Permanent Marker";
  ctx.fillStyle = "black";
  ctx.fillText("PJ1 - Red: " + this.players[0].lifes + " -- PJ2 - Green: " + this.players[1].lifes + " | EARLY ACCES v0.2", 10, 50);
};
