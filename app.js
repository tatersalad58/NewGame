// Canvas drawing elements.
//
var canvas  = document.getElementById('gameContent');
var ctx     = canvas.getContext('2d');

// Application configuration.
//

ctx.font = '30px Arial';

var posX = 0;
var posY = 0;
var text = "Hello World!";
var tSize = ctx.measureText(text);
var right = true;
var down = true;


/**
 *  @name           update()
 *  @description    Updates the state of the game.
 *
 */
var update = function() {
    console.log('Tick');
    if (posX + tSize.width > canvas.width) { right = false }
    if (posY > canvas.height) { down = false }
    if (posX < 0 ) { right = true; }
    if (posY + 30 < 0 ) { down = true; }
    if (right) { posX += 1; } else { posX -= 1; }
    if (down) { posY += 1; } else { posY -= 1; }
};

/**
 *  @name           draw()
 *  @description    Draws the current state of the game to the canvas.
 *
 */
var draw = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(text, posX, posY);

};

// Main game loop.
//
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
