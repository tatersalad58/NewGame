var Item = {
	name: 'Default',
	type: undefined,
};

var createItem = function(itemProperties) {
	var thisItem	= Object.create(Item);

	thisItem.name	= itemProperties.name;
	thisItem.type	= itemProperties.type;
	thisItem.onUse	= itemProperties.onUse;

	return thisItem;
};

var moneyItem1 = createItem({
	name: 'A lost wallet',
	type: 'generic',
	onUse: function(parent) {
		var minMoney = 75,
			maxMoney = 100;
		var amount = Math.floor(Math.random() * (maxMoney - minMoney) + minMoney);

		parent.wallet += amount;
		console.log('Received $' + amount);
	}
});