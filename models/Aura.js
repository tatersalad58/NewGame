// Aura type enum.
var Aura = {
    TYPE_BENEFICIAL:    1 << 1,
    TYPE_HARMFUL:       1 << 2,
};

/**
 *  @name           createAura
 *  @params         properties - Object of aura initialization properties. 
 *  @description    Factory function to create auras.
 *  @returns        The created aura.
 *
 */
var createAura = function(properties) {
    if (typeof properties.id == 'undefined') {
        return false;
    }

    var thisAura            = {};
    thisAura.id             = properties.id;
    thisAura.name           = properties.name       || 'No Name';
    thisAura.shortName      = properties.shortName  || 'No Name';
    thisAura.type           = properties.type;
    thisAura.frequency      = properties.frequency;
    thisAura.onAdd          = properties.onAdd;
    thisAura.onRemoval      = properties.onRemoval;
    thisAura.onTick         = properties.onTick;
    thisAura.ticks          = 0;
    thisAura.timerId        = 0;

    return thisAura;
};

var healthRegen01 = createAura({
    id: 1,
    shortName: 'HealthRegen01',
    name: 'Bottle of Vitamins Regeneration',
    type: Aura.TYPE_BENEFICIAL,
    frequency: 1000,

    onAdd: function(parent) {
        this.timerId = setInterval(this.onTick, this.frequency, this, parent);
    },

    onTick: function(self, parent) {
        self.ticks++;
        parent.addHealth(5);
        if (self.ticks >= 10) {
            self.onRemoval(parent);
        }
    },

    onRemoval: function(parent) {
        clearInterval(this.timerId);
    }
});

var healthRegen02 = createAura({
    id: 2,
    shortName: 'HealthRegen02',
    name: 'Syringe Injection Regeneration',
    type: Aura.TYPE_BENEFICIAL,
    frequency: 500,

    onAdd: function(parent) {
        this.timerId = setInterval(this.onTick, this.frequency, this, parent);
    },

    onTick: function(self, parent) {
        self.ticks++;
        parent.addHealth(3);
        if (self.ticks == 10) {
            self.onRemoval(parent);
        }
    },

    onRemoval: function(parent) {
        clearInterval(this.timerId);
    }
});