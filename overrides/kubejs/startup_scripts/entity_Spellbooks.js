EntityJSEvents.attributes(event => {
    event.modify('irons_spellbooks:dead_king', attribute => {
        attribute.add("minecraft:generic.max_health", 3000)
    })
    event.modify('traveloptics:enraged_dead_king', attribute => {
        attribute.add("minecraft:generic.max_health", 500)
    })
})