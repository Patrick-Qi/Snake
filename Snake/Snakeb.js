function Snakeb(size = 10, canvasOptions) {
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
  
  Snakeb.prototype.draw = function() {
    const { ctx } = this.canvasOptions
    ctx.fillStyle = '#00FFFF'
  
    for (let i = 0; i < this.tails.length; i++) {
      const { x, y } = this.tails[i]
      ctx.fillRect(x, y, this.size, this.size)
    }
  
    ctx.fillRect(this.x, this.y, this.size, this.size)
  }
  
  Snakeb.prototype.update = function() {
    for (let i = 0; i < this.tails.length - 1; i++) {
      this.tails[i] = this.tails[i + 1]
    }
  
    if (this.targetNum > 0) {
      this.tails[this.targetNum - 1] = { x: this.x, y: this.y }
    }
  
    this.x += this.xSpeed
    this.y += this.ySpeed
  
    const { width, height } = this.canvasOptions.canvas
  
    if (this.x > width) {
      this.x = 0
    }
  
    if (this.y > height) {
      this.y = 0
    }
  
    if (this.x < 0) {
      this.x = width
    }
  
    if (this.y < 0) {
      this.y = height
    }
  }
  
  Snakeb.prototype.changeDirection = function(direction) {
    switch(direction) {
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
  
  Snakeb.prototype.eatTarget = function(target) {
    if (this.x === target.x && this.y === target.y) {
      this.targetNum++
      return true
    }
    return false
  }
  
  Snakeb.prototype.checkCollision = function() {
    for (let i = 0; i < this.tails.length; i++) {
      if (this.x === this.tails[i].x && this.y === this.tails[i].y) {
        this.targetNum = 0
        this.tails = []
      }
    }
  }