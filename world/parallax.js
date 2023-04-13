class Layer {
    constructor(image, speedModifier, game) {
        this.game = game
        this.x = 0
        this.y = 0
        this.width = image.width
        this.height = 600
        this.image = image
        this.speedModifier = speedModifier
        this.speed = this.game.gameSpeed * this.speedModifier
    }
    update() {
        this.speed = this.game.gameSpeed * this.speedModifier
        if (this.x <= -this.width || this.x >= this.width) {
            this.x = 0
        }
        this.x = Math.floor(this.x - this.speed)
        // this.x = gameFrame * this.speed % this.width
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x - this.width, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
    }
}

class Parallax {
    constructor(game) {
        this.game = game
        this.layers = []
        this.foregroundLayers = []
        this.draw = this.draw.bind(this)
        this.drawForeground = this.drawForeground.bind(this)
    }

    addLayer(image, speedModifier, isForeground) {
        const img = new Image()
        img.src = image
        if (isForeground) this.foregroundLayers.push(new Layer(img, speedModifier, this.game))
        else this.layers.push(new Layer(img, speedModifier, this.game))
    }

    draw(ctx) {
        this.layers.forEach(layer => {
            layer.update()
            layer.draw(ctx)
        })
    }
    drawForeground(ctx) {
        this.foregroundLayers.forEach(layer => {
            layer.update()
            layer.draw(ctx)
        })
    }
}
export default Parallax
