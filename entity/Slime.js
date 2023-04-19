import AnimatedSprite from './AnimatedSprite.js'
import Enemy from './Enemy'

const groundImage = new Image()
groundImage.src = '/sprites/entity/ground-enemy.png'

const groundAnimationStates = [
    {
        name: 'walk',
        frames: 4
    }
]

export class Slime extends Enemy {
    constructor(game) {
        super(game)
        this.sprite = new AnimatedSprite(groundImage, groundAnimationStates)
        this.sprite.staggerFrames = 15
        this.sprite.spriteHeight = 32
        this.sprite.spriteWidth = 32
        this.sprite.x = this.game.width - this.sprite.spriteWidth
        this.sprite.y = this.game.height - 100
    }

    update() {
        // make run in circle
        // sometimes change direction
        // aggro player when close 

        const random = (Math.random() - 0.5) * 2;
        const direction = random > 0 ? 1 : -1
        const step = random * this.velocity * direction

        this.sprite.x -= step

        this.detectCollision()
        this.behavior()
    }
}
