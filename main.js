import './style.css'

import Sprite from './sprite'
import Parallax from './background'
import Character from './character'

const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 600;

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
        name: 'walk',
        frames: 9,
    },
    {
        name: 'rside-walk',
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

const enemyImage = new Image()
enemyImage.src = 'enemy.png'
const enemyAnimationStates = [
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
        name: "rside-walk",
        frames: 4,
    },
]

const playerSprite = new Sprite(playerImage, playerAnimationStates)

class Game {
    constructor() {
        this.gameSpeed = 1
        this.player = new Character(playerSprite, CANVAS_WIDTH / 2, CANVAS_HEIGHT - playerSprite.spriteHeight)
        this.enemy = new Sprite(enemyImage, enemyAnimationStates)
        this.parallax = new Parallax()
        this.init()
    }

    init() {
        this.parallax.addLayer('bg.png', 1)
        this.parallax.addLayer('bg1.png', 1.5)
        this.parallax.addLayer('bg2.png', 2.3)
    }

    update() {
        this.parallax.update()
        this.player.update(ctx)
    }
}

const game = new Game()
game.update()