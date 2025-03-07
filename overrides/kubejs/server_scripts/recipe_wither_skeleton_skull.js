ServerEvents.recipes(e => {
    e.custom({
        type: "hexerei:mixingcauldron",
        liquid: {
            fluid: "theurgy:sal_ammoniac",
          },
        ingredients:[
            {
                item:"minecraft:player_head"
            },
            {
                item:"hexerei:blood_bottle"
            },
            {
                item:"theurgy:mercury_shard"
            },
            {
                item:"iceandfire:witherbone"
            },
            {
                item:"minecraft:soul_lantern"
            },
            {
                item:"hexerei:blood_bottle"
            },
            {
                item:"theurgy:mercury_shard"
            },
            {
                item:"iceandfire:witherbone"
            },
        ],
        output:{
            item:"minecraft:wither_skeleton_skull"
        },
        liquidOutput: {
            fluid: "minecraft:water",
          },
        fluidLevelsConsumed: 1000,
        heatRequirement:"heated",
    })
})