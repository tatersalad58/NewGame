// Canvas drawing elements.
//
var canvas  = document.getElementById('gameContent');
var ctx     = canvas.getContext('2d');

// Application configuration.
//
var posX = 0;
var posY = 0;

ctx.font = '30px Arial';

/**
 *  @name           update()
 *  @description    Updates the state of the game.
 *
 */
var update = function() {
	console.log('Tick');
	posX += 1;
	posY += 1;
};

/**
 *  @name           draw()
 *  @description    Draws the current state of the game to the canvas.
 *
 */
var draw = function() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText('Hello world.', posX, posY);
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
