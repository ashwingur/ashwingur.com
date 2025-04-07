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
  clan_tag: z.string().nullable(),
  clan_name: z.string().nullable(),
  view_count: z.number().int().min(0),
});

const CocPlayerSchema = z.object({
  tag: z.string(),
  name: z.string(),
  clan_tag: z.string().nullable(),
  clan_name: z.string().nullable(),
  view_count: z.number().int().min(0),
});

const GoldPassSchema = z.object({
  startTime: z.string(),
  endTime: z.string(),
});

// SCHEMA FOR full clan object
const badgeUrlsSchema = z.object({
  large: z.string(),
  medium: z.string(),
  small: z.string(),
});

const capitalLeagueSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const chatLanguageSchema = z.object({
  id: z.number(),
  languageCode: z.string(),
  name: z.string(),
});

const districtSchema = z.object({
  districtHallLevel: z.number(),
  id: z.number(),
  name: z.string(),
});

const clanCapitalSchema = z.object({
  capitalHallLevel: z.number(),
  districts: z.array(districtSchema),
});

const CwlWarRoundSchema = z.object({
  clan: z.string(),
  clan_tag: z.string(),
  clan_attacks: z.number().optional().default(0),
  clan_stars: z.number().optional().default(0),
  clan_destruction_percentage: z.number().optional().default(0),
  opponent: z.string(),
  opponent_tag: z.string(),
  opponent_attacks: z.number().optional().default(0),
  opponent_stars: z.number().optional().default(0),
  opponent_destruction_percentage: z.number().optional().default(0),
  state: z.string(),
  war_tag: z.string(),
});

const iconUrlsSchema = z.object({
  medium: z.string().optional(),
  small: z.string().optional(),
  tiny: z.string().optional(),
});

const labelSchema = z.object({
  iconUrls: iconUrlsSchema,
  id: z.number(),
  name: z.string(),
});

const locationSchema = z.object({
  countryCode: z.string(),
  id: z.number(),
  isCountry: z.boolean(),
  name: z.string(),
});

const builderBaseLeagueSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const clanCapitalMemberSchema = z.object({
  attacks: z.number(),
  capitalResourcesLooted: z.number(),
});

const cwlWarMemberSchema = z.object({
  attack_limit: z.number(),
  attack_todo: z.boolean(),
  attacks: z.number(),
  defends: z.number(),
  defends_stars: z.number(),
  defends_total_destruction: z.number(),
  defends_total_duration: z.number(),
  total_destruction: z.number(),
  total_duration: z.number(),
  total_stars: z.number(),
});

const leagueSchema = z.object({
  iconUrls: iconUrlsSchema,
  id: z.number(),
  name: z.string(),
});

const playerHouseElementSchema = z.object({
  id: z.number(),
  type: z.string(),
});

const playerHouseSchema = z.object({
  elements: z.array(playerHouseElementSchema),
});

const warMemberSchema = z.object({
  attacks: z.number(),
});

const memberSchema = z.object({
  builderBaseLeague: builderBaseLeagueSchema.nullable(),
  builderBaseTrophies: z.number(),
  clanRank: z.number(),
  clan_capital: clanCapitalMemberSchema.nullable(),
  cwl_war: cwlWarMemberSchema.nullable(),
  donations: z.number(),
  donationsReceived: z.number(),
  expLevel: z.number(),
  league: leagueSchema.nullable(),
  name: z.string(),
  playerHouse: playerHouseSchema.optional(),
  previousClanRank: z.number(),
  role: z.string(),
  tag: z.string(),
  townHallLevel: z.number(),
  trophies: z.number(),
  war: warMemberSchema.nullable(),
});

const FullClanSchema = z.object({
  badgeUrls: badgeUrlsSchema,
  capitalLeague: capitalLeagueSchema,
  chatLanguage: chatLanguageSchema.optional(),
  clanBuilderBasePoints: z.number(),
  clanCapital: clanCapitalSchema,
  clanCapitalPoints: z.number(),
  clanLevel: z.number(),
  clanPoints: z.number(),
  cwl_war_rounds: z.array(CwlWarRoundSchema).nullable(),
  description: z.string(),
  isFamilyFriendly: z.boolean(),
  isWarLogPublic: z.boolean(),
  labels: z.array(labelSchema),
  location: locationSchema,
  memberList: z.array(memberSchema),
});

export {
  CocPlayerDataSchema,
  CocPlayerHistorySchema,
  PlayerItemLevelSchema,
  AchievementSchema,
  GoldPassSchema,
  CocPlayerSchema,
  FullClanSchema,
  CwlWarRoundSchema,
};
