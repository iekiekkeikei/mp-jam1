// spawn init
EntityEvents.spawned("kubejs:valine_3g", event => {
    /** @type {Internal.LivingEntity} */
    let entity = event.entity
    if(entity.getMaxHealth()<global.valine_3gBossMaxhealth)
    entity.setAbsorptionAmount(global.valine_3gBossMaxhealth)
})

// mob behavior
EntityJSEvents.addGoalSelectors("kubejs:valine_3g", e => {
    e.customGoal(
        "reactor_beam",
        0,
        mob => true,
        mob => true,
        true,
        mob => {
        },
        mob => {
        },
        true,
        /** @param {Internal.PathfinderMob} mob */
        mob => {
            try {
                let time = mob.age % 400
                if (time > 100) {
                    mob.setGlowing(false)
                } else {
                    mob.setGlowing(true)
                    mob.potionEffects.add("minecraft:levitation", 1, 2, false, false)
                }
                //ターゲットがいなければ最も近いプレイヤーをターゲットにして、それでもターゲットがいないなら終了
                if (mob.target === null) {
                    mob.target = mob.level.getNearestPlayer(mob.getX(), mob.getY(), mob.getZ(), -1, false);
                }
                if (mob.target === null) return;
                if (!mob.target.isAlive()) {
                    mob.target = mob.level.getNearestPlayer(mob.getX(), mob.getY(), mob.getZ(), -1, false);
                }
                if (mob.target === null) return;

                let target = mob.target
                
                lookPos(mob, target.getPosition(1))
                if (target.getY() - mob.getY() > 10) {
                    mob.potionEffects.add("minecraft:levitation", 1, 2, false, false)
                }
                if (60 <= time && time <= 100 && target.distanceToEntity(mob) < 100) {
                    // 原子炉ビーム発射
                    let speed = 10;
                    for (let i = 0; i < 4; i++) {
                        /**@type {Internal.ProjectileEntityJS} */
                        let bullet = mob.block.createEntity("kubejs:reactor_beam_projectile")
                        bullet.setOwner(mob)
                        bullet.teleportTo(mob.x, mob.y + 1, mob.z)
                        shootToTarget(bullet, target, mob, speed, 3);
                        bullet.spawn()
                    }
                    /**@type {Internal.ProjectileEntityJS} */
                    let bullet = mob.block.createEntity("kubejs:reactor_beam_projectile")
                    bullet.setOwner(mob)
                    bullet.teleportTo(mob.x, mob.y + 1, mob.z)
                    shootToTarget(bullet, target, mob, speed, 0);
                    bullet.spawn()
                } else if (120 <= time && (100 < target.distanceToEntity(mob) || mob.inWall) && target.distanceToEntity(mob) < 300) {
                    // ターゲットとの距離が 100ブロック以上または窒息している かつ 300ブロック以内ならターゲットにテレポートする
                    mob.teleportTo(target.getX(), target.getY(), target.getZ())
                    mob.level.playSound(null, mob.getX(), mob.getY(), mob.getZ(), "minecraft:entity.enderman.teleport", 'hostile', 1, 1)
                    mob.level.spawnParticles("minecraft:portal", false, mob.getX(), mob.getY(), mob.getZ(), 0, 1, 0, 300, 1);
                } else if (target.distanceToEntity(mob) > 300) {
                    // ターゲットが300ブロック以上離れている場合ターゲットを解除する
                    mob.target = null;
                }
            } catch (error) {
                console.log(error)
            }
        }
    )
})

/**
 * @param {Internal.ProjectileEntityJS} bullet
 * @param {Internal.Entity} target
 * @param {Internal.Entity} entity
 * @param {number} speed
 * @param {number} accurate
 */
function shootToTarget(bullet, target, entity, speed, accurate) {
    let dx = (target.getX() + getRandomNumber(-accurate, accurate)) - entity.getX();
    let dy = (target.getY() + getRandomNumber(-accurate, accurate)) - entity.getY() + target.getBbHeight() * 0.3;
    let dz = (target.getZ() + getRandomNumber(-accurate, accurate)) - entity.getZ();
    let distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
    dx = dx + (entity.deltaMovement.x() * (distance / speed))
    dy = dy + (entity.deltaMovement.y() * (distance / speed))
    dz = dz + (entity.deltaMovement.z() * (distance / speed))
    let vx = (dx / distance) * speed;
    let vy = (dy / distance) * speed;
    let vz = (dz / distance) * speed;
    vy += 0.3 / distance;
    bullet.addMotion(vx, vy, vz);
}
/**
 * @param {Internal.LivingEntity} entity
 * @param {Vec3d} pos
 */
function lookPos(entity, pos) {
    let dx = pos.x() - entity.getX();
    let dy = pos.y() - entity.getY();
    let dz = pos.z() - entity.getZ();
    let dh = Math.sqrt(dx * dx + dz * dz);
    let yaw = JavaMath.toDegrees(Math.atan2(dz, dx)) - 90;
    let pitch = -JavaMath.toDegrees(Math.atan2(dy, dh));
    entity.setRotation(yaw, pitch)
}

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}