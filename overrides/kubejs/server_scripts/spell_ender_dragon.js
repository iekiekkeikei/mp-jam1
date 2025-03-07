EntityJSEvents.addGoalSelectors('minecraft:ender_dragon', event => {
    event.arbitraryGoal(1, (e) => {
        return new WizardAttackGoal(e, 1, 60) // Parameters: entity, movement speed modifier, cast interval
            .setSpells(
                [Spell.of('irons_spellbooks:eldritch_blast')], // Attack
                [Spell.of('irons_spellbooks:echoing_strikes')], // Defense
                [Spell.of('irons_spellbooks:portal')], // Movement
                [Spell.of('irons_spellbooks:black_hole')] // Support
            )
    })
})