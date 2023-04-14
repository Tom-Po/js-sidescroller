import { checkCollision } from "../utils"
import Sprite from "./sprite"

const playerImage = new Image()
playerImage.src = '/sprites/entities/sprite.png'

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
rogueImage.src = '/sprites/entities/rogue.png'

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
const SPELL_RANGE_BASE = 20

class Character {
    constructor(game) {
        this.game = game
        this.sprite = new Sprite(rogueImage, rogueAnimationStates)
        this.x = this.sprite.x = game.width / 2 - this.sprite.spriteWidth / 2
        this.y = this.sprite.y = game.height - this.sprite.spriteHeight - 40

        this.baseHp = 3
        this.maxHp = 3
        this.baseArmor = 1
        this.moveSpeed = .3

        this.isCasting = false

        this.spellDuration = SPELL_DURATION_BASE
        this.spellRange = SPELL_RANGE_BASE
        this.spellCooldown = SPELL_COOLDOWN_BASE

        this.sprite.setAnimation('walk')
        this.init = this.init.bind(this)
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
                    self.cast()
                    break;
                case 'r':
                    self.heal()
                default:
                    break;
            }
        })

    }
    moveLeft() {
        this.game.gameSpeed = -this.moveSpeed
    }
    moveRight() {
        this.game.gameSpeed = this.moveSpeed
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
        for (let i = 0; i < this.game.enemies.length; i++) {
            // Check if enemy is in range of circle
            const successfullHit = checkCollision(
                this.x,
                this.y,
                this.spellRange,
                this.game.enemies[i].sprite.x,
                this.game.enemies[i].sprite.y,
                0
            )
            if (successfullHit) {
                this.game.enemies[i].alive = false
            }
        }

        this.spellDuration--
        this.spellRange += 3
        if (this.spellRange > SPELL_RANGE_BASE) this.spellRange = SPELL_RANGE_BASE
        if (this.spellDuration === 0) {
            this.spellDuration = SPELL_DURATION_BASE
            this.spellCooldown = SPELL_COOLDOWN_BASE
            this.isCasting = false
        }
    }

    update() {
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
            context.arc(this.x + this.sprite.spriteWidth / 2, this.y + this.sprite.spriteHeight / 2, this.spellRange, 0, 2 * Math.PI);
            context.stroke();
            context.lineWidth = 1
        }
        this.sprite.draw(context)
    }
}

export default Character