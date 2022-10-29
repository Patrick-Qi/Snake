const canvas = document.querySelector('.canvas')
const ctx = canvas.getContext('2d')
const size = 20     //定义方块大小
const rows = canvas.height / size
const columns = canvas.width / size       //定义行数和列数
var img = new Image();
img.src = "./img/head0.png";
img.onload = function()
{
  //var pat = ctx.createPattern(img,"repeat");
  //ctx.fillStyle=pat;
  //ctx.fillRect(100,100,100,100);
  ctx.drawImage(img,0,0,20,20)
}
const startBtn = document.getElementById('start')
const pauseBtn = document.getElementById('pause')
let snake = new Snake(size, { canvas, ctx })
let target = new Target(size, { canvas, ctx, rows, columns })
let timer = null
function init()
{
  target.genRandomLocation()    //随机生成一个食物块
  target.draw()
  snake.draw()
}
init()
function start()
{
  clearInterval(timer);
  timer = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height) //清空画布
    target.draw()
    snake.update()
    snake.draw()    //重新绘画蛇体以及食物块

    if (snake.eatTarget(target))//判断是否吃到食物
    {
      target.genRandomLocation()
    }
    snake.checkCollision()
    document.getElementById('score').innerText = snake.targetNum    //分数
  }, 150)
}
startBtn.addEventListener('click', () => {
  start()     //判断是否按下start按钮
})
pauseBtn.addEventListener('click', () => {
  clearInterval(timer)      //判断是否按下pause按钮，如果按下则暂停
})
window.addEventListener('keydown', (event) => {     //判断键盘按下的键
  const direction = event.key.replace('Arrow', '')
  snake.changeDirection(direction)    
})