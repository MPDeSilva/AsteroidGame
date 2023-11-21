class Saucer {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type; // 'big' or 'small'
        this.velocity = {
            x: type === 'big' ? 1 : 2,
            y: type === 'big' ? 1 : 2
        };
        this.radius = 20; // For rendering and collision
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
        ctx.ellipse(this.x, this.y, this.radius, this.radius / 2, 0, 0, 2 * Math.PI);
        ctx.stroke();
    }

    // Additional methods like firing bullets can be added here
}
