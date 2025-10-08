import { z } from "zod";

// --- Nested Schemas ---

const BadgeUrlsSchema = z.object({
  small: z.string().url(),
  medium: z.string().url().optional(),
  large: z.string().url().optional(),
});

const ClanSchema = z.object({
  tag: z.string(),
  name: z.string(),
  clanLevel: z.number(),
  badgeUrls: BadgeUrlsSchema,
});

const BuilderBaseLeagueSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const LeagueTierSchema = z.object({
  id: z.number(),
  name: z.string(),
  iconUrls: BadgeUrlsSchema,
});

const AchievementSchema = z.object({
  completionInfo: z.string().nullable().optional(), // Can be string or null
  info: z.string(),
  name: z.string(),
  stars: z.number(),
  target: z.number(),
  value: z.number(),
  village: z.enum(["home", "builderBase", "clanCapital"]),
});

const EquipmentSchema = z.object({
  level: z.number(),
  maxLevel: z.number(),
  name: z.string(),
  village: z.string(), // e.g., "home" or "builderBase"
});

const HeroSchema = z.object({
  equipment: z.array(EquipmentSchema).optional(),
  level: z.number(),
  maxLevel: z.number(),
  name: z.string(),
  village: z.string(), // e.g., "home" or "builderBase"
});

const LabelSchema = z.object({
  id: z.number(),
  name: z.string(),
  iconUrls: BadgeUrlsSchema,
});

// Since troops, spells, and pets share a very similar structure to equipment/heroes,
// we can define a common schema for units.
const ItemLevelSchema = z.object({
  name: z.string(),
  level: z.number(),
  maxLevel: z.number(),
  village: z.string(), // e.g., "home" or "builderBase"
});

// --- Main Schema ---

export const CocPlayerProfileSchema = z.object({
  // Arrays
  achievements: z.array(AchievementSchema),
  heroEquipment: z.array(EquipmentSchema),
  heroes: z.array(HeroSchema).optional(),
  labels: z.array(LabelSchema),
  troops: z.array(ItemLevelSchema),
  spells: z.array(ItemLevelSchema),
  pets: z.array(ItemLevelSchema).optional(),

  // Primitives and Numbers
  tag: z.string(),
  name: z.string(),
  role: z.string().optional(),
  expLevel: z.number(),
  attackWins: z.number(),
  defenseWins: z.number(),
  donations: z.number(),
  donationsReceived: z.number(),
  townHallLevel: z.number(),
  townHallWeaponLevel: z.number().nullable().optional(),
  builderHallLevel: z.number(),
  bestTrophies: z.number(),
  trophies: z.number(),
  bestBuilderBaseTrophies: z.number(),
  builderBaseTrophies: z.number(),
  warStars: z.number(),
  clanCapitalContributions: z.number(),

  // Nested Objects
  clan: ClanSchema.nullable().optional(), // Can be null if player is not in a clan
  leagueTier: LeagueTierSchema.optional(), // The full response usually has a `league` object
  builderBaseLeague: BuilderBaseLeagueSchema,

  // Player-specific info (like last seen or current league not visible in snippet but good to include if present in full data)
  // warPreference: z.string().optional(),
  // versusBattleWins: z.number().optional(),
});

export type CocPlayerProfile = z.infer<typeof CocPlayerProfileSchema>;
export type CocPlayerProfileAchievement = z.infer<typeof AchievementSchema>;
export type ItemLevel = z.infer<typeof ItemLevelSchema>;
