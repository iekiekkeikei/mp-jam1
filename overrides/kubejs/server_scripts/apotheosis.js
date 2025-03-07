// list of bosses
const bosses = ["traveloptics:enraged_dead_king","kubejs:valine_3g","minecraft:wither", "minecraft:ender_dragon", "irons_spellbooks:dead_king", "alexscaves:luxtructosaurus", "blue_skies:arachnarch", "blue_skies:starlit_crusher"];
// , "cataclysm:ancient_remnant", "cataclysm:maledictus", "cataclysm:ender_guardian", "cataclysm:netherite_monstrosity", "cataclysm:ignis","cataclysm:the_leviathan", "cataclysm:the_harbinger", "blue_skies:summoner", "blue_skies:alchemist", "dungeonnowloading:chaos_spawner"
// 0:common 1:uncommon 2:rare 3:epic 4:mythic
// common is normal monster
const rarity = 7

const BossRegistry = Java.loadClass("dev.shadowsoffire.apotheosis.adventure.boss.BossRegistry");
const ApothBoss = Java.loadClass("dev.shadowsoffire.apotheosis.adventure.boss.ApothBoss");
const GameStagesCompat = Java.loadClass("dev.shadowsoffire.apotheosis.adventure.compat.GameStagesCompat");
const AdventureConfig = Java.loadClass("dev.shadowsoffire.apotheosis.adventure.AdventureConfig");
const RarityRegistry = Java.loadClass("dev.shadowsoffire.apotheosis.adventure.loot.RarityRegistry");
const BlockPos = Java.loadClass("net.minecraft.core.BlockPos");
const CompoundTag = Java.loadClass("net.minecraft.nbt.CompoundTag");
const MobSpawnType = Java.loadClass("net.minecraft.world.entity.MobSpawnType");
const EntityType = Java.loadClass("net.minecraft.world.entity.EntityType");
const Func = Java.loadClass("java.util.function.Function");
let UpdateBosses = false;
const IStaged = GameStagesCompat.IStaged;

function canSpawn(world, entity, playerDist){
    if(playerDist > entity.getType().getCategory().getDespawnDistance() * entity.getType().getCategory().getDespawnDistance() && entity.removeWhenFarAway(playerDist)){
        return false;
    } else {
        return entity.checkSpawnRules(world, MobSpawnType.NATURAL) && entity.checkSpawnObstruction(world);
    }
}

function createBoss(world, pos, random, luck, item, entity2, rarity) {
    const fakeNbt = item.nbt == null ? new CompoundTag() : item.nbt;
    fakeNbt.putString("id", entity2.getType().toString());
    const entity = EntityType.loadEntityRecursive(fakeNbt, world.getLevel(), Func.identity());
    if (item.nbt != null) entity.load(item.nbt);
    item.initBoss(random, entity, luck, RarityRegistry.byOrdinal(rarity).get());
    // Re-read here so we can apply certain things after the boss has been modified
    // But only mob-specific things, not a full load()
    if (item.nbt != null) entity.readAdditionalSaveData(item.nbt);
    if (item.mount != null) {
        const mountedEntity = item.mount.create(world.getLevel(), pos.getX() + 0.5, pos.getY(), pos.getZ() + 0.5);
        entity.startRiding(mountedEntity, true);
        entity = mountedEntity;
    }

    entity.setPositionAndRotation(pos.getX() + 0.5, pos.getY(), pos.getZ() + 0.5, random.nextFloat() * 360.0, 0.0);
    return entity;
}

function generateBoss(rand, player){
    let i=0
    while (true) {
        i++;
        let item = BossRegistry.INSTANCE.getRandomItem(rand, player.getLuck(), IStaged.matches(player))
        const statsField = item.getClass().getDeclaredField("stats")
        statsField.setAccessible(true);
        if(statsField.get(item).get(RarityRegistry.byOrdinal(rarity).get()) != null) return item;
        if (i > 1000) break;
    }
    return null;
}
EntityEvents.spawned(e => {
    const entity = e.getEntity();
    const rand = e.getLevel().getRandom();
    if(UpdateBosses)return;
    if(bosses.includes(`${entity.getType()}`)){
        const sLevel = e.getLevel();
        const player = sLevel.getNearestPlayer(entity.getX(), entity.getY(), entity.getZ(), -1, false);
        if(player==null)return;
        let item = generateBoss(rand, player);
        if(item==null)return;
        let boss = null;
        boss = createBoss(sLevel, BlockPos.containing(entity.getX() - 0.5, entity.getY(), entity.getZ() - 0.5), rand, player.getLuck(), item, entity, rarity);
        if(AdventureConfig.bossAutoAggro && !player.isCreative())boss.setTarget(player)
        UpdateBosses = true;
        sLevel.addFreshEntityWithPassengers(boss);
        UpdateBosses = false;
        e.cancel()
    }
})