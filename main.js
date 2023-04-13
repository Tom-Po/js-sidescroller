import './style.css'

import Parallax from './world/parallax'
import Character from './entity/character'
import Enemy from './entity/enemy'

const ENEMY_COUNT = 5

window.addEventListener('load', function () {

    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')
    canvas.width = 800;
    canvas.height = 600;

    class Game {
        constructor(width, height) {
            this.width = width
            this.height = height
            this.gameSpeed = 0
            this.player = new Character(this)
            this.parallax = new Parallax(this)
            this.enemies = []
            this.initParallax()
            this.generateEnemies()
        }

        initParallax() {
            this.parallax.addLayer('bg.png', 1)
            this.parallax.addLayer('bg-buildings2.png', 3)
            this.parallax.addLayer('bg-path.png', 5)
            this.parallax.addLayer('bg-buildings.png', 7, true)
        }
        generateEnemies() {
            for (let i = 0; i < ENEMY_COUNT; i++) {
                this.enemies.push(new Enemy(this))
            }
        }

        update() {
            // console.log("update");
        }

        draw() {
            this.parallax.draw(ctx)
            this.player.draw(ctx)
            this.enemies.forEach(enemy => {
                enemy.update()
                enemy.draw(ctx)
            })
            this.parallax.drawForeground(ctx)
        }
    }

    const game = new Game(canvas.width, canvas.height)

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.update()
        game.draw(ctx)
        requestAnimationFrame(animate)
    }
    animate()
})