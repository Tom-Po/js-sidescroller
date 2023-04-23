const canvas = document.getElementById('canvas1');

export default class InputHandler {
  constructor() {
    this.keys = [];
    this.mousePosition = { x: 0, y: 0 };
    this.mouseUp = true;
    this.mouseDown = false;
    window.addEventListener('keydown', (e) => {
      const value = e.code === 'Space' ? e.code : e.key;
      if (!this.keys.includes(value)) {
        this.keys.push(value);
      }
      if (value === 'Tab') e.preventDefault();
    });
    window.addEventListener('keyup', (e) => {
      const value = e.code === 'Space' ? e.code : e.key;
      this.keys.splice(this.keys.indexOf(value), 1);
    });
    window.addEventListener('mousemove', (e) => {
      this.getMousePosition(e);
    });
    window.addEventListener('mousedown', (e) => {
      this.mouseDown = true;
      this.mouseUp = false;
      this.getMousePosition(e);
    });
    window.addEventListener('mouseup', (e) => {
      this.mouseDown = false;
      this.mouseUp = true;
      this.getMousePosition(e);
    });
  }

  getMousePosition(evt) {
    const dimensions = canvas.getBoundingClientRect();
    this.mousePosition = {
      x: Math.floor(evt.clientX - dimensions.left),
      y: Math.floor(evt.clientY - dimensions.top),
    };
  }
}
