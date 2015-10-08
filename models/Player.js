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
    var armor;
    var inventory;
    var auras;

    var parent;
    
    var facing = {
        up:     [0, 0],
        left:   [0, 1],
        down:   [0, 2],
        right:  [0, 3]        
    };

    return {

        /**
         *  @name           Player.create
         *  @params         parent - WorldSpace instance that the player will exist in.
         *                  playerData - Object of player initialization data.
         *
         */
        create: function(parent, playerData) {
            this.uid = 'xxxx-yxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });

            this.width      = 64;
            this.height     = 88;
            this.posX       = playerData.position.x     || 0;
            this.posY       = playerData.position.y     || 0;
            this.sprite     = playerData.sprite         || {};
            this.direction  = playerData.facing         || 'down';

            this.name       = playerData.name           || 'New001';
            this.level      = playerData.level          || 1;
            this.health     = playerData.health         || 100;
            this.maxHealth  = playerData.maxHealth      || 100;
            this.wallet     = playerData.wallet         || 0;
            this.armor      = playerData.armor          || 0;
            this.inventory  = [];
            this.auras      = [];

            this.parent = parent;

            parent.addEntity(this);
            return this;
        },

        /**
         *  @name           Player.draw
         *  @description    Draws the representation of our character to the canvas.
         *
         */
        draw: function() {
            var center = [window.canvas.width / 2, window.canvas.height / 2];

            if (this.direction == 'left') {
                this.sprite.draw(facing.left[0], facing.left[1], center[0], center[1]);
            }
            else if (this.direction == 'right') {
                this.sprite.draw(facing.right[0], facing.right[1], center[0], center[1]);
            }
            else if (this.direction == 'up') {
                this.sprite.draw(facing.up[0], facing.up[1], center[0], center[1]);
            }
            else if (this.direction == 'down') {
                this.sprite.draw(facing.down[0], facing.down[1], center[0], center[1]);
            }
        },

        /**
         *  @name           Player.setX
         *  @params         offset - This object's new x-coordinate.
         *  @description    Draws the canvas to be relative to the player's position in the world.
         *
         */
        setX: function(offset) {
            this.parent.offsetX -= offset;
        },

        /**
         *  @name           Player.setY
         *  @params         offset - This object's new y-coordinate.
         *  @description    Draws the canvas to be relative to the player's position in the world.
         *
         */
        setY: function(offset) {
            this.parent.offsetY -= offset;
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
         *  @name           Player.useItem
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

        /**
         *  @name           Player.addAura
         *  @params         aura - Initialized aura object.
         *  @description    Adds an aura to the player and calls it's activation method.
         *
         */
        addAura: function(aura) {
            var auraId = this.auras.push(aura);
            aura.onAdd(this);
        },

        /**
         *  @name           Player.removeAura
         *  @params         auraId - The index of the aura.
         *  @description    Checks that the player has the given aura index, removes it, and
         *                  calls it's removal method.
         *
         */
        removeAura: function(auraId) {
            if (typeof this.auras[auraId] != 'object') {
                return false;
            }

            this.auras[auraId].splice(auraId, 1);
            this.auras[auraId].onRemove(this);
        },

        /**
         *  @name           Player.addHealth
         *  @params         amount - Amount of health to add.
         *  @description    Adds a given amount of healths to a player, and checks that it doesn't
         *                  go over the player's maxiumum health.
         *
         */
        addHealth: function(amount) {
            if (this.health >= this.maxHealth) {
                return false;
            }

            this.health += amount;

            if (this.health > this.maxHealth) {
                this.health = this.maxHealth;
            }
        },

        /**
         *  @name           Player.addHealth
         *  @params         amount - Amount of health to add.
         *  @description    Adds a given amount of healths to a player, and checks that it doesn't
         *                  go over the player's maxiumum health.
         *
         */
        removeHealth: function(amount) {
            var mitigatedDamage = 0.003875 * this.armor;

            if (mitigatedDamage > amount * 0.80) {
                mitigatedDamage = amount * 0.80;
            }

            this.health -= (amount - mitigatedDamage) > 0 ? amount - mitigatedDamage : 0;
            console.log('Blocked ' + mitigatedDamage + ' damage.');

            if (this.health < 0) {
                this.health = 0;
            }
        }
    };
};