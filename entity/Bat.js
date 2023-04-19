
import { checkRadialCollision } from '../utils'
import AnimatedSprite from './AnimatedSprite'
import Enemy from './Enemy'

const batImage = new Image()
batImage.src = '/sprites/entity/enemy-reverse.png'
const batReverseImage = new Image()
batReverseImage.src = '/sprites/entity/enemy.png'


const batAnimationStates = [
    {
        name: "attack",
        frames: 4,
    },
    {
        name: "fly",
        frames: 4,
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
export default class Bat extends Enemy {
    constructor(game) {
        super(game)
        this.sprite = new AnimatedSprite(batImage, batAnimationStates, Math.random() * this.game.width, Math.random() * (this.game.height / 4), batReverseImage)

        this.sprite.spriteHeight = 42
        this.sprite.spriteWidth = 64
        this.sprite.staggerFrames = 10

        this.sprite.setAnimation('fly')

        this.alive = true
        this.attacking = false
        this.attackRange = 100
    }

    behavior() {
        this.attacking = checkRadialCollision((this.sprite.x + this.sprite.spriteWidth) / 2, (this.sprite.y + this.sprite.spriteHeight) / 2, this.attackRange, (this.player.sprite.x + this.player.sprite.spriteWidth) / 2, (this.player.sprite.y + this.player.sprite.spriteHeight) / 2, 0)
        if (this.attacking) {
            this.velocity = 1
        } else (this.velocity = .4)
    }

    update() {
        this.velocity += this.game.score / this.game.entityManager.enemies.length / 100
        if (this.sprite.x < this.player.sprite.x) {
            this.directionRatioX = 1
            this.sprite.unflip()
        } else {
            this.directionRatioX = -1
            this.sprite.flip()
        }

        if (this.sprite.y < this.game.height - 100) {
            this.directionRatioY = 1
        } else {
            this.directionRatioY = -1
        }

        this.sprite.x += (Math.random() - 0.2) * 2 * this.velocity * this.directionRatioX - (this.game.gameSpeed * 2)
        this.sprite.y += (Math.random()) * 2 * this.velocity * this.directionRatioY
        this.detectCollision()
        this.behavior()
    }
}
