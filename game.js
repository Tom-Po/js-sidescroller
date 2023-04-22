import EntityManager from './entity/EntityManager';
import InputHandler from './entity/InputHandler';
import Player from './entity/Player';
import HUD from './world/hud';
import Parallax from './world/parallax';

const canvas = document.getElementById('canvas1');
const fps = document.getElementById('fps');
const ctx = canvas.getContext('2d');

export default class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.gameSpeed = 0;
    this.gameFrame = 0;
    this.lastTime = 0;
    this.deltaTime = 0;

    this.inputHandler = new InputHandler();

    this.player = new Player(this);
    this.entityManager = new EntityManager(this);

    this.parallax = new Parallax(this);

    this.HUD = new HUD(this);
    this.score = 0;
    this.state = 'playing';

    this.debug = false;
    this.logPerformances = true;

    this.parallax.init();
  }

  restart() {
    score.innerHTML = 0;
    this.player = new Player(this);
    this.parallax = new Parallax(this);
    this.entityManager = new EntityManager(this);
    this.inputHandler = new InputHandler();
    this.parallax.init();
    this.state = 'playing';
    this.lastTime = this.deltaTime = fps.innerHTML = 0;
  }

  update(timestamp) {
    // perf
    if (this.logPerformances) {
      const fpsCount = `${Math.floor((this.gameFrame / Math.floor(timestamp / 1000)))} fps`;
      fps.innerHTML = fpsCount;
      if ((timestamp / 10000) % 60 === 0) {
        fps.innerHTML = fpsCount;
      }
    }
    this.deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    this.entityManager.update(this.inputHandler);
    this.player.update(this.inputHandler);
    this.HUD.update(this.inputHandler);
  }

  draw() {
    this.parallax.draw(ctx);

    this.entityManager.draw(ctx);

    this.player.draw(ctx);

    this.parallax.drawForeground(ctx);
    this.HUD.draw(ctx);
    this.gameFrame++;
  }
}
