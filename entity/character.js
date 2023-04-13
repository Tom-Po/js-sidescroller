import Sprite from "./sprite"

const playerImage = new Image()
playerImage.src = 'sprite.png'
const playerAnimationStates = [
    {
        name: 'back-arms',
        frames: 7,
    },
    {
        name: 'lside-arms',
        frames: 7,
    },
    {
        name: 'front-arms',
        frames: 7,
    },
    {
        name: 'rside-arms',
        frames: 7,
    },
    {
        name: 'back-taunt',
        frames: 8,
    },
    {
        name: 'lside-taunt',
        frames: 8,
    },
    {
        name: 'front-taunt',
        frames: 8,
    },
    {
        name: 'rside-taunt',
        frames: 8,
    },
    {
        name: 'back-walk',
        frames: 9,
    },
    {
        name: 'lside-walk',
        frames: 9,
    },
    {
        name: 'front-walk',
        frames: 9,
    },
    {
        name: 'walk',
        frames: 9,
    },
    {
        name: 'back-pointing',
        frames: 6
    },
    {
        name: 'lside-pointing',
        frames: 6
    },
    {
        name: 'pointing',
        frames: 6
    },
    {
        name: 'rside-pointing',
        frames: 6
    },
]

const STEP_SIZE = 5

class Character {
    constructor(game) {
        this.game = game
        this.sprite = new Sprite(playerImage, playerAnimationStates)
        this.sprite.x = game.width / 2 - this.sprite.spriteWidth / 2
        this.sprite.y = game.height - this.sprite.spriteHeight - 40
        this.x = this.sprite.x
        this.y = this.sprite.y
        this.init = this.init.bind(this)
        this.moveSpeed = .3
        this.init()
    }
    init() {
        let self = this;
        document.addEventListener('keydown', function (e) {
            const { key } = e
            switch (key) {
                case 'ArrowLeft':
                case 'q':
                    self.moveLeft()
                    break;
                case 'ArrowRight':
                case 'd':
                    self.moveRight()
                    break;
                case 'ArrowUp':
                case 'z':
                    self.moveUp()
                    break;
                case 'ArrowDown':
                case 's':
                    self.moveDown()
                    break;
                case ' ':
                    self.pointing()
                default:
                    break;
            }
        })
        document.addEventListener('keyup', () => {
            self.game.gameSpeed = 0
            self.pointing()
        })
    }
    moveLeft() {
        this.game.gameSpeed = -this.moveSpeed
        this.sprite.setAnimation('lside-walk')
    }
    moveRight() {
        this.game.gameSpeed = this.moveSpeed
        this.sprite.setAnimation('walk')
    }
    moveUp() {
        this.sprite.setAnimation('back-walk')
        this.sprite.y -= STEP_SIZE
    }
    moveDown() {
        this.sprite.setAnimation('front-walk')
        this.sprite.y += STEP_SIZE
    }
    pointing() {
        this.sprite.setAnimation('pointing')
    }
    draw(context) {
        this.sprite.draw(context)
    }
}

export default Character