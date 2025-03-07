const $UUID = Java.loadClass("java.util.UUID");

ItemEvents.modification(event => {
    event.modify("irons_spellbooks:tarnished_helmet", item => {
        item.addAttribute("minecraft:generic.attack_damage", $UUID.randomUUID(), "attack", -0.5, "multiply_base")
        item.addAttribute("irons_spellbooks:spell_power", $UUID.randomUUID(), "spell_power", 1.25, "multiply_base")
        item.addAttribute("irons_spellbooks:max_mana", $UUID.randomUUID(), "max_mana", 300, "addition")    
    })
})