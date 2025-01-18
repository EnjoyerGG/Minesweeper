function Cell(i, j, w){
  this.i = i; //列索引
  this.j = j; //行索引
  this.x = i*w; //x坐标
  this.y = j*w; //y坐标
  this.w = w; //格子宽度
  this.neighborCount = 0; //周围地雷数量
  this.bee = false; //是否是地雷
  this.revealed = false; //是否被揭开
  this.flagged = false; //是否被标记为地雷
}

//显示格子内容
Cell.prototype.show = function(){
  stroke(0); //绘制边框
  noFill(); //默认无填充
  rect(this.x, this.y, this.w, this.w); //绘制格子
  
  if(this.flagged){
    //如果被标记为地雷，显示标记
    fill(255, 0, 0);
    textAlign(CENTER);
    text("F", this.x+this.w*0.5, this.y+this.w-6); 
  }else if(this.revealed){
    //如果被揭开
    if(this.bee){
      fill(127);
      ellipse(this.x+this.w*0.5, this.y+this.w*0.5, this.w * 0.5);
    }else{
      fill(200); //显示已揭开的格子
      rect(this.x, this.y, this.w, this.w);
      //当周边有雷的时候才显示雷的个数
      if(this.neighborCount>0){
        textAlign(CENTER);
        fill(0);
        text(this.neighborCount, this.x+this.w*0.5, this.y+this.w-6); //居中显示字数
      }
    }
  }
};

//计算周围地雷数量
Cell.prototype.countBees = function(){
  if(this.bee){
    this.neighborCount = -1;
    return;
  }
  var total = 0;
  for(var xoff=-1; xoff<=1; xoff++){
    for(var yoff=-1; yoff<=1; yoff++){
      var i = this.i + xoff;
      var j = this.j + yoff;
      if(i>-1 && i<cols && j>-1 && j<rows){
        var neighbor = grid[i][j];
        //如果隔壁有雷，则增加数字
        if(neighbor.bee){
          total++;
        }
      }
    }
  }
  //console.log(total);
  this.neighborCount = total;
};

//判断鼠标点击是否在格子内
Cell.prototype.contains = function(x, y){
  return (x>this.x && x<this.x + this.w && y>this.y && y<this.y+this.w);
}

//揭开格子
Cell.prototype.reveal = function(){
  this.revealed = true;
  console.log(this.neighborCount);
  if(this.neighborCount == 0){
    this.floodFill(); //如果周围没有地雷，自动揭开周围的格子
  }
};


//标记或取消标记地雷
Cell.prototype.toggleFlag = function(){
  if(!this.revealed){
    this.flagged = !this.flagged;
  }
};

//自动揭开周围的格子
Cell.prototype.floodFill = function(){
  for(var xoff=-1; xoff<=1; xoff++){
    for(var yoff=-1; yoff<=1; yoff++){
      var i = this.i + xoff;
      var j = this.j + yoff;
      if(i>-1 && i<cols && j>-1 && j<rows){
        var neighbor = grid[i][j];
        if(!neighbor.bee && !neighbor.revealed){
          neighbor.reveal();
        }
      }
    }
  }
};