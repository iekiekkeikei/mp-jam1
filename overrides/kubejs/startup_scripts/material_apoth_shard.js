StartupEvents.registry('item', (event) => {
	event.create('apoth_common_sulfur', 'theurgy:alchemical_sulfur')
		.sourceItem('apotheosis:common_material') //uncommon,rare,epic,mythic
		.sourceName("Mysterious Scrap Metal") //Timeworn Fabric,Luminous Crystal Shard,Arcane Sands,Godforged Pearl
		.sulfurTier("abundant") //uncommon,rare.precious
		.sulfurType("gems") //apotheosis
})

StartupEvents.registry('item', (event) => {
	event.create('apoth_uncommon_sulfur', 'theurgy:alchemical_sulfur')
		.sourceItem('apotheosis:uncommon_material') //rare,epic,mythic
		.sourceName("Timeworn Fabric") //Luminous Crystal Shard,Arcane Sands,Godforged Pearl
		.sulfurTier("common") //rare.precious
		.sulfurType("gems") //apotheosis
})

StartupEvents.registry('item', (event) => {
	event.create('apoth_rare_sulfur', 'theurgy:alchemical_sulfur')
		.sourceItem('apotheosis:rare_material') //epic,mythic
		.sourceName("Luminous Crystal Shard") //Arcane Sands,Godforged Pearl
		.sulfurTier("rare") //precious
		.sulfurType("gems") //apotheosis
})

StartupEvents.registry('item', (event) => {
	event.create('apoth_epic_sulfur', 'theurgy:alchemical_sulfur')
		.sourceItem('apotheosis:epic_material') //mythic
		.sourceName("Arcane Sands") //Godforged Pearl
		.sulfurTier("precious") 
		.sulfurType("gems") //apotheosis
})