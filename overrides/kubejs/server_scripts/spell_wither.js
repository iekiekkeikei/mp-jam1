EntityJSEvents.addGoalSelectors('minecraft:wither', event => {
    event.arbitraryGoal(1, (e) => {
        return new WizardAttackGoal(e, 1, 10) // Parameters: entity, movement speed modifier, cast interval
            .setSpells(
                [Spell.of('irons_spellbooks:wither_skull')], // Attack
                [Spell.of('irons_spellbooks:counterspell')], // Defense
                [Spell.of('irons_spellbooks:blood_step')], // Movement
                [Spell.of('irons_spellbooks:acupuncture')] // Support
            )
    })
})