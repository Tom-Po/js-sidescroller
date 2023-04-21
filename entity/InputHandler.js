export default class InputHandler {
  constructor() {
    this.keys = [];
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
  }
}
