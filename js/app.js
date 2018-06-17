// Enemies our player must avoid
let Enemy = function(x, y , speed) {
    // Enemy position on horizontal(x) axis
    this.x = x;
    // Enemy position on vertical(y) axis
    this.y = y;
    // Enemy movement speed
    this.speed = speed;
    // The image/sprite for enemies
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;

    // When the enemy is out the board make it reapear and give it a new random speed and horizontal position.
    if (this.x > 505) {
        this.x = random(-404, -101);
        this.speed = random(100, 250);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This class requires an update(), render() and
// a handleInput() method.
// Player class
let Player = function(x, y) {
    // Player position on horizontal(x) axis
    this.x = x;
    // Player position on vertical(y) axis
    this.y = y;
    // The image/sprite for enemies
    this.player = 'images/char-boy.png';
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

// Update the player's position, required method for game
Player.prototype.update = function() {
    collision();
    win();
};

// Player's key and canvas limits
Player.prototype.handleInput = function(button) {
    if (button == 'up' && this.y > 0) {
        this.y -= 83;
    }
    if (button == 'down' && this.y < 372) {
        this.y += 83;
    }
    if (button == 'left' && this.x > 0) {
        this.x -= 103;
    }
    if (button == 'right' && this.x < 404) {
        this.x += 103;
    }
    // Reposition the player after water is reached
    if (this.y < 0) {
        setTimeout(() => {
            player.x = 202;
            player.y = 393;
        }, 500);
    }
};

// Enemy Array
let allEnemies = [];

// Create enemies
let enemy1 = new Enemy(random(-404, -101), 61, random(100, 250));
let enemy2 = new Enemy(random(-404, -101), 144, random(100, 250));
let enemy3 = new Enemy(random(-404, -101), 227, random(100, 250));

// Add Enemies to array
allEnemies.push(enemy1, enemy2, enemy3);

// Create player
let player = new Player(202, 393);

// Generate random number between two numbers function
function random(min, max) {
    return Math.random() * (max - min) + min;
};

// Check if the player collided with the bug, if yes, reset players location
function collision() {
    if (player.x < enemy1.x + 74 && player.x > enemy1.x - 74 && 
        player.y < enemy1.y + 50 && player.y > enemy1.y - 50) {
        player.x = 202;
        player.y = 393;
    }
    if (player.x < enemy2.x + 74 && player.x > enemy2.x - 74 && 
        player.y < enemy2.y + 50 && player.y > enemy2.y - 50) {
        player.x = 202;
        player.y = 393;
    }
    if (player.x < enemy3.x + 74 && player.x > enemy3.x - 74 && 
        player.y < enemy3.y + 50 && player.y > enemy3.y - 50) { 
        player.x = 202;
        player.y = 393;
    }
};

// Game Title
let gameName = document.getElementById('game_name');

// Change title when player wins
function win() {
    if (player.y < 0) {   
        gameName.innerText = "YOU WON! Try Again!";  
        setTimeout(() => {
            gameName.innerText = "Classic Arcade Game";  
        }, 1500);
    }
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});