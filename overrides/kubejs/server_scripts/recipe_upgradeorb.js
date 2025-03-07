ServerEvents.recipes(event => {
    event.remove({ id: 'irons_spellbooks:upgrade_orb' })
    event.remove({ output: 'irons_spellbooks:arcane_essence' })
})
