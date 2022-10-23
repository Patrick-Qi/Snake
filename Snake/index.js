const canvas = document.querySelector('.canvas')
const ctx = canvas.getContext('2d')
const size = 10
const rows = canvas.height / size
const columns = canvas.width / size

const startBtn = document.getElementById('start')
const pauseBtn = document.getElementById('pause')

let snakea = new Snakea(size, { canvas, ctx })
let snakeb = new Snakeb(size, { canvas, ctx })
let target = new Target(size, { canvas, ctx, rows, columns })
let timer = null

function init() {
  target.genRandomLocation()
  target.draw()
  snakea.draw()
  snakeb.draw()
}

init()

function start() {
  timer = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    target.draw()
    snakea.update()
    snakea.draw()
    snakeb.update()
    snakeb.draw()
    if (snakea.eatTarget(target)) {
      target.genRandomLocation()
    }
    if (snakeb.eatTarget(target)) {
      target.genRandomLocation()
    }
    snakeb.checkCollision()
    snakea.checkCollision()
    document.getElementById('score1').innerText = snakea.targetNum
    document.getElementById('score2').innerText = snakeb.targetNum
  }, 150)

}

startBtn.addEventListener('click', () => {
  start()
})

pauseBtn.addEventListener('click', () => {
  clearInterval(timer)
})

window.addEventListener('keydown', (event) => {
  const direction = event.key.replace('Arrow', '')
  snakea.changeDirection(direction)
  snakeb.changeDirection(direction)
})