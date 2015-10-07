var Player = function() {
    var posX;
    var posY;
    var width;
    var height;
    var sprite;
    var direction;

    var uid;
    var name;
    var level;
    var health;
    var maxHealth;
    var wallet;
    var inventory;
    var auras;
    
    var facing = {
        up:     [0, 0],
        left:   [0, 1],
        down:   [0, 2],
        right:  [0, 3]        
    };

    return {

        createUID: function() {

        },

        /**
         *  @name           Player.create
         *  @params         parent - Canvas context element.
         *                  playerData - Object of player initialization data.
         *
         *
         */
        create: function(parent, playerData) {

            this.uid = 'xxxx-yxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });

            this.name   = playerData.name   || 'New001';
            this.level  = playerData.level  || 1;

            this.posX = playerData.position.x || 0;
            this.posY = playerData.position.y || 0;

            this.sprite = playerData.sprite || {};

            this.width  = 64;
            this.height = 88;

            this.direction = playerData.facing || 'down';

            this.health = playerData.health || 100;
            this.maxHealth = playerData.maxHealth || 100;
            this.wallet = playerData.wallet || 0;
            
            this.inventory = [];
            this.auras = [];

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
        },

        /**
         *  @name           Player.addItem
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
            if (typeof this.inventory[itemIndex].onUse != 'function') {
                return false;
            }

            var item = this.inventory[itemIndex];
            var result = item.onUse(this);

            if (result.error === true) {
                console.log(result.message);
                return false;
            }

            if (item.consumedOnUse === true) {
                this.inventory.splice(itemIndex, 1);
            }

            return true;
        },

        addAura: function(aura) {
            var auraId = this.auras.push(aura);
            aura.onAdd(this);
        },

        removeAura: function(auraId) {
            if (typeof this.auras[auraId] != 'object') {
                return false;
            }

            this.auras[auraId].splice(auraId, 1);
            this.auras[auraId].onRemove(this);
        },

        addHealth: function(amount) {
            if (this.health >= this.maxHealth) {
                return false;
            }

            this.health += amount;

            if (this.health > this.maxHealth) {
                this.health = this.maxHealth;
            }
        }
    };
};