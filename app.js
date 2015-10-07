window.canvas  = document.getElementById('gameContent');
window.ctx     = window.canvas.getContext('2d');

/**
 *  @name           update()
 *  @description    Updates the state of the game.
 *
 */
var update = function() {
    var currentInput = window.currentInput;
    var player = window.player;

    if (currentInput.right) { 
        player.setX(3); 
        player.direction = 'right';
    }
    if (currentInput.down)  { 
        player.setY(3); 
        player.direction = 'down';
    }
    if (currentInput.up)    { 
        player.setY(-3); 
        player.direction = 'up';
    }
    if (currentInput.left)  {
        player.setX(-3); 
        player.direction = 'left';
    }
};

/**
 *  @name           draw()
 *  @description    Draws the current state of the game to the canvas.
 *
 */
var draw = function() {
    ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);
    window.worldSpace.drawAll();
};

// Main game loop.
//
var startGame = function() {

    // Input handlers.
    window.currentInput = {
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

        // Testing
        if (event.keyCode == 73) {
            var i = window.player.addItem(moneyItem1);
            window.player.useItem(i);
        }
        if (event.keyCode == 75) {
            var i = window.player.addItem(healthItem02);
            window.player.useItem(i);
        }
    }, true);

    // Local inititalization variables.
    var mapImage = new Image();
    mapImage.src = 'map1.png';

    var playerSprite = new Image();
    playerSprite.src = 'character.png';

    window.worldSpace = new WorldSpace().create(ctx);
    window.worldSpace.setWorld(mapImage);

    window.player = new Player().create(worldSpace, {
        name: 'Juicebox', 
        level: 1,
        sprite: new Sprite({
            ctx: ctx,
            width: 448 / 7,
            height: 256 / 4,
            image: playerSprite
        }),
        position: {
            x: 50, 
            y: 10
        },
        health: 3
    });

    // Game loop.
    var think = function() {
        update();
        draw();

        requestAnimationFrame(think, window.canvas);
    };

    requestAnimationFrame(think, window.canvas);

    $("#up").mousedown(function(event) { currentInput.up = true; });
    $("#down").mousedown(function(event) { currentInput.down = true; });
    $("#right").mousedown(function(event) { currentInput.right = true; });
    $("#left").mousedown(function(event) { currentInput.left = true; });

    $("#up").mouseup(function(event) { currentInput.up = false; });
    $("#down").mouseup(function(event) { currentInput.down = false; });
    $("#right").mouseup(function(event) { currentInput.right = false; });
    $("#left").mouseup(function(event) { currentInput.left = false; });

};