var Item = {
	TYPE_GENERIC: 	 	1 << 1,
	TYPE_CONSUMABLE: 	1 << 2,
	TYPE_ARMOR: 	 	1 << 3,
	TYPE_WEAPON: 		1 << 4,
	TYPE_SOULBOUND: 	1 << 5,
	TYPE_UNIQUE: 		1 << 6,
};

var createItem = function(itemProperties) {
	var thisItem	= {};

	thisItem.name	= itemProperties.name;
	thisItem.type	= itemProperties.type;
	thisItem.onUse	= itemProperties.onUse;
	thisItem.onEquip = itemProperties.onEquip;

	thisItem.consumedOnUse = itemProperties.consumedOnUse;

	return thisItem;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

var moneyItem1 = createItem({
	name: 'A lost wallet',
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
	name: 'Bottle of Vitamins',
	type: Item.CONSUMABLE,
	consumedOnUse: true,

	onUse: function(parent) {
		parent.addAura(healthRegen01);
		return true;
	}
});

var healthItem02 = createItem({
	name: 'Syringe Injection',
	type: Item.CONSUMABLE,
	consumedOnUse: true,

	onUse: function(parent) {
		parent.addAura(healthRegen02);
		return true;
	}
});