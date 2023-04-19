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
        this.sprite.x = this.game.width
        this.sprite.y = this.game.height - 100
    }
}
