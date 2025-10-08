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

const CocPlayerSchema = z.object({
  tag: z.string(),
  name: z.string(),
  clan_tag: z.string().nullable(),
  clan_name: z.string().nullable(),
  view_count: z.number().int().min(0),
  activity_change_date: z.string().nullable(),
});

const CocPlayerDataSchema = CocPlayerSchema.extend({
  history: z.array(CocPlayerHistorySchema),
});

const GoldPassSchema = z.object({
  startTime: z.string(),
  endTime: z.string(),
});

// SCHEMA FOR full clan object
const BadgeUrlsSchema = z.object({
  large: z.string(),
  medium: z.string(),
  small: z.string(),
});

const CapitalLeagueSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const ChatLanguageSchema = z.object({
  id: z.number(),
  languageCode: z.string(),
  name: z.string(),
});

const DistrictSchema = z.object({
  districtHallLevel: z.number(),
  id: z.number(),
  name: z.string(),
});

const ClanCapitalSchema = z.object({
  capitalHallLevel: z.number().optional(),
  districts: z.array(DistrictSchema).or(z.undefined()).default([]),
});

const CwlWarRoundSchema = z.object({
  clan: z.string(),
  clan_tag: z.string(),
  clan_attacks: z.number(),
  clan_stars: z.number(),
  clan_destruction_percentage: z.number(),
  opponent: z.string(),
  opponent_tag: z.string(),
  opponent_attacks: z.number(),
  opponent_stars: z.number(),
  opponent_destruction_percentage: z.number(),
  state: z.string(),
  war_tag: z.string(),
});

const IconUrlsSchema = z.object({
  medium: z.string().optional(),
  small: z.string().optional(),
  tiny: z.string().optional(),
  large: z.string().optional(),
});

const LabelSchema = z.object({
  iconUrls: IconUrlsSchema,
  id: z.number(),
  name: z.string(),
});

const LocationSchema = z.object({
  countryCode: z.string().optional(),
  id: z.number(),
  isCountry: z.boolean(),
  name: z.string(),
});

const BuilderBaseLeagueSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const ClanCapitalMemberSchema = z.object({
  attacks: z.number(),
  capitalResourcesLooted: z.number(),
});

