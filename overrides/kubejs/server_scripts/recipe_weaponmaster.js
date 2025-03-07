ServerEvents.recipes(event => {
    event.remove({ id: 'weaponmaster:workstation' })
    event.remove({ id: 'weaponmaster:weaponkit' })

    event.shaped('weaponmaster:workstation', [
      'ABC', 
      'DDD'  
    ], {
      A: 'minecraft:lectern', 
      B: 'minecraft:grindstone', 
      C: 'minecraft:smithing_table',
      D: 'minecraft:stone_brick_slab' 
    }
  ),
    event.shaped('weaponmaster:weaponkit', [
    'CBC', 
    'BAB', 
    'CBC'  
  ], {
    A: 'minecraft:crafting_table', 
    B: 'minecraft:iron_ingot', 
    C: 'minecraft:leather'   
  }
)
})
