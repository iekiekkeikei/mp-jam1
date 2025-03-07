EntityJSEvents.addGoalSelectors('kubejs:valine_3g', event => {
    event.arbitraryGoal(1, (e) => {
        return new WizardAttackGoal(e, 1, 60) // Parameters: entity, movement speed modifier, cast interval
            .setSpells(
                [Spell.of('traveloptics:em_pulse')], // Attack
                [Spell.of('traveloptics:cursed_minefield')], // Defense
                [Spell.of('irons_spellbooks:frost_step')], // Movement
                [Spell.of('irons_spellbooks:invisibility')] // Support
            )
    })
})