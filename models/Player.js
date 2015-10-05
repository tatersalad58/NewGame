var Player = function() {
    var uid     = '';
    var name    = '';
    var level   = 1;
    var posX    = 0;
    var posY    = 0;
    var width   = 0;
    var height  = 0;
    var sprite  = {};
    var direction = '';

    var facing = {
        up:     [0, 0],
        left:   [0, 1],
        down:   [0, 2],
        right:  [0, 3]        
    };

    return {

        /**
         *  @name           Player.create
         *  @params         parent - Canvas context element.
         *                  playerData - Object of player initialization data.
         *
         *
         */
        create: function(parent, playerData) {
            this.name   = playerData.name   || '';
            this.level  = playerData.level  || 1;

            this.posX = playerData.position.x || 0;
            this.posY = playerData.position.y || 0;

            this.sprite = playerData.sprite;

            this.width  = 64;
            this.height = 88;

            this.direction = playerData.facing || 'down';
        
            parent.addEntity(this);
            return this;
        },

        /**
         *  @name           Player.draw
         *  @description    Draws the representation of our character to the canvas.
         *
         */
        draw: function() {
            if (this.direction == 'left') {
                this.sprite.draw(facing.left[0], facing.left[1], this.posX, this.posY);
            }
            else if (this.direction == 'right') {
                this.sprite.draw(facing.right[0], facing.right[1], this.posX, this.posY);
            }
            else if (this.direction == 'up') {
                this.sprite.draw(facing.up[0], facing.up[1], this.posX, this.posY);
            }
            else if (this.direction == 'down') {
                this.sprite.draw(facing.down[0], facing.down[1], this.posX, this.posY);
            }
            
        },

        /**
         *  @name           Player.setX
         *  @params         x - The new x-coordinate on the canvas.
         *  @description    Changes the x-coordinate of the player object on the canvas.
         *                  Checks to make sure that the coordinate is within bounds of
         *                  the playable area.
         *
         */
        setX: function(x) {
            if (x > canvas.width - this.width) {
                this.posX = canvas.width - this.width;
            }
            if (x < 0) {
                this.posX = 0;
            }
        },

        /**
         *  @name           Player.setY
         *  @params         y - The new y-coordinate on the canvas.
         *  @description    Changes the y-coordinate of the player object on the canvas.
         *                  Checks to make sure that the coordinate is within bounds of
         *                  the playable area.
         *
         */
        setY: function(y) {
            if (y > canvas.height - this.height) {
                this.posY = canvas.height - this.height;
            }
            if (y < 0) {
                this.posY = 0;
            }
        },

        /**
         *  @name           Player.setPositionOffset
         *  @params         x - The x-coordinate offset.
         *                  y - The y-coordinate offset.
         *  @description    Helper function to offset the player's position.
         *
         */
        setPositionOffset: function(x, y) {
            this.setX(this.posX += x);
            this.setY(this.posY += y);
        }
    };
};