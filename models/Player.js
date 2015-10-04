var Player = function(playerData) {

    this.name   = playerData.name   || '';
    this.level  = playerData.level  || 1;

    this.posX = playerData.position.x || 0;
    this.posY = playerData.position.y || 0;

    this.model      = new Image();
    this.model.src  = playerData.model;

    this.width  = 64;
    this.height = 88;

    /**
     *  @name           Player.draw
     *  @description    Draws the representation of our character to the canvas.
     *
     */
    this.draw = function() {
        ctx.save();
        ctx.drawImage(this.model, this.posX, this.posY);
        ctx.restore();
    };

    /**
     *  @name           Player.setX
     *  @params         x - The new x-coordinate on the canvas.
     *  @description    Changes the x-coordinate of the player object on the canvas.
     *                  Checks to make sure that the coordinate is within bounds of
     *                  the playable area.
     *
     */
    this.setX = function(x) {
        if (x > canvas.width - this.width) {
            this.posX = canvas.width - this.width;
        }
        if (x < 0) {
            this.posX = 0;
        }
    };

    /**
     *  @name           Player.setY
     *  @params         y - The new y-coordinate on the canvas.
     *  @description    Changes the y-coordinate of the player object on the canvas.
     *                  Checks to make sure that the coordinate is within bounds of
     *                  the playable area.
     *
     */
    this.setY = function(y) {
        if (y > canvas.height - this.height) {
            this.posY = canvas.height - this.height;
        }
        if (y < 0) {
            this.posY = 0;
        }
    };

    /**
     *  @name           Player.setPositionOffset
     *  @params         x - The x-coordinate offset.
     *                  y - The y-coordinate offset.
     *  @description    Helper function to offset the player's position.
     *
     */
    this.setPositionOffset = function(x, y) {
        this.setX(this.posX += x);
        this.setY(this.posY += y);
    };
};