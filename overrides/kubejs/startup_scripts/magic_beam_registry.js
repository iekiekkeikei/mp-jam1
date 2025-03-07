const explosionPower = 8
const Damage = 10
const VoidDamage = 5
// doesn't work if mekanism is not installed
const RadiationDamage = 10000
const RadiationAnount = 10000000000
try {
    const $MekanismDamageTypes = Java.tryLoadClass("mekanism.common.registries.MekanismDamageTypes")
    const $RadiationManager = Java.tryLoadClass("mekanism.common.lib.radiation.RadiationManager")
} catch(e) {
    const $MekanismDamageTypes = null
    const $RadiationManager = null
}
const $LivingEntity = Java.loadClass("net.minecraft.world.entity.LivingEntity")
StartupEvents.registry('item', event => {
    event.create("magic_rod_beam")
        .unstackable()
        .use((level, player, hand) => {
            let server = Utils.getServer()
            /* なぜか一番最初のserver.scheduleInTicksと同じtickのserver.scheduleInTicksが全て即座に発動してしまうので、無意味にserver.scheduleInTicksを使っています。 */
            server.scheduleInTicks(0, () => {
                player.setGlowing(true)
            })
            return true
        })
        .useDuration(itemStack => 60)
        .finishUsing(
            /**
             * @param {Internal.ItemStack} itemstack
             * @param {Internal.ServerLevel} level
             * @param {Internal.Player} entity
             */
            (itemStack, level, entity) => {
                entity.setGlowing(false)
                entity.addItemCooldown(itemStack, 400)
                let server = Utils.getServer()
                for (let i = 0; i < 40; i++) {
                    server.scheduleInTicks(i, () => {
                        let speed = 20
                        for (let j = 0; j < 4; j++) {
                            /**@type {Internal.ProjectileEntityJS} */
                            let bullet = level.createEntity("kubejs:reactor_beam_projectile")
                            bullet.setOwner(entity);
                            bullet.teleportTo(entity.getX(), entity.getY(), entity.getZ())
                            bullet.shootFromRotation(entity, entity.getPitch(), entity.getYaw(), 0, speed, 10)
                            level.addFreshEntity(bullet)
                        }
                        /**@type {Internal.ProjectileEntityJS} */
                        let bullet = level.createEntity("kubejs:reactor_beam_projectile")
                        bullet.setOwner(entity);
                        bullet.teleportTo(entity.getX(), entity.getY(), entity.getZ())
                        bullet.shootFromRotation(entity, entity.getPitch(), entity.getYaw(), 0, speed, 0)
                        level.addFreshEntity(bullet)
                    })
                }
                return itemStack
            })
        .releaseUsing((itemStack, level, entity) => {
            entity.setGlowing(false)
        })
})
StartupEvents.registry('entity_type', event => {
    event.create("reactor_beam_projectile", 'entityjs:projectile')
        .onHitBlock(context => {
            const { entity, result } = context;
            let explosion = entity.level.createExplosion(entity.getX(), entity.getY(), entity.getZ())
            explosion.strength(explosionPower)
            explosion.causesFire(true)
            explosion.exploder(entity.getOwner())
            explosion.explosionMode("block")
            explosion.explode()
            entity.remove("discarded")
        })
        .onHitEntity(context => {
            const { entity, result } = context;
            if (result.entity.living) {
                result.entity.invulnerableTime = 0
                // Mekanismが入ってたら難化
                if ($MekanismDamageTypes) {
                    const radiationManager = $RadiationManager.get()
                    radiationManager.radiate(result.entity, RadiationAnount)
                    let getRadiationResistanceMethod = radiationManager.getClass().getDeclaredMethod("getRadiationResistance", $LivingEntity)
                    getRadiationResistanceMethod.setAccessible(true)
                    result.entity.attack($MekanismDamageTypes.RADIATION.source(entity.level), 1000 * (1 - Math.min(1, getRadiationResistanceMethod.invoke(radiationManager, result.entity))))
                    result.entity.attack(entity.level.damageSources().magic(), Damage)
                }
                result.entity.attack(entity.level.damageSources().magic(), Damage)
                result.entity.attack(entity.level.damageSources().fellOutOfWorld(), VoidDamage)
            }
            let explosion = entity.level.createExplosion(entity.getX(), entity.getY(), entity.getZ())
            explosion.strength(explosionPower)
            explosion.causesFire(true)
            explosion.exploder(entity.getOwner())
            explosion.explosionMode("block")
            explosion.explode()
            entity.remove("discarded")
        })
        .tick(entity => {
            if (entity.age > 20) {
                let explosion = entity.level.createExplosion(entity.getX(), entity.getY(), entity.getZ())
                explosion.strength(explosionPower)
                explosion.causesFire(true)
                explosion.exploder(entity.getOwner())
                explosion.explosionMode("block")
                explosion.explode()
                entity.remove("discarded")
            }
        })
})