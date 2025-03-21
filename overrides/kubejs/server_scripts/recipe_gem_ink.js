ServerEvents.recipes(e => {    
    e.remove({id:`create_wizardry:common_ink_mana_recipe`})
    e.remove({id:`create_wizardry:common_ink_recipe`})
    e.custom({
        type: "hexerei:mixingcauldron",
        liquid: {
            fluid: "minecraft:water",
          },
        ingredients:[
            {
                item:"irons_spellbooks:arcane_essence"
            },
            {
                item:"theurgy:mercury_shard"
            },
            {
                item:"apotheosis:common_material"
            },
            {
                item:"minecraft:black_dye"
            },
            {
                item:"irons_spellbooks:arcane_essence"
            },
            {
                item:"theurgy:mercury_shard"
            },
            {
                item:"apotheosis:common_material"
            },
            {
                item:"minecraft:black_dye"
            },
        ],
        output:{
            item:"apotheosis:common_material"
        },
        liquidOutput: {
            fluid: "create_wizardry:common_ink",
          },
        fluidLevelsConsumed: 1000,
        heatRequirement:"heated",
    })
})