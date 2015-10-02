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
	console.log('Tick');
};

/**
 *  @name           draw()
 *  @description    Draws the current state of the game to the canvas.
 *
 */

var draw = function() {

    ctx.fillText('Hello world.', 10, 30);
};

// Main game loop.
//

var fps = 30;
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