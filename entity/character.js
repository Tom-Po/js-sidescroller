import { checkRadialCollision } from "../utils"
import AnimatedSprite from "./AnimatedSprite"

const playerImage = new Image()
playerImage.src = '/sprites/entity/sprite.png'

// First sprite
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
        name: 'cast',
        frames: 6
    },
    {
        name: 'rside-pointing',
        frames: 6
    },
]

// Rogue
const rogueImage = new Image()
rogueImage.src = '/sprites/entity/rogue.png'
const rogueReverseImage = new Image()
rogueReverseImage.src = '/sprites/entity/rogue-reverse.png'

const rogueAnimationStates = [
    {
        name: 'idle',
        frames: 10,
    },
    {
        name: 'gesture',
        frames: 10,
    },
    {
        name: 'walk',
        frames: 10,
    },
    {
        name: 'attack',
        frames: 10,
    },
    {
        name: 'death',
        frames: 10,
    },
]

const SPELL_DURATION_BASE = 500
const SPELL_COOLDOWN_BASE = 100
const SPELL_RANGE_BASE = 128


const JUMP_HEIGHT = 100
const JUMP_VELOCITY = 100


class Player {
    constructor(game) {
        this.game = game
        this.sprite = new AnimatedSprite(rogueImage, rogueAnimationStates)
        this.sprite.setAnimation('walk')
        this.sprite.staggerFrames = 10

        this.sprite.x = game.width / 2 - this.sprite.spriteWidth / 2
        this.playerBaseHeight = game.height - this.sprite.spriteHeight - 40
        this.sprite.y = this.playerBaseHeight
        this.sprite.flippedImage = rogueReverseImage
        this.sprite.showBox = true


        this.baseHp = 6
        this.maxHp = 6
        this.baseArmor = 2
        this.moveSpeed = .3

        this.isJumping = false
        this.jumpVelocity = 1
        this.isCasting = false

        this.spellDuration = SPELL_DURATION_BASE
        this.spellRange = SPELL_RANGE_BASE
        this.spellRangeMax = SPELL_RANGE_BASE
        this.spellCooldown = SPELL_COOLDOWN_BASE

        this.init = this.init.bind(this)
        this.init()
    }

    init() {
        let self = this;
        document.addEventListener('keyup', () => {
            self.isJumping = false
            this.game.gameSpeed = 0
        })
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
                case 'ArrowDown':
                case 's':
                    self.moveDown()
                    break;
                case 'e':
                    self.cast()
                    break;
                case 'r':
                    self.heal()
                case ' ':
                    if (!self.isJumping) self.isJumping = true
                default:
                    break;
            }
        })

    }
    moveLeft() {
        this.game.gameSpeed = -this.moveSpeed
        this.sprite.flip()
    }
    moveRight() {
        this.game.gameSpeed = this.moveSpeed
        this.sprite.unflip()
    }

    heal() {
        if (this.baseHp < this.maxHp) this.baseHp++
    }

    cast() {
        if (this.spellCooldown > 0) return
        else this.spellCooldown = SPELL_COOLDOWN_BASE
        this.spellRange = 0
        this.isCasting = true
    }

    getHit() {
        if (this.baseArmor > 0) {
            this.baseArmor--
            return
        }
        this.baseHp--
        if (this.baseHp === 0) {
            this.sprite.setAnimation('death')
            this.game.state = "paused"
        }
    }

    spellDamageCheck() {
        for (let i = 0; i < this.game.entityManager.enemies.length; i++) {
            // Check if enemy is in range of circle
            const successfullHit = checkRadialCollision(
                this.sprite.x,
                this.sprite.y,
                this.spellRange,
                this.game.entityManager.enemies[i].sprite.x,
                this.game.entityManager.enemies[i].sprite.y,
                0
            )
            if (successfullHit) {
                this.game.entityManager.enemies[i].alive = false
                // this.spellRangeMax += 5
            }
        }

        this.spellDuration--
        this.spellRange += 3
        if (this.spellRange > this.spellRangeMax) this.spellRange = this.spellRangeMax
        if (this.spellDuration === 0) {
            this.spellDuration = SPELL_DURATION_BASE
            this.spellCooldown = SPELL_COOLDOWN_BASE
            this.isCasting = false
        }
    }

    jump() {
        if (this.isJumping && this.sprite.y > this.playerBaseHeight - JUMP_HEIGHT) {
            this.sprite.y -= 1
        } else {
            if (this.sprite.y < this.playerBaseHeight) {
                this.sprite.y += 1
            } else {
                this.isJumping = false
            }
        }

    }

    update() {
        this.jump()
        if (this.isCasting) {
            this.spellDamageCheck()
        } else {
            this.spellCooldown--
            this.cast()
        }
    }

    draw(context) {
        if (this.isCasting) {
            context.strokeStyle = "#DDEEFF"
            context.lineWidth = 10
            context.beginPath()
            context.arc(this.sprite.x + this.sprite.spriteWidth / 2, this.sprite.y + this.sprite.spriteHeight / 2, this.spellRange, 0, 2 * Math.PI);
            context.stroke();
            context.lineWidth = 1
        }
        this.sprite.draw(context)
    }
}

export default Player