var Player = function(playerData) {
    this.name   = playerData.name;
    this.level  = playerData.level;

    this.posX = playerData.position.x || 0;
    this.posY = playerData.position.y || 0;


    this.model = new Image();
    this.model.src = playerData.model;

    this.width = 64;
    this.height = 88;

    this.draw = function() {
        ctx.save();
        this.width = ctx.measureText(this.name).width * 2;

        ctx.drawImage(this.model, this.posX, this.posY);
        
        ctx.restore();

        console.log(this.width, this.height);
    };

    this.setX = function(x) {
        if (x > canvas.width - this.width * 2) {
            this.posX = canvas.width - this.width * 2;
        }
        if (x < 0) {
            this.posX = 0;
        }
    };

    this.setY = function(y) {
        if (y > canvas.height - this.height) {
            this.posY = canvas.height - this.height;
        }
        if (y < 0) {
            this.posY = 0;
        }
    };

    this.setPositionOffset = function(x, y) {
        this.setX(this.posX += x);
        this.setY(this.posY += y);
    };
};