import Sprite from "./sprite"

const enemyImage = new Image()
enemyImage.src = 'enemy.png'
const enemyAnimationStates = [
    {
        name: "attack",
        frames: 4,
    },
    {
        name: "fly",
        frames: 2,
    },
    {
        name: "hit",
        frames: 2,
    },
    {
        name: "attack",
        frames: 4,
    },
    {
        name: "idle",
        frames: 4,
    },
    {
        name: "walk",
        frames: 4,
    },
]

class Enemy {
    constructor(game) {
        this.game = game
        this.player = this.game.player
        this.sprite = new Sprite(enemyImage, enemyAnimationStates)
        this.sprite.x = Math.random() * 10
        this.sprite.y = Math.random() * 200
        this.sprite.spriteHeight = 64
        this.sprite.spriteWidth = 64
        this.sprite.staggerFrame = 10
        this.sprite.setAnimation('fly')
        this.direction = 1
        this.velocity = 2
        this.sprite.showBox = true
    }
    update() {
        if (this.sprite.x > this.game.width ||
            this.sprite.y > this.game.height ||
            this.sprite.x < 0 ||
            this.sprite.y < 0) {
            this.direction = -this.direction
        }
        this.sprite.x += (Math.random() - 0.2) * 2 * this.velocity * this.direction
        this.sprite.y += (Math.random() - 0.2) * 2 * this.velocity * this.direction
        if (
            this.sprite.x < this.player.x + this.player.sprite.spriteWidth &&
            this.sprite.x + this.sprite.spriteWidth > this.player.x &&
            this.sprite.y < this.player.y + this.player.sprite.spriteHeight &&
            this.sprite.spriteHeight + this.sprite.y > this.player.y
        ) {
            // Collision detected!
            console.log("collision")
            this.player.sprite.showBox = true
        } else {
            // No collision
            if (this.player.sprite.showBox) (
                this.player.sprite.showBox = false
            )
        }
    }
    draw(context) {
        this.sprite.draw(context)
    }
}

export default Enemy