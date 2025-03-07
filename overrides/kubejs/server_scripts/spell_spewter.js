EntityJSEvents.addGoalSelectors('blue_skies:spewter', event => {
    event.arbitraryGoal(1, (e) => {
        return new WizardAttackGoal(e, 1, 60) // Parameters: entity, movement speed modifier, cast interval
            .setSpells(
                [Spell.of('irons_spellbooks:acid_orb')], // Attack
                [Spell.of('irons_spellbooks:gust')], // Defense
                [], // Movement
                [] // Support
            )
    })
})