var Player = function() {
    var model   = new Image();
    var posX;
    var posY;
    var width;
    var height;
    var name;
    var level;
    var health;
    var wallet;
    var inventory;

    return {
        create: function(parent, playerData) {

            this.name   = playerData.name   || '';
            this.level  = playerData.level  || 1;

            this.posX = playerData.position.x || 0;
            this.posY = playerData.position.y || 0;

            model.src  = playerData.model;

            this.width  = 64;
            this.height = 88;

            this.wallet = 0;
            this.health = 100;

            this.inventory = [];
        
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
        },

        addItem: function(item) {
            return this.inventory.push(item);
        },

        hasItem: function(searchItem) {
            this.inventory.forEach(function(item) {
                if (item.name == searchItem.name) {
                    return true;
                }
            });
            return false;
        },

        useItem: function(itemIndex) {
            if (typeof this.inventory[itemIndex].onUse !== 'function') {
                return false;
            }
            this.inventory[itemIndex].onUse(this);
            return true;
        }
    };
};