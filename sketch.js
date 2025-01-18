//Minesweeper

//创建棋盘
function make2DArray(cols, rows){
  var arr = new Array(cols);
  for(var i=0; i<arr.length; i++){
    arr[i] = new Array(rows);
  }
  return arr;
}



var grid; //保存所有格子
var cols; //网格列数
var rows; //网格行数
var w = 20; //每个格子宽度
var totalBees = 20; //地雷数目

function setup(){
  createCanvas(401, 401);
  cols = floor(width / w); //计算列数
  rows = floor(height / w); //计算行数
  grid = make2DArray(cols, rows); //初始化网格
  for(var i=0; i<cols; i++){
    for(var j=0; j<rows; j++){
      grid[i][j] = new Cell(i, j, w); //初始化每个格子
    }
  }
  
  //随机选择地雷位置
  var options = [];
  for(var i=0; i<cols; i++){
    for(var j=0; j<rows; j++){
      options.push([i, j]); //将所有格子添加为可选地雷位置
    }
  }
  
  //放置地雷
  for(var n=0; n<totalBees; n++){
    var index = floor(random(options.length));
    
    var choice = options[index];
    var i = choice[0];
    var j = choice[1];

    options.splice(index, 1); //从选项中移除已放置地雷的位置
    grid[i][j].bee = true; //设置地雷
  }
  
  //计算每个格子周围的地雷数量
  for(var i=0; i<cols; i++){
    for(var j=0; j<rows; j++){
      grid[i][j].countBees(); 
    }
  }
}

//游戏结束，显示所有格子
function gameOver(){
  for(var i=0; i<cols; i++){
    for(var j=0; j<rows; j++){
      grid[i][j].revealed = true; //踩雷就显示所有情况
    }
  }
}

//鼠标交互
function mousePressed(){
  for(var i=0; i<cols; i++){
    for(var j=0; j<rows; j++){
      if(grid[i][j].contains(mouseX, mouseY)){
        if(mouseButton === LEFT){
          grid[i][j].reveal();
          if(grid[i][j].bee){
            gameOver(); //踩雷，游戏结束
          }
        }else if(mouseButton === RIGHT){
          grid[i][j].toggleFlag();
        }
      }
    }
  }
}


function draw(){
  //绘制网格
  background(255);
  for(var i=0; i<cols; i++){
    for(var j=0; j<rows; j++){
      grid[i][j].show();
    }
  }
}