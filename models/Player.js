var Player = function() {
    var model   = new Image();
    var posX;
    var posY;
    var width;
    var height;
    var name;
    var level;
    var health;
    var maxHealth;
    var wallet;
    var inventory;

    return {

        /**
         *  @name           Player.create
         *  @description    Factory to create players.
         *  @params         parent - Reference to the world the player exists in.
         *                  playerData - Object of key-value pairs to initialize the
         *                      player's stats.  Allowable values: model, position.x,
         *                      position.y, name, level, wallet, health.
         *  @return         this - The created player.
         *
         */
        create: function(parent, playerData) {
            model.src  = playerData.model;
            this.posX = playerData.position.x || 0;
            this.posY = playerData.position.y || 0;
            this.width  = 64;
            this.height = 88;

            this.name   = playerData.name   || '';
            this.level  = playerData.level  || 1;
            this.wallet = playerData.wallet || 0;
            this.maxHealth = playerData.maxHealth || 100;
            this.health = this.maxHealth;
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
         *  @description        Changes the x-coordinate of the player object on the canvas.
         *                      Checks to make sure that the coordinate is within bounds of
         *                      the playable area.
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
         *  @description        Changes the y-coordinate of the player object on the canvas.
         *                      Checks to make sure that the coordinate is within bounds of
         *                      the playable area.
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

        /**
         *  @name           Player.addItem()
         *  @params         item - Full object of an item to add to the player's inventory.
         *  @description    Adds an item to the player's inventory.
         *  @return         The index of the created item in the player's inventory.
         *
         */
        addItem: function(item) {
            return this.inventory.push(item) - 1;
        },

        /**
         *  @name           Player.useItem()
         *  @params         itemIndex - the index of the item in the player's inventory to use.
         *  @description    Calls the onUse method of an object in the player's inventory.
         *  @return         True if the item was used, false if the item could not be used.
         *
         */
        useItem: function(itemIndex) {
            if (typeof this.inventory[itemIndex].onUse !== 'function') {
                return false;
            }
            this.inventory[itemIndex].onUse(this);
            return true;
        }
    };
};