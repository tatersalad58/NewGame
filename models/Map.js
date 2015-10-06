var Scene = function() {
    this.layers = [];
    this.tiles = [];
    this.renderLayer = function(layer) { };
    
    this.renderLayers = function(layers) { };
    
    this.loadTileset = function(json) { };

    this.load = function(name) {
        $.ajax({
            url: 'maps/' + name + '.json',
            type: 'JSONP'
        }).done(function(data) {
            console.log(data);
        });
    };
    
};

var s = new Scene();
var variable;
s.load("Test", variable);