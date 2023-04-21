import Player from './entity/Player';
import EntityManager from './entity/EntityManager';
import Parallax from './world/parallax';
import HealthBar from './world/healthbar';
import InputHandler from './entity/InputHandler';

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

    this.player = new Player(this);

    this.entityManager = new EntityManager(this);
    this.inputHandler = new InputHandler();

    this.parallax = new Parallax(this);
    this.healthBar = new HealthBar(this);

    this.score = 0;
    this.state = 'playing';
    this.logPerformances = true;

    this.parallax.init();
  }

  restart() {
    score.innerHTML = 0;
    this.player = new Player(this);
    this.parallax = new Parallax(this);
    this.entityManager = new EntityManager(this);
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
  }

  draw() {
    this.parallax.draw(ctx);

    this.entityManager.update(this.deltaTime);
    this.entityManager.draw(ctx);

    this.player.update(this.inputHandler);
    this.player.draw(ctx);

    this.parallax.drawForeground(ctx);

    this.healthBar.update();
    this.healthBar.draw(ctx);

    this.gameFrame++;
  }
}
