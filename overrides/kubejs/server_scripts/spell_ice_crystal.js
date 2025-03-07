EntityJSEvents.addGoalSelectors('twilightforest:ice_crystal', event => {
    event.arbitraryGoal(1, (e) => {
        return new WizardAttackGoal(e, 1, 60) // Parameters: entity, movement speed modifier, cast interval
            .setSpells(
                [Spell.of('irons_spellbooks:ray_of_frost')], // Attack
                [], // Defense
                [Spell.of('irons_spellbooks:frost_step')], // Movement
                [] // Support
            )
    })
})