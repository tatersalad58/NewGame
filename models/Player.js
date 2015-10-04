var Player = function() {
    var uid     = '';
    var name    = '';
    var level   = 1;
    var posX    = 0;
    var posY    = 0;
    var width   = 0;
    var height  = 0;
    var model   = new Image();

    return {
        create: function(parent, playerData) {
            
            // https://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js
            this.uid = ('0000' + (Math.random() * Math.pow(36, 4) << 0).toString(36).slice(-4));

            this.name   = playerData.name   || '';
            this.level  = playerData.level  || 1;

            this.posX = playerData.position.x || 0;
            this.posY = playerData.position.y || 0;

            model.src  = playerData.model;

            this.width  = 64;
            this.height = 88;
        
            parent.addEntity(this);
            return this;
        },

        /**
         *  @name           Player.draw
         *  @description    Draws the representation of our character to the canvas.
         *
         */
        draw: function() {
            ctx.save();
            ctx.drawImage(model, this.posX, this.posY);
            ctx.restore();
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
            if (x > canvas.width - this.width * 2) {
                this.posX = canvas.width - this.width * 2;
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