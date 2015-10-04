var Item = {
	name: 'Default',
	type: undefined,
};

var createItem = function(itemProperties) {
	var thisItem	= Object.create(Item);

	thisItem.name	= itemProperties.name;
	thisItem.type	= itemProperties.type;
	thisItem.onUse	= itemProperties.onUse;

	thisItem.consumedOnUse = itemProperties.consumedOnUse;

	return thisItem;
};

var moneyItem1 = createItem({
	name: 'A lost wallet',
	type: 'generic',
	consumedOnUse: true,
	onUse: function(parent) {
		var minMoney = 75,
			maxMoney = 100;
		var amount = Math.floor(Math.random() * (maxMoney - minMoney) + minMoney);

		parent.wallet += amount;
		console.log('Received $' + amount);

		return true;
	}
});

var healthItem1 = createItem({
	name: 'Doctor\'s Bag',
	type: 'generic',
	consumedOnUse: true,
	onUse: function(parent) {

		// Check that we aren't already at max health.
		if (parent.health >= parent.maxHealth) {
			return {error: true, message: 'Already at max health.'};
		}

		// Set new health.
		parent.health += 75;

		// Check that we're not over max health
		if (parent.health >= parent.maxHealth) {
			parent.health = parent.maxHealth;
		}

		return true;
	}
});