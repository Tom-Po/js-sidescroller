import './style.css'

import Game from './game'

const gameOver = document.getElementById('gameOver')


// NINI
// variet attack enemy
// pulse plutôt que input


// Maxime Roux AKA PRouty suggestions du 14 avril 2023 AD
// ajouter un marteau
// le marteau doit être aussi un shotgun

// le shotgun fait du coup des attack à distance


const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = 1280;
canvas.height = 600;

window.addEventListener('load', function () {
    const game = new Game(canvas.width, canvas.height)

    const restartGameEvent = (e) => {
        if (e.key === "Escape" || e.key === " ") {
            gameOver.style.display = "none"
            game.restart()
            requestAnimationFrame(animate)
        }
    }

    function animate(timestamp) {
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
        game.update(timestamp)
        game.draw(ctx)
        requestAnimationFrame(animate)
    }
    animate(this.gameFrame)
})