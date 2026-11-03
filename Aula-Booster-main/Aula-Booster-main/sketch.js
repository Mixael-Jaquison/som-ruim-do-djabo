var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8
    
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();

    
    //climbersGroup.collide(ghost);
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Fim de Jogo", 230,250)
  }

}

function spawnDoors() {

   
    // ALTERNATIVA 1: Condição de temporização para gerar portas a cada 240 frames
    //  if (frameCount = 240) {          
    //  if (frameRate % 240 === 0) {      
      if (frameCount % 240 === 0) {     
    
    // ALTERNATIVA 2: Criação do sprite da porta
    //  var door = makeSprite(200, -50);  
    //  var door = Sprite(200, -50);     
    var door = createSprite(200, -50);
    
   
    var climber = createSprite(200, 10);
    var invisibleBlock = createSprite(200, 15);
    
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
   
    // ALTERNATIVA 3: Sorteio da posição horizontal aleatória da porta
    //  door.x = random.number(120, 400);          
    //  door.x = Math.round(randomNumber(120, 400));
      door.x = Math.round(random(120, 400));       
   
   

    
    // ALTERNATIVA 4: Alinhamento horizontal do suporte e do bloco com a porta
    //  climber.x = random(120, 400);
    //  climber.x = door.y;            
      climber.x = door.x;            
    
   
    invisibleBlock.x = door.x;
    
   
    // ALTERNATIVA 5: Atribuição da imagem ao sprite
    //  door.setImage(doorImg);       
    //  door.picture = doorImg;       
      door.addImage(doorImg);        
    
    
    climber.addImage(climberImg);
    
    
    // ALTERNATIVA 6: Definição da velocidade vertical constante para descer
    //  door.speedY = 1;              
    //  door.gravity = 1;            
      door.velocityY = 1;          
    
   
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    
    // ALTERNATIVA 7: Ajuste de profundidade visual (camadas de renderização)
    //   door.depth = ghost.depth + 1; 
    //   ghost.layer = door.layer + 1;  
       ghost.depth = door.depth + 1; 
   
   
    ghost.depth += 1;
   
    
    // ALTERNATIVA 8: Definição do tempo de vida para evitar estouro de memória
    //  door.time = 800;             
    //  door.life = 800;              
      door.lifetime = 800;          
    
   
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    // ALTERNATIVA 9: Inclusão dos objetos criados em seus respectivos grupos
    //  doorsGroup.push(door);       
    //  doorsGroup.insert(door);     
      doorsGroup.add(door);        

  
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    
    invisibleBlock.debug = true;                // Torna a caixa de colisão visível para depuração
  }
}

