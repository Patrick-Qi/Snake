function Snake(size = 10, canvasOptions)
{
    this.x = 0
    this.y = 0
    this.size = size
    this.xSpeed = size * 1
    this.ySpeed = 0
    this.targetNum = 0
    this.tails = []
    this.canvasOptions = canvasOptions
  }
  //var img = new Image();
  //img.src = "./head.png";
  //img.onload = function(){
      //var pat = ctx.createPattern(img,"repeat");
      //ctx.fillStyle=pat;
      //ctx.fillRect(100,100,100,100);
      //ctx.drawImage(img,100,100,10,10)
  //}
  Snake.prototype.draw = function()
  {
    const { ctx } = this.canvasOptions
    var img1 = new Image();  //创建一个图片对象
    img1.src = "./img/head0.png";
    var img2 = new Image();  //创建一个图片对象
    img2.src = "./img/body.png";
    //ctx.fillStyle = '#fff'
    for (let i = 0; i < this.tails.length; i++)//画出蛇每个身体方块
    {
      const { x, y } = this.tails[i]
      //ctx.fillRect(x, y, this.size, this.size)
      ctx.drawImage(img2,x,y,this.size,this.size);//画出身体
    }
    ctx.drawImage(img1,this.x,this.y,this.size,this.size);//画出头部
    //ctx.fillRect(this.x, this.y, this.size, this.size)
  }
  Snake.prototype.update = function()
  {
    for (let i = 0; i < this.tails.length - 1; i++)
    {
      this.tails[i] = this.tails[i + 1]     //更新此刻蛇的位置
    }
  
    if (this.targetNum > 0)
    {
      this.tails[this.targetNum - 1] = { x: this.x, y: this.y }
    }
    this.x += this.xSpeed
    this.y += this.ySpeed
    const { width, height } = this.canvasOptions.canvas
    if (this.x > width-size||this.y > height -size || this.x < 0 || this.y < 0) {    //判断是否撞墙
      var info="Gameover you score is " + this.targetNum;
        alert(info);
        clearInterval(timer);
        location.reload();
    }
  }
  Snake.prototype.changeDirection = function(direction)//改变方向函数
  {
    switch(direction)
    {
      case 'Up':
        this.xSpeed = 0
        this.ySpeed = -size * 1
        break
      case 'Down':
        this.xSpeed = 0
        this.ySpeed = size * 1
        break
      case 'Left':
        this.xSpeed = -size * 1
        this.ySpeed = 0
        break
      case 'Right':
        this.xSpeed = size * 1
        this.ySpeed = 0
        break
    }
  }
  Snake.prototype.eatTarget = function(target)
  {
    if (this.x === target.x && this.y === target.y)
    {
      this.targetNum++
      return true
    }
    return false
  }
  Snake.prototype.checkCollision = function()
  {
    for (let i = 0; i < this.tails.length; i++)
    {
      if (this.x === this.tails[i].x && this.y === this.tails[i].y)
      {
        var info="Gameover you score is " + this.targetNum
        alert(info)
        location.reload();
      }
    }
  }