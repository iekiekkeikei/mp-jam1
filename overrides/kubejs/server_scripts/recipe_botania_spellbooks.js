ServerEvents.tags('item', event => {  
    event.add('forge:mana_ingot', 'irons_spellbooks:arcane_ingot')
    event.add('forge:mana_ingot', 'botania:manasteel_ingot')
  })
ServerEvents.recipes(event => {
    //event.remove({ output: 'irons_spellbooks:arcane_ingot' })
    event.replaceInput(
        { input: 'irons_spellbooks:arcane_ingot' },
        'irons_spellbooks:arcane_ingot',
        '#forge:mana_ingot'
    )
    event.replaceInput(
        { input: 'botania:manasteel_ingot' },
        'botania:manasteel_ingot',
        '#forge:mana_ingot'
    )
})