const CwlWarMemberSchema = z.object({
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

const LeagueTierSchema = z.object({
  iconUrls: IconUrlsSchema,
  id: z.number(),
  name: z.string(),
});

const PlayerHouseElementSchema = z.object({
  id: z.number(),
  type: z.string(),
});

const PlayerHouseSchema = z.object({
  elements: z.array(PlayerHouseElementSchema),
});

const WarMemberSchema = z.object({
  attacks: z.number(),
});

const MemberSchema = z.object({
  builderBaseLeague: BuilderBaseLeagueSchema.nullable(),
  builderBaseTrophies: z.number(),
  clanRank: z.number(),
  clan_capital: ClanCapitalMemberSchema.nullable(),
  cwl_war: CwlWarMemberSchema.nullable(),
  donations: z.number(),
  donationsReceived: z.number(),
  expLevel: z.number(),
  leagueTier: LeagueTierSchema.nullable(),
  name: z.string(),
  playerHouse: PlayerHouseSchema.optional(),
  previousClanRank: z.number(),
  role: z.string(),
  tag: z.string(),
  townHallLevel: z.number(),
  trophies: z.number(),
  war: WarMemberSchema.nullable(),
});

const AttackSchema = z.object({
  attackerTag: z.string(),
  defenderTag: z.string(),
  stars: z.number().int().min(0).max(3),
  destructionPercentage: z.number().min(0).max(100),
  order: z.number().int(),
  duration: z.number().int(), // seconds
});

const WarClanMemberSchema = z.object({
  tag: z.string(),
  name: z.string(),
  townhallLevel: z.number().int(),
  mapPosition: z.number().int(),
  attacks: z.array(AttackSchema).optional(),
  opponentAttacks: z.number().int(),
  bestOpponentAttack: AttackSchema.optional(),
});

const WarClanSchema = z.object({
  badgeUrls: BadgeUrlsSchema,
  clanLevel: z.number(),
  attacks: z.number(),
  stars: z.number(),
  destructionPercentage: z.number(),
  members: z.array(WarClanMemberSchema).optional(),
  name: z.string().optional(),
  tag: z.string().optional(),
});

const WarSchema = z.object({
  state: z.string(),
  teamSize: z.number().optional(),
  preparationStartTime: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  warStartTime: z.string().optional(),
  clan: WarClanSchema,
  opponent: WarClanSchema,
  attacksPerMember: z.number().optional().default(1),
});

const ClanCapitalClan = z.object({
  badgeUrls: BadgeUrlsSchema,
  level: z.number(),
  name: z.string(),
  tag: z.string(),
});

const ClanCapitalAttackLogSchema = z.object({
  attackCount: z.number(),
  defender: ClanCapitalClan,
});
const ClanCapitalDefenseLogSchema = z.object({
  attackCount: z.number(),
  attacker: ClanCapitalClan,
});

const ClanCapitalRaidSeasonSchema = z.object({
  state: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  capitalTotalLoot: z.number(),
  raidsCompleted: z.number(),
  totalAttacks: z.number(),
  enemyDistrictsDestroyed: z.number(),
  offensiveReward: z.number(),
  defensiveReward: z.number(),
  attackLog: z.array(ClanCapitalAttackLogSchema),
  defenseLog: z.array(ClanCapitalDefenseLogSchema),
  members: z
    .array(
      z.object({
        attackLimit: z.number(),
        attacks: z.number(),
        bonusAttackLimit: z.number(),
        capitalResourcesLooted: z.number(),
        name: z.string(),
        tag: z.string(),
      }),
    )
    .optional(),
});

const ClanCapitalSeasonsSchema = z.object({
  items: z.array(ClanCapitalRaidSeasonSchema),
  paging: z.object({ cursors: z.object({ after: z.string().optional() }) }),
});

const FullClanSchema = z.object({
  badgeUrls: BadgeUrlsSchema,
  capitalLeague: CapitalLeagueSchema,
  chatLanguage: ChatLanguageSchema.optional(),
  clanBuilderBasePoints: z.number(),
  clanCapital: ClanCapitalSchema,
  clanCapitalPoints: z.number(),
  clanLevel: z.number(),
  clanPoints: z.number(),
  cwl_war_rounds: z
    .array(CwlWarRoundSchema)
    .optional()
    .nullable()
    .default(null),
  description: z.string(),
  isFamilyFriendly: z.boolean(),
  isWarLogPublic: z.boolean(),
  labels: z.array(LabelSchema),
  location: LocationSchema.optional(),
  memberList: z.array(MemberSchema),
  members: z.number(),
  name: z.string(),
  requiredBuilderBaseTrophies: z.number(),
  requiredTownhallLevel: z.number(),
  requiredTrophies: z.number(),
  tag: z.string(),
  type: z.string(),
  warFrequency: z.string(),
  warLeague: z.object({ id: z.number(), name: z.string() }),
  warLosses: z.number().optional().default(0),
  warTies: z.number().optional().default(0),
  warWinStreak: z.number().optional().default(0),
  warWins: z.number().optional().default(0),
  war: WarSchema.nullable(),
  cwl_wars: z.array(WarSchema).nullable(),
});

// --- WAR LOG ---
const WarLogEntryClanSchema = z.object({
  tag: z.string(),
  name: z.string(),
  badgeUrls: BadgeUrlsSchema,
  clanLevel: z.number(),
  attacks: z.number().optional(), // Optional as it might not always be present for the opponent
  stars: z.number(),
  destructionPercentage: z.number(),
  expEarned: z.number().optional(), // Optional as it might not always be present for the opponent
});

const WarLogEntrySchema = z.object({
  result: z.union([
    z.literal("win"),
    z.literal("lose"),
    z.literal("tie"),
    z.null(),
  ]),
  endTime: z.string(),
  teamSize: z.number(),
  attacksPerMember: z.number(),
  battleModifier: z.string(),
  clan: WarLogEntryClanSchema,
  opponent: WarLogEntryClanSchema.partial(), // Opponent can have missing fields like 'tag' or 'name' and others
});

const WarLogSchema = z.object({
  items: z.array(WarLogEntrySchema),
  paging: z
    .object({
      cursors: z.object({}).passthrough(), // Cursors can be an empty object or have other properties
    })
    .passthrough(),
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
  MemberSchema,
  ClanCapitalSeasonsSchema,
  WarSchema,
  WarClanMemberSchema,
  WarLogSchema,
};

export type District = z.infer<typeof DistrictSchema>;
