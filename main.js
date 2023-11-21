const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

let ship = new Ship(canvas.width / 2, canvas.height / 2);
let asteroids = [];
let bullets = [];
let saucers = [];
let score = 0;
let lives = 3;
let level = 1;
let gameRunning = true;

// Initialize keyboard input handling
let keys = {
    left: false,
    right: false,
    up: false,
    space: false
};

document.addEventListener('keydown', (event) => {
    switch (event.keyCode) {
        case 37: keys.left = true; break;
        case 39: keys.right = true; break;
        case 38: keys.up = true; break;
        case 32: keys.space = true; break;
    }
});

document.addEventListener('keyup', (event) => {
    switch (event.keyCode) {
        case 37: keys.left = false; break;
        case 39: keys.right = false; break;
        case 38: keys.up = false; break;
        case 32: keys.space = false; break;
    }
});

function spawnAsteroids(num) {
    for (let i = 0; i < num; i++) {
        // Spawn asteroids at random positions and sizes
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let size = Math.random() * (50 - 20) + 20; // Adjust size range as needed
        asteroids.push(new Asteroid(x, y, size));
    }
}

function updateGameObjects() {
    if (keys.left) ship.rotate(-1);
    if (keys.right) ship.rotate(1);
    if (keys.up) ship.thrust();
    if (keys.space && bullets.length < 5) { // Limit number of bullets
        bullets.push(ship.fire()); // fire method to be defined in Ship class
    }

    ship.update();
    asteroids.forEach(asteroid => asteroid.update());
    bullets.forEach((bullet, index) => {
        bullet.update();
        if (bullet.offScreen(canvas.width, canvas.height)) {
            bullets.splice(index, 1); // Remove bullet if it goes off screen
        }
    });
    saucers.forEach(saucer => saucer.update());
}

function detectCollisions() {
    asteroids.forEach((asteroid, aIdx) => {
        if (ship.collidesWith(asteroid)) {
            // Handle ship-asteroid collision
            lives--;
            if (lives <= 0) {
                gameRunning = false;
            }
        }

        bullets.forEach((bullet, bIdx) => {
            if (bullet.collidesWith(asteroid)) {
                // Handle bullet-asteroid collision
                score += 10; // Adjust score increment as needed
                asteroids.splice(aIdx, 1);
                bullets.splice(bIdx, 1);
            }
        });
    });
}

function updateGameLogic() {
    detectCollisions();

    if (asteroids.length === 0) {
        level++;
        spawnAsteroids(level * 5); // Increase asteroid count each level
    }
}

function renderGameObjects() {
    ship.draw(ctx);
    asteroids.forEach(asteroid => asteroid.draw(ctx));
    bullets.forEach(bullet => bullet.draw(ctx));
    saucers.forEach(saucer => saucer.draw(ctx));
}

function gameLoop() {
    if (!gameRunning) {
        ctx.font = '48px serif';
        ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateGameObjects();
    updateGameLogic();
    renderGameObjects();

    requestAnimationFrame(gameLoop);
}

spawnAsteroids(level * 5);
gameLoop();
