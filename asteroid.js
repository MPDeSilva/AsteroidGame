class Asteroid {
  constructor(x, y, size) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.velocity = {
          x: Math.random() * 2 - 1,
          y: Math.random() * 2 - 1
      };
  }

  update() {
      this.x += this.velocity.x;
      this.y += this.velocity.y;

      // Screen wrapping
      this.x = (this.x + canvas.width) % canvas.width;
      this.y = (this.y + canvas.height) % canvas.height;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fillStyle = 'grey'; // Set asteroid color to grey
    ctx.fill();
    ctx.stroke();
}
}
