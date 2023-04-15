import './style.css'

import Parallax from './world/parallax'
import Character from './entity/character'
import HealthBar from './world/healthbar'
import Sprite from './entity/sprite'
import EntityManager from './entity/entity-manager'

const gameOver = document.getElementById('gameOver')

const potionImage = new Image()
potionImage.src = '/sprites/items/blue-potion.png'


// NINI
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
            this.worldItems = [
                new Sprite(potionImage, 2)
            ]

            this.entityManager = new EntityManager(this)

            this.parallax = new Parallax(this)
            this.healthBar = new HealthBar(this)

            this.score = 0
            this.state = "playing"

            this.parallax.init()
        }

        restart() {
            score.innerHTML = 0
            this.player = new Character(this)
            this.parallax = new Parallax(this)
            this.entityManager = new EntityManager(this)
            this.parallax.init()
            this.state = "playing"
        }

        update() { }

        draw() {
            this.parallax.draw(ctx)

            this.entityManager.update()
            this.entityManager.draw(ctx)

            this.player.update()
            this.player.draw(ctx)

            this.worldItems.forEach(item => {
                item.draw(ctx)
            })

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