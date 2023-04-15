import AnimatedSprite from "./animated-sprite"
import { checkCollision } from '../utils'
const enemyImage = new Image()
enemyImage.src = '/sprites/entities/enemy.png'
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
        this.sprite = new AnimatedSprite(enemyImage, enemyAnimationStates)
        this.sprite.x = Math.random() * this.game.width
        this.sprite.y = Math.random() * (this.game.height / 4)
        this.sprite.spriteHeight = 42
        this.sprite.spriteWidth = 64
        this.sprite.staggerFrame = 10
        // this.sprite.showBox = true
        this.sprite.setAnimation('fly')
        this.directionRatioX = 1
        this.directionRatioY = 1
        this.velocity = .4

        this.alive = true
        this.attacking = false
        this.attackRange = 100
    }

    attackPlayer() {
        this.alive = false
        this.player.getHit()
    }

    detectCollision() {
        if (
            this.sprite.x < this.player.x + this.player.sprite.spriteWidth &&
            this.sprite.x + this.sprite.spriteWidth > this.player.x &&
            this.sprite.y < this.player.y + this.player.sprite.spriteHeight &&
            this.sprite.spriteHeight + this.sprite.y > this.player.y
        ) {
            this.attackPlayer()
        }
    }

    behavior() {
        this.attacking = checkCollision((this.sprite.x + this.sprite.spriteWidth) / 2, (this.sprite.y + this.sprite.spriteHeight) / 2, this.attackRange, (this.player.x + this.player.sprite.spriteWidth) / 2, (this.player.y + this.player.sprite.spriteHeight) / 2, 0)
        if (this.attacking) {
            this.velocity = 1
        } else (this.velocity = .4)
    }

    update() {
        this.velocity += this.game.score / this.game.entityManager.enemies.length / 100
        if (this.sprite.x < this.player.x) {
            this.directionRatioX = 1
        } else {
            this.directionRatioX = -1
        }

        if (this.sprite.y < this.game.height - 100) {
            this.directionRatioY = 1
        } else {
            this.directionRatioY = -1
        }

        this.sprite.x += (Math.random() - 0.2) * 2 * this.velocity * this.directionRatioX
        this.sprite.y += (Math.random()) * 2 * this.velocity * this.directionRatioY

        this.detectCollision()
        this.behavior()
    }
    draw(context) {
        this.sprite.draw(context)
    }
}

export default Enemy