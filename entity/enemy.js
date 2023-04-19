import AnimatedSprite from "./AnimatedSprite"
import { checkRadialCollision } from '../utils'

const batImage = new Image()
batImage.src = '/sprites/entity/enemy.png'


const batAnimationStates = [
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

export default class Enemy {
    constructor(game) {
        this.game = game
        this.player = this.game.player
        this.sprite = new AnimatedSprite(batImage, batAnimationStates)
        this.sprite.staggerFrame = 10
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
            this.sprite.x < this.player.sprite.x + this.player.sprite.spriteWidth &&
            this.sprite.x + this.sprite.spriteWidth > this.player.sprite.x &&
            this.sprite.y < this.player.sprite.y + this.player.sprite.spriteHeight &&
            this.sprite.spriteHeight + this.sprite.y > this.player.sprite.y
        ) {
            this.attackPlayer()
        }
    }

    behavior() {
        this.attacking = checkRadialCollision((this.sprite.x + this.sprite.spriteWidth) / 2, (this.sprite.y + this.sprite.spriteHeight) / 2, this.attackRange, (this.player.sprite.x + this.player.sprite.spriteWidth) / 2, (this.player.sprite.y + this.player.sprite.spriteHeight) / 2, 0)
        if (this.attacking) {
            this.velocity = 1
        } else (this.velocity = .4)
    }

    update() {
        if (this.sprite.x < this.player.sprite.x) {
            this.directionRatioX = 1
        } else {
            this.directionRatioX = -1
        }
        this.sprite.x += (Math.random() - 0.2) * 2 * this.velocity * this.directionRatioX

        this.detectCollision()
        this.behavior()
    }

    draw(context) {
        this.sprite.draw(context)
    }
}