function Game(ctx) {
  this.board = new Board(ctx);
  this.powers = new Powerups(ctx);
  this.players = [
    new Player (ctx, keyPressed, c1),
    new Player (ctx, keyPressed, c2)
    //new Player (ctx, keyPressed, c3)
  ];
  this.sounds = new Sounds();
};

Game.prototype.start = function(){

  var counter = 0;
  var state = false;
  setInterval(function(){
    this.playerControls(keyPressed, this.players[0], this.players[1], this.players[2]);
    this.board.update(this.players, this.powers, state);
    for(var a = 0; a < this.players.length; a++){
      for(var b = a + 1; b < this.players.length; b++){
        this.isOverlapping(this.players[a], this.players[b]);
      }
      this.removePlayer(this.players[a], this.board);
      if(this.players[a].lifes == 0)this.players.splice(a, 1);
      if(state)state = this.catchPower(this.players[a], this.powers, state);
    }
    //When state is true, counter not count
    if(counter == 300){
      state = true;
      counter = 0;
    }
    if(!state)counter ++;

    //Check if someone wins
    this.endGame(this.players);
  }.bind(this), 1000/24);

};

Game.prototype.playerControls = function(keyPressed, player1, player2) {

  //Player 1
  if(keyPressed[87])player1.moveUp();
  if(keyPressed[83])player1.moveDown();
  if(keyPressed[68])player1.moveRight();
  if(keyPressed[65])player1.moveLeft();
  if(keyPressed[32])player1.dash();

  //Player 2
  if(keyPressed[38])player2.moveUp();
  if(keyPressed[40])player2.moveDown();
  if(keyPressed[39])player2.moveRight();
  if(keyPressed[37])player2.moveLeft();
  if(keyPressed[96])player2.dash();

  //Player 2
  //if(keyPressed[85])player2.moveUp();
  //if(keyPressed[74])player2.moveDown();
  //if(keyPressed[75])player2.moveRight();
  //if(keyPressed[72])player2.moveLeft();
  //if(keyPressed[76])player2.dash();

};

Game.prototype.isOverlapping = function(ball1, ball2){

  if(ball1.x + ball1.radius > ball2.x
  && ball1.x < ball2.x + ball1.radius + ball2.radius
  && ball1.y + ball1.radius + ball2.radius > ball2.y
  && ball1.y < ball2.y + ball1.radius + ball2.radius){

    this.collision(ball1, ball2);
  }
};

Game.prototype.collision = function(ball1, ball2){

  this.sounds.play(4);

  //Valores delta de posiciones x e y
  var dx = ball1.x - ball2.x;
  var dy = ball1.y - ball2.y;

  //Suma de los cuadrados de dichos deltas
  var len = (dx * dx) + (dy * dy);

  //Suma de los radios
  var min = ball1.radius + ball2.radius;

  //Delta de dichos radios
  var minDelta = min * min;

  //Arcotangente de las posiciones delta
  var aTheta = Math.atan2(dy, dx);

  if(len < minDelta){

    var dist = Math.sqrt(len);

    var fact = (dist - min) / dist;
    ball1.x -= dx * fact * 0.5;
    ball1.y -= dy * fact * 0.5;
    ball2.x += dx * fact * 0.5;
    ball2.y += dy * fact * 0.5;

    //Pitágoras (Raíz de la suma de los cuadrados)
    var v1 = Math.sqrt(Math.pow(ball1.vx, 2) + Math.pow(ball1.vy, 2));
    var v2 = Math.sqrt(Math.pow(ball2.vx, 2) + Math.pow(ball2.vy, 2));

    //Arcotangente de las posiciones
    var a1 = Math.atan2(ball1.vy, ball1.vx);
    var a2 = Math.atan2(ball2.vy, ball2.vx);

    //Producto de pitágoras por coseno y seno de la sustracción del arcotangente delta anterior al arcotante de las posiciones
    var rvx1 = v1 * Math.cos(a1 - aTheta);
    var rvy1 = v1 * Math.sin(a1 - aTheta);
    var rvx2 = v2 * Math.cos(a2 - aTheta);
    var rvy2 = v2 * Math.sin(a2 - aTheta);

    //Se incluyen las masas a las operaciones
    var evx1 = ((ball1.mass - ball2.mass) * rvx1 + (ball2.mass + ball2.mass) * rvx2) / (ball1.mass + ball2.mass);
    var evx2 = ((ball1.mass + ball1.mass) * rvx1 + (ball2.mass - ball1.mass) * rvx2) / (ball1.mass + ball2.mass);
    var evy1 = rvy1;
    var evy2 = rvy2;

    //Posición final
    ball1.vx = Math.cos(aTheta) * evx1 + Math.cos(aTheta + Math.PI / 2) * evy1;
    ball1.vy = Math.sin(aTheta) * evx1 + Math.sin(aTheta + Math.PI / 2) * evy1;
    ball2.vx = Math.cos(aTheta) * evx2 + Math.cos(aTheta + Math.PI / 2) * evy2;
    ball2.vy = Math.sin(aTheta) * evx2 + Math.sin(aTheta + Math.PI / 2) * evy2;

  }
};

Game.prototype.catchPower = function(ball, power, state){

  if(ball.x + ball.radius > power.x
  && ball.x < power.x + ball.radius + power.radius
  && ball.y + ball.radius + power.radius > power.y
  && ball.y < power.y + ball.radius + power.radius){
    power.choosePower(~~(Math.random() * 5), ball);
    return false;
  } else{
    return true;
  }

};

Game.prototype.removePlayer = function(ball, board){
  if(ball.x + ball.radius > board.width + 500
  || ball.x + ball.radius < board.x - 500
  || ball.y + ball.radius > board.height + 500
  || ball.y + ball.radius < board.y - 500){

    this.sounds.play(0);

    ball.lifes--;
    if(ball.lifes > 0){
      ball.x = Math.random() * (1000 - 200) + 200;
      ball.y = Math.random() * (1000 - 200) + 200;
      ball.vx = 0;
      ball.vy = 0;
    }
  }
};

Game.prototype.endGame = function(players){
  if(players.length == 1){
    var player = players[0];
    var counter = 0;
    var t = setInterval(function(){
      if(counter == 9){
        player.color == "red" ? marcadores[0]++ : marcadores[1]++;
        alert(player.color + " winner!\n\n" + "Marcador - Red: " + marcadores[0] + " | Green: " + marcadores[1]);
        game.repeat();
      }
      counter ++;
    }, 1000);
    this.sounds.play(2);
    players.splice(0);
  }
};

Game.prototype.repeat = function(){
  this.players.push(new Player (ctx, keyPressed, c1),
  new Player (ctx, keyPressed, c2));
};
