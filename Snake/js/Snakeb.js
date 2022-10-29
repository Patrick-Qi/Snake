function Snakeb(size = 10, canvasOptions)
{
    const { width, height } = canvasOptions.canvas
    this.x = width-size
    this.y = height-size
    this.size = size
    this.xSpeed = -size * 1
    this.ySpeed = 0
    this.targetNum = 0
    this.tails = []
    this.canvasOptions = canvasOptions
  }
  Snakeb.prototype.draw = function()
  {
    const { ctx } = this.canvasOptions
    var img1 = new Image();  //创建一个图片对象
    img1.src = "./img/head2.png";
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
  Snakeb.prototype.update = function()
  {
    for (let i = 0; i < this.tails.length - 1; i++)
    {
      this.tails[i] = this.tails[i + 1]
    }
    if (this.targetNum > 0)
    {
      this.tails[this.targetNum - 1] = { x: this.x, y: this.y }
    }
    this.x += this.xSpeed
    this.y += this.ySpeed
    const { width, height } = this.canvasOptions.canvas
    if (this.x > width-size||this.y > height-size||this.x < 0 || this.y < 0)
    {
      if(snakea.targetNum>snakeb.targetNum)
        {
          alert('snakea win!!!')
        }
        else if(snakeb.targetNum>snakea.targetNum)
        {
          alert('snakeb win!!!')
        }
        else
        {
          alert('gameover and no winner')
        }
        clearInterval(timer);
        location.reload();
    }
  }
  Snakeb.prototype.changeDirection = function(direction)
  {
    switch(direction)
    {
      case 'w':
        this.xSpeed = 0
        this.ySpeed = -size * 1
        break
      case 's':
        this.xSpeed = 0
        this.ySpeed = size * 1
        break
      case 'a':
        this.xSpeed = -size * 1
        this.ySpeed = 0
        break
      case 'd':
        this.xSpeed = size * 1
        this.ySpeed = 0
        break
    }
  }
  Snakeb.prototype.eatTarget = function(target)
  {
    if (this.x === target.x && this.y === target.y)
    {
      this.targetNum++
      return true
    }
    return false
  }
  Snakeb.prototype.checkCollision = function()
  {
    for (let i = 0; i < this.tails.length; i++)
    {
      if (this.x === this.tails[i].x && this.y === this.tails[i].y)
      {
      alert('snakea kill itself and snakeb win!')
      location.reload();
      }
    }
  }