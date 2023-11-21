class Ship {
  constructor(x, y) {
      this.x = x;
      this.y = y;
      this.angle = 0; // In radians
      this.velocity = { x: 0, y: 0 };
      this.radius = 10; // For collision detection
  }

  rotate(direction) {
      this.angle += direction * 0.05; // Adjust rotation speed
  }

  thrust() {
      // Apply thrust in the direction the ship is facing
      this.velocity.x += 0.1 * Math.cos(this.angle);
      this.velocity.y += 0.1 * Math.sin(this.angle);
  }

  fire() {
      return new Bullet(this.x, this.y, this.angle); // Assuming Bullet is defined in bullet.js
  }

  update() {
      // Update ship position
      this.x += this.velocity.x;
      this.y += this.velocity.y;

      // Implement screen wrapping
      this.x = (this.x + canvas.width) % canvas.width;
      this.y = (this.y + canvas.height) % canvas.height;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    // Drawing the main body of the ship
    ctx.beginPath();
    ctx.moveTo(-10, -12);
    ctx.lineTo(10, 0);
    ctx.lineTo(-10, 12);
    ctx.closePath();
    ctx.fillStyle = 'white'; // Main body color
    ctx.fill();

    // Drawing the elongated tip in red
    ctx.beginPath();
    ctx.moveTo(10, 0); // Starting at the tip of the ship
    ctx.lineTo(20, 0); // Elongate the tip
    ctx.lineTo(10, -5); // Back to the right side
    ctx.lineTo(10, 5); // Back to the left side
    ctx.closePath();
    ctx.fillStyle = 'red'; // Tip color
    ctx.fill();

    ctx.restore();
}

  collidesWith(asteroid) {
      let dx = this.x - asteroid.x;
      let dy = this.y - asteroid.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      return distance < this.radius + asteroid.size;
  }
}
