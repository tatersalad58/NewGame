var WorldSpace = function() {
	this.entities = [];

	this.drawAll = function() {
		this.entities.forEach(function(entity) {
			entity.draw();
		});
	};

	this.addEntity = function(entity) {
		this.entities.push(entity);
	};

	this.removeEntity = function(entityId) {
		for (i = 0; i < this.entities.length; i++) {
			if (this.entities[i].uid == entityId) {
				this.entities.splice(i, 1);
			}
		}
	};
};