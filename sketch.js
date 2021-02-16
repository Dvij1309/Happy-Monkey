var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey; 
var monkey_running;
var banana 
var bananaImage;
var obstacle;
var obstacleImage;
var bananaGroup;
var obstaclesGroup;
var score;

var monkey_collided;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  monkey_collided = loadAnimation("sprite_1.png");
 
}



function setup() {
createCanvas(600,600);

  monkey = createSprite(80,385,30,30);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("collided",monkey_collided);
  monkey.scale = 0.2;

  ground = createSprite(0,450,1200,15);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  obstaclesGroup = new Group();
  bananaGroup = new Group();
  
  score = 0;
  
  monkey.setCollider("rectangle",5,5);
  monkey.debug = false;
  
}


function draw() {
  background("white");

  drawSprites();
  
  
  stroke("white");
  textSize(20);
  fill("white");
  
  stroke("black");
  textSize(20);
  fill("black");
  text("score :" + score,100,50);
  score = score + Math.round(frameCount/60);
  
  monkey.collide(ground);
  
  console.log(monkey.y);
  
  if(gameState === PLAY){
  if(ground.x > 0){
  ground.x = ground.width/2;
  }
  
  spawnObstacles();
  SpawnBananas();
  
  if(keyDown("UP_ARROW") && monkey.y >= 200) {
    monkey.velocityY = -12;
    }
  
  monkey.velocityY = monkey.velocityY + 1;
    
  if(bananaGroup.isTouching(monkey)){
  bananaGroup.destroyEach();
  score = score + 50;
  
  }
  
  if(bananaGroup.x > 0){
  score = score - 50;
  }
  
  if(obstaclesGroup.isTouching(monkey)){
  gameState = END;
  
  }
  
  }
  
  else if(gameState === END){
  
  ground.velocityX = 0;
  monkey.changeAnimation("collided",monkey_collided);
  monkey.velocityY = 0;
  
  obstaclesGroup.setVelocityXEach(0);
  bananaGroup.setVelocityXEach(0);
  
  obstaclesGroup.setLifetimeEach(-1);
  bananaGroup.setLifetimeEach(-1);
  
  score = 0;
  
  stroke("white");
  textSize(20);
  fill("white");
  
  stroke("black");
  textSize(20);
  fill("black");
  text(" Press R to restart",150,150);
  
  
  }
  
  if(keyDown("R")){
  reset();
  }
  
    
}

function reset(){

gameState = PLAY;
monkey.changeAnimation("running",monkey_running);
obstaclesGroup.destroyEach();
bananaGroup.destroyEach();

}

function spawnObstacles(){
  if(frameCount % 300 === 0){
  obstacle = createSprite(500,390,20,20);
  obstaclesGroup.add(obstacle);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.3;
  obstacle.velocityX = -(10 + score/100);

  obstacle.lifetime = -60;

  obstacle.depth = monkey.depth;
  monkey.depth = monkey.depth +1; 
}

}

function SpawnBananas(){
  if(frameCount % 80 === 0){
  banana = createSprite(500,150,20,20);
  bananaGroup.add(banana);
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -(8 + score/100);
  banana.y = Math.round(random(80,220));

  banana.lifetime = -75;  

  banana.depth = monkey.depth;
  monkey.depth = monkey.depth +1;
  
}
  
}



