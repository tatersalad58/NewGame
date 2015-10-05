var Scene = function() {
    this.layers = [];

    this.renderLayer = function(layer) { };
    
    this.renderLayers = function(layers) { };
    
    this.loadTileset = function(json) { };

    this.load = function(name) {
        $.ajax({
            url: 'maps/' + name + '.json',
            type: 'JSON'
        }).done(function() {
            $.proxy(this.loadTileset, this);
        });
    };
};

var s = new Scene();