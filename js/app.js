class Enemy {
    constructor(x, y) {
        this.sprite = 'img/enemy-bug.png';
        this.x = x;
        let xValueArray = [40, 50, 65, 75, 90, 100, 110, 125, 150, 200, 250];
        let randomXValue = xValueArray[Math.floor(Math.random() * xValueArray.length)];
        this.xSpeed = randomXValue;
        this.y = y;
        this.width = 75;
        this.height = 50;
    }

    update(dt) {
        // Update enemy location on the x-axis
        this.x += dt * this.xSpeed;
        if (this.x > 500) {

            // Remove enemy once it's crossed the canvas
            let index = allEnemies.indexOf(this);
            if (index !== -1) {
                allEnemies.splice(index, 1);
            }
            
            // Populate a new enemy to replace the removed one :: allows enemy to be placed on a new Y level
            populateNewEnemy();
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor() {
        this.sprite = 'img/char-cat-girl.png';
        this.x = 203;
        this.y = 380;
        this.width = 75;
        this.height = 50;
    }

    update() {
        // this.reset();
        // If player hits water then reset
        // When written this way the setTimeout only applies upon reload for the first 10 seconds
        // setTimeout(this.reset.bind(this), 500);

        // Check to see if player collides with any of the enemies and if so, reset player to beginning position
        for (let i = 0; i < allEnemies.length; i++) {
            if (allEnemies[i].x < player.x + player.width &&
                allEnemies[i].x + allEnemies[i].width > player.x &&
                allEnemies[i].y < player.y + player.height &&
                allEnemies[i].height + allEnemies[i].y > player.y) {
                    this.x = 203;
                    this.y = 380;
                }

        }

        // Check if player is in water/won game
        // setTimeout(this.isInWater, 1000);
        this.isInWater();

        // this.reset();


    }

    // Allows player to visibly be in water before resetting
    isInWater() {
        if (this.y === -35) {
            let playerWinModal = document.querySelector('.modal');
            playerWinModal.style.display = 'block';
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(direction) {
        if (direction === 'up' && this.y > -35) {
            this.y -= 83;
        }
        if (direction === 'down' && this.y < 380) {
            this.y += 83;
        }
        if (direction === 'right' && this.x < 405) {
            this.x += 101;
        }
        if (direction === 'left' && this.x > 1) {
            this.x -= 101;
        }
    }

    // reset() {
    // }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let player = new Player();

let allEnemies = [];

// Create 7 enemies at the start
for (let i = 0; i <= 6; i++) {
    populateNewEnemy();
}

// Generic function for creating new enemies when needed
function populateNewEnemy () {
    let yValueArray = [225, 142, 59];
    let randomYValue = yValueArray[Math.floor(Math.random() * yValueArray.length)];
    allEnemies.push(new Enemy(-110, randomYValue));
}

// This closes the win game modal resets the player sprite if the player clicks 'Play again' button
let playAgainBtn = document.getElementById('playAgainBtn');
playAgainBtn.addEventListener('click', function() {
    let playerWinModal = document.querySelector('.modal');
    playerWinModal.style.display = 'none';
    player.x = 203;
    player.y = 380;
});   


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