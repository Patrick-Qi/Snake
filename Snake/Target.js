function Target(size, canvasOptions) {
  this.x
  this.y
  this.size = size
  this.canvasOptions = canvasOptions
}

Target.prototype.genRandomLocation = function() {
  const { rows, columns } = this.canvasOptions
  this.x = (Math.floor(Math.random() * columns - 1) + 1) * this.size
  this.y = (Math.floor(Math.random() * rows - 1) + 1) * this.size
}

Target.prototype.draw = function() {
  const { ctx } = this.canvasOptions
  ctx.fillStyle = '#e83333'    //填充目标方块颜色
  ctx.fillRect(this.x, this.y, this.size, this.size)  //方块坐标以及长宽高
}