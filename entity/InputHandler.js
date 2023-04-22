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

// // gravity and stuff
// const gravity = 0.4;
// const groundPoint = cHeight - (cHeight / 4);

// // drawnBack and firedArrow booleans to assert state of currArrow
// const drawnBack = false;
// const firedArrow = false;

// // checks if the mouse position is within < radius distance to the center
// // of the shooting circle
// const isInCircle = function (mousePos) {
//   const distFromCenter = distBetween(drawBackCirc, mousePos);
//   if (distFromCenter < drawBackCirc.r) return true;
//   return false;
// };

// /// //////////////////
// // EVENT LISTENERS //
// let mousePos;
// let mouseDown = false;
// let mouseUp = false;
// // MOUSE MOVE
// // MOUSE DOWN
// addEventListener('mousedown', (evt) => {
//   mousePos = getMousePos(canvas, evt);
//   mouseDown = true;
//   mouseUp = false;
// }, false);
// // MOUSE UP
// addEventListener('mouseup', (evt) => {
//   mousePos = getMousePos(canvas, evt);
//   mouseUp = true;
//   mouseDown = false;
// }, false);
