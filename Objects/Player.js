function Player(ctx, keysPressed, color){
  this.ctx = ctx;
  this.keysPressed = keysPressed;
  this.x = Math.random() * 1000;
  this.y = Math.random() * 1000;
  this.radius = 30;
  this.mass = this.radius * 0.5;
  this.vx = 0;
  this.vy = 0;
  this.lifes = 3;
  this.color = color;
  this.speed = 0.5;
}

Player.prototype.draw = function(){
  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
  this.ctx.closePath();
  this.ctx.fillStyle = this.color;
  this.ctx.fill();
  this.moveX(this.vx);
  this.moveY(this.vy);
};

Player.prototype.moveX = function(vX){
  this.x += vX;
};

Player.prototype.moveY = function(vY){
  this.y += vY;
};

Player.prototype.moveUp = function(){
  this.vy -= this.speed;
};

Player.prototype.moveRight = function(){
  this.vx += this.speed;
};

Player.prototype.moveDown = function(){
  this.vy += this.speed;
};

Player.prototype.moveLeft = function(){
  this.vx -= this.speed;
};

Player.prototype.dash = function(){
  this.vx *= 2;
  this.vy *= 2;
  setTimeout(function(){
    this.vx /= 2;
    this.vy /= 2;
  }.bind(this), 100);
};
