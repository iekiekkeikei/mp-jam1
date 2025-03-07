ServerEvents.recipes(event => {
    event.remove({ id: 'map_atlases:craft_atlas' })
    event.remove({ id: 'minecraft:map' })

    event.shapeless('2x minecraft:map', [
        '4x minecraft:paper', 
        '2x minecraft:black_dye'
      ]),
    event.shapeless('map_atlases:atlas', [
        '3x minecraft:map', 
        'minecraft:leather'
      ])
})
