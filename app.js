// Canvas drawing elements.
//
var canvas  = document.getElementById('gameContent');
var ctx     = canvas.getContext('2d');

// Application configuration.
//
ctx.font = '30px Arial';

/**
 *  @name           update()
 *  @description    Updates the state of the game.
 *
 */
var update = function() {

};

/**
 *  @name           draw()
 *  @description    Draws the current state of the game to the canvas.
 *
 */
var draw = function() {
    ctx.fillText('Hello world.', 10, 30);
};

/**
 *  @name           think()
 *  @description    Wrapper function for the update and draw methods that
 *                  we will call from our game loop.
 *
 */
var think = function() {
    update();
    draw();

    window.requestAnimationFrame(think);
};

// Main game loop.
//
window.requestAnimationFrame(think);
