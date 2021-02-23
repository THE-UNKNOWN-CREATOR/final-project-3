var gravity = 0.18, environment = [];
let player, groundPlane, plat1;
var change1, pletArr = [], coin = [];
let reset;
var l1 = 1, l2 = 2;
let level = l1;
var len = 1;

let J = {}, load1 = {}, load2 = {};
J.index = [];

function preload()
{
  load1 = loadJSON('loadLevel1.json');
  load2 = loadJSON('loadLevel2.json');
}

function setup() {
  createCanvas(400, 400);
  pletArr = [];
  player = new Player(width/2, height/2);
  
  groundPlane = new Platform(width/2, height-5, width, 10, null);
  
  plat1 = new Platform(100, 370, 40, 10, "green");
  
  change1 = createButton("Change");
  change1.position(0, 0);
  
  reset = createButton("Reset");
  if(level === l1)
    for(var i = 0; i < load1.index.length; i++)
      {
        pletArr.push(new Platform(load1.index[i][0], load1.index[i][1], load1.index[i][2], load1.index[i][3], load1.index[i][4]));
      }
  // else if(level === l2)
  //   // for(var j = 0; j < load2.len; j++)
  //   //   {
  //   //     pletArr = [];
  //   //     pletArr.push(new Platform(load2.index[j][0], load2.index[j][1], load2.index[j][2], load2.index[j][3], load2.index[j][4]));
  //   //   }
  if(level === l1){
    coin.push(new PowerUp("double jump", player, 27.532012932405564, -328.6666666666671));
    coin.push(new PowerUp("rewind", player, 2102.2115015710906, 715.8767297139477));
    coin.push(new PowerUp("advance", player, 1233, -977));
  }
}

var start1, start2, end1, end2, mid1, mid2;
let timm = 0;

function draw() {
  for(var i = 0; i < allSprites; i++){
    allSprites.get(i).destroy();
  }

  background(0);
  player.update();
  player.camFol();
  player.move(6);


  if(level === l1)
  {
    for(var i = 0; i < coin.length; i++)
    {
      coin[i].update();
    }

    if(!shMov)
    {
      timm++;
    }

    if(shMov)
    {
      push();
      fill(255, 0, 0);
      text("Get On The Platform", 50, 200);
      pop();
      if(frameCount > timm+100){
        plat1.move(0, -1, plat1.sprite.x, 550, plat1.sprite.y, -550);
        autoSc();
      }
      if(plat1.y === 500){
        plat1.sprite.velocityY = 0;
      }
    }
  }

  if(level === l2){
    // Next();
  }

  drawSprites();

  if(mouseIsPressed)
  {
    if(mouseButton === LEFT)
    {
      start1 = null;
      start2 = null;
      end1 = null;
      end2 = null;
      mid1 = null;
      mid2 = null;
      start1 = camera.mouseX;
      start2 = camera.mouseY;
    }

    if(mouseButton === RIGHT)
    {
      end1 = camera.mouseX;
      end2 = camera.mouseY;
    }

    if(mouseButton === CENTER)
    {
      mid1 = camera.mouseX;
      mid2 = camera.mouseY;
    }
  }

  reset.mousePressed(Rewind);
  
  change1.mousePressed(function()
  {
    switch (player.c) {
      case "red":
      player.changeColor("green");
        break;
    
      case "green":
      player.changeColor("yellow");
      break;

      case "yellow":
      player.changeColor("red");
      break;

      default:
        break;
    }
  });
}

var col = null;
var l = false;
var sP = false;

function keyPressed()
{
  player.jump();

  if(keyCode === SHIFT)
  {
    col = "red"
  }else if(keyCode === TAB)
  {
    col = "green"
  }else if(keyCode === ALT)
  {
    col = "yellow"
  }else if (keyCode === DELETE)
  {
    col = "yo";
  }else
  {
    col = null;
  }

  if(keyCode === CONTROL)
  {
    switch (player.c) 
    {
      case "red":
      player.changeColor("green");
        break;
    
      case "green":
      player.changeColor("yellow");
      break;

      case "yellow":
      player.changeColor("red");
      break;

      default:
        break;
    }
  }

  if(keyCode === ENTER)
  {
    if(level == l1)
      saveJSON(J, 'loadLevel1.json');
    else if(level === l2)
      saveJSON(J, 'loadLevel2.json');
  }

  if(keyCode === BACKSPACE)
  {
    sP = true;
    l = "double jump";
  }
  else if(keyCode === ESCAPE)
  {
    sP = true;
    l = "rewind";
  }
  else
  {
    sP = false;
    l = null;
  }
}

function mouseReleased()
{
  if(start1 && start2 && end1 && end2 && mid1 && mid2 && !sP){
    var w = dist(start1, start2, end1, end2);
    var h = dist(start1, start2, mid1, mid2);
    pletArr.push(new Platform(start1 + w/2, start2 + h/2, w, h, col, l));

    

    for(var i = 0; i < pletArr.length; i++)
    {
      J.len = len;
      J.index[i] = []
      J.index[i][0] = pletArr[i].sprite.x;
      J.index[i][1] = pletArr[i].sprite.y;
      J.index[i][2] = pletArr[i].sprite.width;
      J.index[i][3] = pletArr[i].sprite.height;
      J.index[i][4] = pletArr[i].c;
      J.index[i][5] = pletArr[i].shoLev;
      len++;
    }
  }
  else if(sP)
  {
    coin.push(new PowerUp(l, player, camera.mouseX, camera.mouseY));
    console.log(camera.mouseX, camera.mouseY);
  }
}

function Rewind()
{
  player.sprite.x = width/2;
  player.sprite.y = height/2;
}

function autoSc()
{
  camera.position.y += 2;
}

function Next(){
  // clearElements();
  level++;
  Rewind();
  setup();
}

function LEVLE(){
  Next();
}