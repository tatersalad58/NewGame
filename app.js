// Canvas drawing elements.
//
var canvas  = document.getElementById('gameContent');
var ctx     = canvas.getContext('2d');

// Application configuration.
//
ctx.font = '15px Arial';
ctx.fillStyle = 'white';

/**
 *  @name           update()
 *  @description    Updates the state of the game.
 *
 */
var update = function() {
    console.log(currentInput);

    if (currentInput.right) {
        player.setX(player.posX += 3);
    }
    if (currentInput.down) {
        player.setY(player.posY += 3);
    }
    if (currentInput.up) {
        player.setY(player.posY -= 3);
    }
    if (currentInput.left) {
        player.setX(player.posX -= 3);
    }

    playerTwo.setPositionOffset(5, -2);
    // console.log('Tick');
};

/**
 *  @name           draw()
 *  @description    Draws the current state of the game to the canvas.
 *
 */
var draw = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    entities.forEach(function(entity) {
        entity.draw();
    });
};

// Main game loop.
//
var currentInput = {
    up: false,
    down: false,
    left: false,
    right: false
};

window.addEventListener('keydown', function(event) {
    if (event.keyCode == 38) { currentInput.up      = true; }
    if (event.keyCode == 40) { currentInput.down    = true; }
    if (event.keyCode == 39) { currentInput.right   = true; }
    if (event.keyCode == 37) { currentInput.left    = true; }
}, true);

window.addEventListener('keyup', function(event) {
    if (event.keyCode == 38) { currentInput.up      = false; }
    if (event.keyCode == 40) { currentInput.down    = false; }
    if (event.keyCode == 39) { currentInput.right   = false; }
    if (event.keyCode == 37) { currentInput.left    = false; }
}, true);

var entities = [];

var player = new Player('Blake', 1);
player.setX(25);
player.setY(25);
entities.push(player);

var playerTwo = new Player('Lizzyboo', 1);
playerTwo.setX(100);
playerTwo.setY(100);
entities.push(playerTwo);

var fps = 60;
var now;
var then = Date.now();
var interval = 1000 / fps;
var delta;

var loop = function() {
    requestAnimationFrame(loop);

    now = Date.now();
    delta = now - then;

    if (delta > interval) {
        then = now - (delta % interval);

        update();
        draw();
    }
};

requestAnimationFrame(loop);
