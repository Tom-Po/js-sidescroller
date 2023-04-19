
import AnimatedSprite from './AnimatedSprite'
import Enemy from './Enemy'

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
export default class Bat extends Enemy {
    constructor(game) {
        super(game)
        this.sprite = new AnimatedSprite(batImage, batAnimationStates)
        this.sprite.x = Math.random() * this.game.width
        this.sprite.y = Math.random() * (this.game.height / 4)

        this.sprite.spriteHeight = 42
        this.sprite.spriteWidth = 64

        this.sprite.setAnimation('fly')

        this.alive = true
        this.attacking = false
        this.attackRange = 100
    }
    update() {
        this.velocity += this.game.score / this.game.entityManager.enemies.length / 100
        if (this.sprite.x < this.player.sprite.x) {
            this.directionRatioX = 1
        } else {
            this.directionRatioX = -1
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
