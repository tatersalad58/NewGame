var Player = function(name, level) {
	this.name	= name;
	this.level	= level;

	this.posX = 0;
	this.posY = 0;

	this.width = 50;
	this.height = 50;

	this.draw = function() {
		ctx.save();
		this.width = ctx.measureText(this.name).width * 2;

		ctx.fillStyle = 'black';
		ctx.fillRect(this.posX, this.posY, this.width, this.height);

		ctx.fillStyle = 'white';
		ctx.fillText(this.name, this.posX + (this.width / 4), this.posY + (this.height / 2));
		
		ctx.restore();
	};

	this.setX = function(x) {
		if (x > canvas.width - this.width) {
			this.posX = canvas.width - this.width;
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
}