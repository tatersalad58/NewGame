var Sprite = function(options) {

    this.ctx = options.ctx;
    this.width = options.width;
    this.height = options.height;
    this.image = options.image;

    this.draw = function(spriteX, spriteY, screenX, screenY) {
        this.ctx.save();
        this.ctx.drawImage(this.image, spriteX * this.width, spriteY * this.height, this.width, this.height, screenX, screenY, this.width, this.height);
        this.ctx.restore();
    };
};