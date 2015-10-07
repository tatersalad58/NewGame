// Item type enum.
var Item = {
    TYPE_GENERIC:       1 << 1,
    TYPE_CONSUMABLE:    1 << 2,
    TYPE_ARMOR:         1 << 3,
    TYPE_WEAPON:        1 << 4,
    TYPE_SOULBOUND:     1 << 5,
    TYPE_UNIQUE:        1 << 6,
};

/**
 *  @name           createItem
 *  @params         properties - Object of item initialization properties. 
 *  @description    Factory function to create items.
 *  @returns        The created item.
 *
 */
var createItem = function(itemProperties) {
    if (typeof itemProperties.id == 'undefined') {
        return false;
    }

    var thisItem            = {};
    thisItem.id             = itemProperties.id;
    thisItem.name           = itemProperties.name           || 'No Name';
    thisItem.type           = itemProperties.type           || Item.TYPE_GENERIC;
    thisItem.consumedOnUse  = itemProperties.consumedOnUse  || false;
    thisItem.onEquip        = itemProperties.onEquip;
    thisItem.onUse          = itemProperties.onUse;

    return thisItem;
};

var moneyItem1 = createItem({
    id: 1,
    name: 'Dropped wallet',
    type: Item.CONSUMABLE,
    consumedOnUse: true,

    onUse: function(parent) {
        var minMoney = 75,
            maxMoney = 100;
        var amount = Math.floor(Math.random() * (maxMoney - minMoney) + minMoney);

        parent.wallet += amount;

        return true;
    }
});

var healthItem01 = createItem({
    id: 2,
    name: 'Bottle of Vitamins',
    type: Item.CONSUMABLE,
    consumedOnUse: true,

    onUse: function(parent) {
        parent.addAura(healthRegen01);
        return true;
    }
});

var healthItem02 = createItem({
    id: 3,
    name: 'Syringe Injection',
    type: Item.CONSUMABLE,
    consumedOnUse: true,

    onUse: function(parent) {
        parent.addAura(healthRegen02);
        return true;
    }
});