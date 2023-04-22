import './style.css';

import Game from './Game';

// NINI
// variet attack enemy
// pulse plutôt que input

// Maxime Roux AKA PRouty suggestions du 14 avril 2023 AD
// ajouter un marteau
// le marteau doit être aussi un shotgun
// le shotgun fait du coup des attack à distance

// Théo

// Ramasser la thune auto - arbre de talent

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 1280;
canvas.height = 600;

const launcher = () => {
  const game = new Game(canvas.width, canvas.height);

  function animate(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(timestamp);
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate(game.gameFrame);
};

window.addEventListener('load', launcher);
