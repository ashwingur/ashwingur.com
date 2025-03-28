import { z } from "zod";

const AchievementSchema = z.object({
  name: z.string(),
  value: z.number(),
});

const PlayerItemLevelSchema = z.object({
  name: z.string(),
  level: z.number(),
});

const CocPlayerHistorySchema = z.object({
  tag: z.string(),
  timestamp: z.string(),
  townHallLevel: z.number(),
  townHallWeaponLevel: z.number().nullable(),
  expLevel: z.number(),
  trophies: z.number(),
  bestTrophies: z.number(),
  warStars: z.number(),
  attackWins: z.number(),
  defenseWins: z.number(),
  builderHallLevel: z.number(),
  builderBaseTrophies: z.number(),
  bestBuilderBaseTrophies: z.number(),
  donations: z.number(),
  donationsReceived: z.number(),
  clanCapitalContributions: z.number(),
  achievements: z.array(AchievementSchema),
  heroEquipment: z.array(PlayerItemLevelSchema),
  heroes: z.array(PlayerItemLevelSchema),
  spells: z.array(PlayerItemLevelSchema),
  troops: z.array(PlayerItemLevelSchema),
});

const CocPlayerDataSchema = z.object({
  tag: z.string(),
  name: z.string(),
  history: z.array(CocPlayerHistorySchema),
});

export {
  CocPlayerDataSchema,
  CocPlayerHistorySchema,
  PlayerItemLevelSchema,
  AchievementSchema,
};
