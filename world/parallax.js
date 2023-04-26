import Layer from './layer';

export default class Parallax {
  constructor(game) {
    this.game = game;
    this.layers = [];
    this.foregroundLayers = [];
    this.init();
  }

  init() {
    this.addLayer('/bg/bg.png', 1);
    // this.addLayer('/bg/bg-buildings2.png', 3);
    this.addLayer('/bg/bg-path.png', 3);
    // this.addLayer('/bg/bg-buildings.png', 7, true);
    this.addLayer('/bg/bg-sky.png', 7, true);
  }

  addLayer(image, speedModifier, isForeground) {
    const img = new Image();
    img.src = image;
    if (isForeground) this.foregroundLayers.push(new Layer(img, speedModifier, this.game));
    else this.layers.push(new Layer(img, speedModifier, this.game));
  }

  draw(ctx) {
    this.layers.forEach((layer) => {
      layer.update();
      layer.draw(ctx);
    });
  }

  drawForeground(ctx) {
    this.foregroundLayers.forEach((layer) => {
      layer.update();
      layer.draw(ctx);
    });
  }
}
