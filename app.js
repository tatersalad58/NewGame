var canvas  = document.getElementById('gameContent');
var ctx     = canvas.getContext('2d');

/**
 *  @name           update()
 *  @description    Updates the state of the game.
 *
 */
var update = function() {
    var currentInput = window.currentInput;
    var player = window.player;

    if (currentInput.right) { 
        player.setX(player.posX += 3); 
        player.direction = 'right';
    }
    if (currentInput.down)  { 
        player.setY(player.posY += 3); 
        player.direction = 'down';
    }
    if (currentInput.up)    { 
        player.setY(player.posY -= 3); 
        player.direction = 'up';
    }
    if (currentInput.left)  {
        player.setX(player.posX -= 3); 
        player.direction = 'left';
    }
};

/**
 *  @name           draw()
 *  @description    Draws the current state of the game to the canvas.
 *
 */
var draw = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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

        // Debug
        if (event.keyCode == 73) {
            var i = window.player.addItem(moneyItem1);
            window.player.useItem(i);
        }
    }, true);

    window.addEventListener('keyup', function(event) {
        if (event.keyCode == 37) { currentInput.left    = false; }
        if (event.keyCode == 38) { currentInput.up      = false; }
        if (event.keyCode == 39) { currentInput.right   = false; }
        if (event.keyCode == 40) { currentInput.down    = false; }
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

    // TEST
    var item = window.player.addItem(healthItem02);
    window.player.useItem(item);

    // Game loop.
    var think = function() {
        update();
        draw();

        requestAnimationFrame(think, canvas);
    };

    requestAnimationFrame(think, canvas);
};