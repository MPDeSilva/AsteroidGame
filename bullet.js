class Bullet {
  constructor(x, y, angle) {
      this.x = x;
      this.y = y;
      this.velocity = {
          x: 5 * Math.cos(angle),
          y: 5 * Math.sin(angle)
      };
      this.radius = 2; // For rendering and collision
  }

  update() {
      this.x += this.velocity.x;
      this.y += this.velocity.y;
  }

  offScreen(width, height) {
      return this.x < 0 || this.x > width || this.y < 0 || this.y > height;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'red'; // Set bullet color to red
    ctx.fill();
}

  collidesWith(asteroid) {
      let dx = this.x - asteroid.x;
      let dy = this.y - asteroid.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      return distance < this.radius + asteroid.size;
  }
}
