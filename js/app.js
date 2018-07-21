// Enemies our player must avoid

// var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

//     this.sprite = 'img/enemy-bug.png';
//     this.x = x;
//     let xValueArray = [20, 30, 40, 50, 65, 75, 90, 100, 110, 125, 150, 200];
//     let randomXValue = xValueArray[Math.floor(Math.random() * xValueArray.length)];
//     this.xSpeed = randomXValue;
//     this.y = y;
// };

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

// Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
//     this.x += dt * this.xSpeed;
// };

// Draw the enemy on the screen, required method for game

// Enemy.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };

class Enemy {
    constructor(x, y) {
        this.sprite = 'img/enemy-bug.png';
        this.x = x;
        let xValueArray = [20, 30, 40, 50, 65, 75, 90, 100, 110, 125, 150, 200];
        let randomXValue = xValueArray[Math.floor(Math.random() * xValueArray.length)];
        this.xSpeed = randomXValue;
        this.y = y;
        this.width = 75;
        this.height = 50;
    }

    update(dt) {
        // Update enemy location
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

        // Check for collisions with Player
        // allEnemies[i].x
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
        setTimeout(this.reset.bind(this), 10000);

        // Check to see if player collides with any of the enemies
        for (let i = 0; i < allEnemies.length; i++) {
            if (allEnemies[i].x < player.x + player.width &&
                allEnemies[i].x + allEnemies[i].width > player.x &&
                allEnemies[i].y < player.y + player.height &&
                allEnemies[i].height + allEnemies[i].y > player.y) {
                    this.x = 203;
                    this.y = 380;
                }

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

    reset() {
        // if (this.y === -35) {
        //     setTimeout(function() {
        //         this.x = 203;
        //         this.y = 380;
        //     }, 2000);   
        // }     
        if (this.y === -35) {
            this.x = 203;
            this.y = 380;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let player = new Player();

let allEnemies = [];

for (let i = 0; i <= 6; i++) {
    populateNewEnemy();
}

function populateNewEnemy () {
    let yValueArray = [225, 142, 59];
    let randomYValue = yValueArray[Math.floor(Math.random() * yValueArray.length)];
    allEnemies.push(new Enemy(-110, randomYValue));
}


// function checkLeftBoundary(allEnemies, player) {
//     return 
// }



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