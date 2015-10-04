// Initialize canvas and context object globals.
//
var canvas  = document.getElementById('gameContent');
var ctx     = canvas.getContext('2d');

// Initialize map object global.
//
var mapImage = new Image();
mapImage.src = 'map1.png';

// Initialize worldspace global.
//
var world = new WorldSpace();
var player = new Player().create(world, {name: 'Juicebox', level: 1, model: 'character.png', position: {x: 50, y: 10}});

var itemIndex = player.addItem(moneyItem1);
player.useItem(itemIndex-1);

// Main game loop.
//
(function() {
    var currentInput = {
        up: false,
        down: false,
        left: false,
        right: false
    };

    window.addEventListener('keydown', function(event) {
        if (event.keyCode == 37) { currentInput.left    = true; }
        if (event.keyCode == 38) { currentInput.up      = true; }
        if (event.keyCode == 39) { currentInput.right   = true; }
        if (event.keyCode == 40) { currentInput.down    = true; }
    }, true);

    window.addEventListener('keyup', function(event) {
        if (event.keyCode == 37) { currentInput.left    = false; }
        if (event.keyCode == 38) { currentInput.up      = false; }
        if (event.keyCode == 39) { currentInput.right   = false; }
        if (event.keyCode == 40) { currentInput.down    = false; }
    }, true);

    /**
     *  @name           update()
     *  @description    Updates the state of the game.
     *
     */
    var update = function() {
        if (currentInput.right) { player.setX(player.posX += 3); }
        if (currentInput.down)  { player.setY(player.posY += 3); }
        if (currentInput.up)    { player.setY(player.posY -= 3); }
        if (currentInput.left)  { player.setX(player.posX -= 3); }
    };

    /**
     *  @name           draw()
     *  @description    Draws the current state of the game to the canvas.
     *
     */
    var draw = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(mapImage, 0, 0);
        world.drawAll();
    };

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
})();