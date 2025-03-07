let reduce = { "explosion": 0.1, "explosion.player": 0.1 }
let invulnerable = ["inFire", "onFire", "lava", "fall", "radiation"]
global.valine_3gBossMaxhealth = 100000

try{
    if (Java.tryLoadClass("mekanism.common.registries.MekanismDamageTypes")) {
        invulnerable.push("magic")
        invulnerable.push("magic.indirect")
    }
} catch (e) {
}
StartupEvents.registry('entity_type', event => {
    event.create('valine_3g', 'entityjs:mob')
        .canHoldItem(context => {
            return true
        })
        .createNavigation(context => {
            const { entity, level } = context
            // Use the new EntityJSUtils binding to create different path navigations
            // Returning WallClimberNavigation here will allow the entity to path-find up walls like spiders
            return EntityJSUtils.createFlyingPathNavigation(entity, level) // Return some path navigation
        })
        .nextStep(entity => {
            // Define custom logic to calculate the next step distance based on the provided entity.
            const movementSpeed = entity.getSpeed(); // Get the entity's movement speed
            //If the entity is not an animal return default vanilla behavior
            if (!entity.animal) return entity.moveDist + 1;
            const behaviorFactor = entity.isAggressive() ? 1.5 : 1; // Adjust the step distance based on behavior
            // Calculate the next step distance based on movement speed, size, and behavior
            const nextStepDistance = movementSpeed * behaviorFactor;
            return nextStepDistance;
        })
        .isInvulnerableTo(context => {
            return invulnerable.includes(context.damageSource.getType())
        })
        .fireImmune(true)
        .canSpawnFarFromPlayer(true)
        .sized(1, 2)
        .dropCustomDeathLoot(context => {
            context.entity.block.popItem(Item.of("kubejs:magic_rod_beam"))
        })
})

EntityJSEvents.attributes(event => {
    event.modify("kubejs:valine_3g", attribute => {
        attribute.add("minecraft:generic.max_health", global.valine_3gBossMaxhealth)
    })
})

ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingHurtEvent', event => {
    if (event.getEntity().getType() == "kubejs:valine_3g") {
        if (reduce[event.getSource().getType()]) {
            event.setAmount(event.getAmount() * reduce[event.getSource().getType()])
        }
    }
})