var WorldSpace = function() {
    this.entities = [];
    this.ctx;
    this.map;

    /**
     *  @name           WorldSpace.create
     *  @params         parent - Canvas context element.
     *  @description    Create a new instance of a worldspace object.
     *  @returns        The new worldspace instance.
     *
     */
    this.create = function(parent) {
        this.ctx = parent;
        return this;
    };


    /**
     *  @name           WorldSpace.setWorld
     *  @params         world - Image object of the new world.
     *  @description    Changes the world actively drawn to the canvas, and clear the entities
     *                  on the world.
     *
     */
    this.setWorld = function(world) {
        if (world instanceof Image) {
            this.map = world;
            this.entities = [];
        }
    };

    /**
     *  @name           WorldSpace.drawAll
     *  @description    Draws the world, and calls the draw method of all entities in this worldspace.
     *
     */
    this.drawAll = function() {
        this.ctx.drawImage(this.map, 0, 0);

        this.entities.forEach(function(entity) {
            entity.draw();
        });
    };

    /**
     *  @name           WorldSpace.addEntity
     *  @description    Pushes an entity to the tracked entities in this worldspace instance.
     *
     */
    this.addEntity = function(entity) {
        this.entities.push(entity);
    };

    /**
     *  @name           WorldSpace.remoteEntity
     *  @params         entityId - The index of the element in the array of entities of this worldspace.
     *  @description    Removes and cleans up an entity in this worldspace.
     *  @returns        True if the entity was removed, false if not.
     *
     */
    this.removeEntity = function(entityId) {
        var object = this.entities[entityId];

        if (typeof this.entities[entityId] == 'object') {
            this.entities.splice(entityId, 1);    
            return true;
        }
        return false;
    };
};