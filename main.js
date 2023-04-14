import './style.css'

import Parallax from './world/parallax'
import Character from './entity/character'
import Enemy from './entity/enemy'
import HealthBar from './world/healthbar'


const score = document.getElementById('score')
const gameOver = document.getElementById('gameOver')

// Stable FPS 120 up to 1K - 10K = 30fps
const ENEMY_COUNT = 10
const ENEMY_POP_RATE = 1000


// variet attack enemy
// pulse plutôt que input


// Maxime Roux AKA PRouty suggestions du 14 avril 2023 AD
// ajouter un marteau
// le marteau doit être aussi un shotgun

// le shotgun fait du coup des attack à distance



window.addEventListener('load', function () {

    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')
    canvas.width = 800;
    canvas.height = 600;

    class Game {
        constructor(width, height) {
            this.width = width
            this.height = height
            this.gameSpeed = 0.2
            this.gameFrame = 0

            this.player = new Character(this)
            this.enemies = []
            this.enemyPopRate = ENEMY_POP_RATE

            this.parallax = new Parallax(this)
            this.healthBar = new HealthBar(this)

            this.score = 0
            this.state = "playing"

            this.initParallax()
            this.generateEnemies()
        }

        initParallax() {
            this.parallax.addLayer('bg.png', 1)
            this.parallax.addLayer('bg-buildings2.png', 3)
            this.parallax.addLayer('bg-path.png', 5)
            this.parallax.addLayer('bg-buildings.png', 7, true)
            this.parallax.addLayer('bg-sky.png', 7, true)
        }

        generateEnemies() {
            for (let i = 0; i < ENEMY_COUNT; i++) {
                this.enemies.push(new Enemy(this))
            }
        }

        restart() {
            score.innerHTML = 0
            this.player = new Character(this)
            this.parallax = new Parallax(this)
            this.enemies = []
            this.generateEnemies()
            this.initParallax()
            this.state = "playing"
        }

        update() {
            if (this.gameFrame % this.enemyPopRate === 0) {
                this.enemyPopRate = this.enemyPopRate - Math.floor(this.score / 100)
                this.enemies.push(new Enemy(this))
            }
        }

        draw() {
            this.parallax.draw(ctx)

            this.enemies.forEach((enemy, idx) => {
                enemy.update()
                if (!enemy.alive) {
                    this.score++
                    score.innerHTML = this.score
                    this.enemies.splice(idx, 1)
                    this.enemies.push(new Enemy(this))
                }
                enemy.draw(ctx)
            })

            this.player.update()
            this.player.draw(ctx)

            this.parallax.drawForeground(ctx)

            this.healthBar.update()
            this.healthBar.draw(ctx)

            this.gameFrame++
        }
    }

    const game = new Game(canvas.width, canvas.height)

    const restartGameEvent = (e) => {
        if (e.key === "Escape" || e.key === " ") {
            gameOver.style.display = "none"
            game.restart()
            requestAnimationFrame(animate)
        }
    }

    function animate(timestamp) {

        // perf
        // console.log((game.gameFrame / Math.floor(timestamp / 1000)) + 's')

        if (game.state === "paused") {
            gameOver.style.display = 'flex'
            gameOver.addEventListener('click', restartGameEvent)
            window.addEventListener('keydown', restartGameEvent)
            return
        } else {
            gameOver.removeEventListener('click', restartGameEvent)
            window.removeEventListener('keydown', restartGameEvent)
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.update()
        game.draw(ctx)
        requestAnimationFrame(animate)
    }
    animate(this.gameFrame)
})