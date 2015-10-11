var WorldSpace = function() {

    /**
     *  @name           WorldSpace.create
     *  @params         context - Canvas context element.
     *  @description    Create a new instance of a worldspace object.
     *  @returns        The new worldspace instance.
     *
     */
    this.create = function(context) {
        this.entities   = []; //
        this.tileSet    = []; // Map Object
        this.tileData   = []; // Sprite offsets

        this.mapImage   = new Image();
        
        this.offsetX    = 0;
        this.offsetY    = 0;
        
        this.tileHeight = 0;
        this.tileWidth  = 0;

        this.ctx = context;

        return this;
    };

    /**
     *  @name           WorldSpace.setWorld
     *  @params         world - JSON-encoded world object.
     *  @description    Changes the world actively drawn to the canvas, and clear the entities
     *                  on the world.
     *
     */
    this.setWorld = function(world) {

        // Clear entities.
        this.entities = [];

        this.tileWidth  = world.tilewidth;
        this.tileHeight = world.tileheight;

        this.tileCountX = world.tilesets[0].imagewidth / this.tileWidth;
        this.tileCountY = world.tilesets[0].imageheight / this.tileHeight;

        this.mapImage.src = 'maps/' + world.tilesets[0].image;
        this.tileSet      = world.layers[0].data;        

        var currentRow      = 0,
            currentColumn   = 0,
            self            = this;

        this.tileSet.forEach(function(tile) {
            var posX = 0,
                posY = 0;

            posX = currentColumn * self.tileWidth;
            posY = currentRow    * self.tileHeight;

            if (currentColumn >= self.tileCountX) {
                currentColumn = 0;
                currentRow++;
            }
            else {
                currentColumn++;    
            }

            self.tileData.push([posX, posY]);
        });

        console.log(this);

        /*
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function() {
            if (httpRequest.readyState === 4) {
                if (httpRequest.status === 200) {
                    this.mapData = JSON.parse(httpRequest.resonseText);
                    
                    this.tileHeight = this.mapData.tileheight;
                    this.tileWidth = this.mapData.tilewidth;

                    this.mapData.layers[0].data.forEach(function(tile) {
                        console.log(tile);
                    });
                    console.log(this.mapData);
                }
            }
        };
        httpRequest.open('GET', 'maps/' + world + '.json');
        httpRequest.send();
        */
    };

    /**
     *  @name           WorldSpace.drawAll
     *  @description    Draws the world, and calls the draw method of all entities in this worldspace.
     *
     */
    this.drawAll = function() {
        var ctx = this.ctx;
        ctx.save();

        var currentRow      = 0,
            currentColumn   = 0,
            self = this;

        this.tileSet.forEach(function(tile) {
            // console.log(self.tileData[tile]);

            ctx.drawImage(
                self.mapImage,
                self.tileData[tile][0],
                self.tileData[tile][1],
                self.tileWidth,
                self.tileHeight,
                currentColumn * self.tileWidth,
                currentRow  * self.tileHeight,
                self.tileWidth,
                self.tileHeight
            );

            if (currentColumn >= this.tileCountX) {
                currentColumn = 0;
                currentRow++;
            }
            else {
                currentColumn++;
            }

        });

        ctx.restore();
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

var overworld = { 
 "height":32,
 "layers":[
        {
         "data":[80, 80, 95, 95, 80, 96, 96, 95, 80, 96, 96, 80, 79, 80, 96, 96, 95, 95, 95, 96, 80, 95, 80, 95, 95, 79, 79, 79, 79, 80, 96, 79, 95, 95, 95, 95, 79, 79, 80, 80, 80, 96, 95, 79, 79, 96, 80, 80, 80, 79, 80, 95, 79, 95, 79, 79, 79, 79, 79, 95, 80, 95, 80, 79, 79, 96, 27, 11, 43, 11, 43, 11, 11, 27, 43, 27, 11, 11, 11, 43, 11, 27, 11, 27, 27, 43, 27, 43, 27, 43, 11, 11, 27, 43, 79, 79, 79, 80, 80, 96, 80, 96, 80, 79, 95, 95, 79, 95, 79, 96, 79, 79, 96, 95, 96, 79, 79, 95, 79, 79, 95, 80, 79, 95, 79, 95, 79, 95, 95, 79, 80, 79, 95, 95, 95, 80, 96, 79, 95, 95, 80, 96, 80, 95, 95, 95, 95, 79, 95, 79, 80, 79, 96, 96, 96, 79, 80, 80, 95, 79, 96, 80, 95, 79, 79, 95, 79, 95, 95, 79, 79, 79, 96, 96, 96, 79, 95, 79, 95, 96, 80, 80, 79, 80, 80, 80, 79, 79, 96, 95, 80, 96, 80, 80, 96, 43, 11, 11, 11, 43, 11, 43, 43, 11, 80, 80, 96, 95, 80, 79, 80, 96, 95, 96, 27, 43, 27, 43, 27, 43, 27, 96, 79, 79, 80, 79, 96, 80, 96, 79, 96, 27, 80, 80, 80, 79, 96, 79, 79, 96, 96, 79, 79, 96, 95, 80, 27, 95, 95, 95, 80, 96, 95, 95, 95, 96, 79, 95, 95, 95, 80, 96, 79, 11, 79, 79, 79, 95, 95, 95, 80, 80, 95, 95, 95, 96, 96, 96, 27, 79, 95, 80, 96, 96, 96, 79, 80, 79, 95, 80, 96, 95, 80, 95, 80, 11, 96, 96, 95, 96, 95, 79, 95, 96, 80, 96, 80, 96, 79, 96, 27, 80, 96, 96, 96, 95, 79, 95, 80, 95, 96, 79, 95, 80, 95, 96, 80, 11, 80, 96, 80, 79, 96, 96, 80, 96, 95, 96, 79, 95, 96, 96, 27, 27, 27, 11, 11, 43, 27, 80, 80, 95, 96, 95, 96, 96, 79, 95, 79, 27, 95, 95, 95, 96, 95, 95, 80, 79, 96, 96, 95, 95, 95, 95, 27, 79, 95, 79, 95, 80, 96, 95, 79, 96, 96, 96, 80, 96, 95, 95, 95, 43, 95, 79, 95, 96, 80, 96, 80, 95, 95, 79, 95, 79, 79, 80, 43, 96, 95, 80, 79, 79, 79, 96, 79, 95, 80, 80, 96, 79, 79, 95, 79, 11, 95, 80, 80, 79, 80, 95, 80, 80, 79, 95, 95, 80, 95, 80, 11, 79, 95, 80, 80, 95, 96, 95, 79, 95, 79, 96, 80, 80, 96, 95, 95, 43, 95, 96, 79, 79, 80, 80, 80, 80, 80, 96, 95, 96, 96, 95, 27, 11, 27, 27, 43, 11, 43, 95, 95, 80, 95, 96, 80, 80, 80, 96, 95, 95, 96, 96, 80, 95, 79, 96, 96, 79, 80, 79, 96, 79, 96, 80, 80, 79, 80, 95, 96, 80, 79, 80, 95, 79, 95, 79, 95, 96, 96, 95, 80, 79, 79, 79, 96, 96, 80, 80, 95, 79, 95, 95, 96, 96, 95, 96, 95, 96, 96, 80, 96, 95, 79, 95, 95, 96, 80, 79, 80, 80, 96, 80, 95, 96, 95, 79, 95, 96, 95, 79, 95, 96, 79, 80, 80, 95, 96, 96, 95, 79, 95, 95, 95, 80, 95, 80, 80, 96, 96, 96, 96, 43, 43, 43, 27, 27, 11, 43, 43, 11, 96, 80, 79, 79, 80, 95, 79, 96, 96, 95, 43, 27, 43, 27, 43, 11, 43, 96, 80, 79, 80, 96, 95, 27, 80, 96, 80, 95, 80, 79, 95, 43, 80, 96, 96, 80, 95, 96, 95, 79, 95, 95, 95, 79, 80, 43, 95, 95, 96, 96, 95, 80, 79, 95, 96, 27, 79, 95, 96, 80, 80, 79, 80, 95, 80, 80, 95, 95, 79, 96, 79, 79, 96, 96, 95, 79, 79, 11, 95, 79, 79, 80, 80, 79, 95, 80, 80, 11, 80, 96, 95, 80, 96, 80, 79, 95, 79, 95, 79, 80, 95, 79, 96, 95, 80, 96, 95, 79, 95, 27, 79, 95, 95, 79, 80, 95, 95, 80, 80, 43, 43, 27, 27, 11, 27, 27, 11, 11, 80, 95, 80, 79, 95, 95, 80, 95, 96, 96, 95, 80, 96, 43, 95, 96, 95, 95, 96, 79, 80, 80, 79, 80, 95, 80, 80, 80, 96, 96, 96, 43, 96, 95, 96, 80, 95, 80, 95, 80, 96, 79, 80, 95, 80, 43, 96, 79, 79, 96, 96, 95, 79, 79, 80, 79, 79, 95, 79, 95, 80, 79, 79, 43, 80, 79, 96, 95, 96, 79, 80, 96, 79, 95, 96, 80, 96, 43, 79, 95, 95, 79, 80, 79, 95, 79, 95, 80, 80, 80, 80, 95, 79, 79, 79, 27, 95, 80, 79, 95, 79, 79, 79, 80, 79, 79, 80, 95, 80, 11, 79, 80, 96, 95, 80, 95, 79, 96, 80, 43, 80, 95, 79, 96, 96, 79, 95, 11, 95, 95, 80, 79, 96, 80, 80, 79, 96, 80, 96, 80, 80, 11, 96, 80, 79, 95, 95, 80, 95, 79, 95, 11, 11, 11, 27, 27, 27, 43, 11, 43, 79, 95, 80, 79, 80, 80, 79, 96, 80, 79, 79, 96, 79, 27, 95, 80, 96, 80, 95, 80, 95, 96, 95, 80, 95, 80, 96, 80, 95, 95, 80, 80, 95, 96, 80, 96, 96, 95, 79, 79, 95, 95, 95, 96, 95, 95, 80, 80, 80, 80, 95, 96, 96, 96, 96, 95, 95, 79, 95, 79, 79, 96, 95, 79, 96, 80, 96, 80, 80, 96, 96, 80, 95, 79, 80, 80, 80, 96, 96, 95, 96, 96, 80, 96, 95, 96, 95, 79, 95, 96, 79, 95, 79, 95, 95, 95, 96, 80, 96, 96, 96, 96, 96, 79, 96, 96, 80, 80, 79, 79, 80, 95, 79, 79, 95, 96, 96, 80, 96, 80, 96, 80, 79, 96, 95, 96, 95, 96, 79, 95, 95, 79, 79, 80, 80, 79, 80, 79, 95, 95, 95, 79, 79, 79, 96, 79, 95, 80],
         "height":32,
         "name":"Tile Layer 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":32,
         "x":0,
         "y":0
        }],
 "nextobjectid":1,
 "orientation":"orthogonal",
 "properties":
    {

    },
 "renderorder":"right-down",
 "tileheight":32,
 "tilesets":[
        {
         "firstgid":1,
         "image":"image_2.png",
         "imageheight":512,
         "imagewidth":512,
         "margin":0,
         "name":"hyptosis_tile-art-batch-1",
         "properties":
            {

            },
         "spacing":0,
         "tilecount":256,
         "tileheight":32,
         "tilewidth":32
        }],
 "tilewidth":32,
 "version":1,
 "width":32
};