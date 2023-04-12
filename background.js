const canvas = document.getElementById('canvas2')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 960;

let gameSpeed = 1
// let gameFrame = 0

const showGameSpeed = document.getElementById('showGameSpeed')
showGameSpeed.innerHTML = gameSpeed

const slider = document.getElementById('gameSpeedSlider')
slider.value = gameSpeed
slider.addEventListener('change', function (e) {
    gameSpeed = e.target.value
    showGameSpeed.innerHTML = gameSpeed
})

class Layer {
    constructor(image, speedModifier) {
        this.x = 0
        this.y = 0
        this.width = 1280
        this.height = 960
        this.image = image
        this.speedModifier = speedModifier
        this.speed = gameSpeed * this.speedModifier
    }
    update() {
        this.speed = gameSpeed * this.speedModifier
        if (this.x <= -this.width) {
            this.x = 0
        }
        this.x = Math.floor(this.x - this.speed)
        // this.x = gameFrame * this.speed % this.width
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
    }
}

class Parallax {
    constructor() {
        this.layers = []
        this.update = this.update.bind(this)
    }

    addLayer(image, speedModifier) {
        const img = new Image()
        img.src = image
        this.layers.push(new Layer(img, speedModifier))
    }

    update() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        this.layers.forEach(layer => {
            layer.update()
            layer.draw()
        })
        requestAnimationFrame(this.update)
    }
}
export default Parallax
