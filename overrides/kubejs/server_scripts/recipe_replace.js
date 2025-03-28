ServerEvents.tags('item', event => {
    event.add('kubejs:mana_cloth', 'irons_spellbooks:magic_cloth')
    event.add('kubejs:mana_cloth', 'botania:manaweave_cloth')
  })
ServerEvents.recipes(event => {
    event.replaceInput(
        { input: 'irons_spellbooks:magic_cloth' },
        'irons_spellbooks:magic_cloth',
        '#kubejs:mana_cloth'
    )
    event.replaceInput(
        { input: 'botania:manaweave_cloth' },
        'botania:manaweave_cloth',
        '#kubejs:mana_cloth'
    )
})

ServerEvents.tags('item', event => {
    event.add('kubejs:mana_ingot', 'irons_spellbooks:arcane_ingot')
    event.add('kubejs:mana_ingot', 'botania:manasteel_ingot')
  })
ServerEvents.recipes(event => {
    //event.remove({ output: 'irons_spellbooks:arcane_ingot' })
    event.replaceInput(
        { input: 'irons_spellbooks:arcane_ingot' },
        'irons_spellbooks:arcane_ingot',
        '#kubejs:mana_ingot'
    )
    event.replaceInput(
        { input: 'botania:manasteel_ingot' },
        'botania:manasteel_ingot',
        '#kubejs:mana_ingot'
    )
})

ServerEvents.tags('item', event => {
    event.add('kubejs:blood_bottle', 'hexerei:blood_bottle')
    event.add('kubejs:blood_bottle', 'irons_spellbooks:blood_vial')
  })
ServerEvents.recipes(event => {
    //event.remove({ output: 'irons_spellbooks:arcane_ingot' })
    event.replaceInput(
        { input: 'hexerei:blood_bottle' },
        'hexerei:blood_bottle',
        '#kubejs:blood_bottle'
    )
    event.replaceInput(
        { input: 'irons_spellbooks:blood_vial' },
        'irons_spellbooks:blood_vial',
        '#kubejs:blood_bottle'
    )
})