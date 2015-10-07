var Aura = {
    TYPE_BENEFICIAL:    1 << 1,
    TYPE_HARMFUL:       1 << 2,
};

var createAura = function(properties) {
    var thisAura            = {};
    thisAura.name           = properties.name       || 'No Name';
    thisAura.shortName      = properties.shortName  || 'No Name';
    thisAura.type           = properties.type       || undefined;
    thisAura.frequency      = properties.frequency  || undefined;
    thisAura.onAdd          = properties.onAdd      || undefined;
    thisAura.onRemoval      = properties.onRemoval  || undefined;
    thisAura.onTick         = properties.onTick     || undefined;
    thisAura.ticks          = 0;
    thisAura.timerId        = 0;

    return thisAura;
};

var healthRegen01 = createAura({

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
        console.log('Buff removed.');
    }
});

var healthRegen02 = createAura({

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