export interface Player {
  tag: string;
  name: string;
  townHallLevel: number;
  townHallWeaponLevel: number;
  expLevel: number;
  trophies: number;
  bestTrophies: number;
  warStars: number;
  attackWins: number;
  defenseWins: number;
  builderHallLevel: number;
  builderBaseTrophies: number;
  bestBuilderBaseTrophies: number;
  versusTrophies: number; // Soon to be deprecated
  bestVersusTrophies: number;
  versusBattleWins: number; // Soon to be deprecated
  role: string;
  warPreference: string;
  donations: number;
  donationsReceived: number;
  clanCapitalContributions: number;
  clan: PlayerClan;
  league?: PlayerLeague;
  builderBaseLeague?: BuilderBaseLeague;
  achievements: PlayerAchievement[];
  versusBattleWinCount: number;
  labels: Label[];
  troops: PlayerItemLevel[];
  heroes: PlayerItemLevel[];
  spells: PlayerItemLevel[];
  heroEquipment: PlayerItemLevel[];
}

export interface PlayerClan {
  tag: string;
  name: string;
  clanLevel: 3;
  badgeUrls: BadgeUrls;
}

export interface BadgeUrls {
  small: string;
  large: string;
  medium: string;
}

export interface PlayerLeague {
  id: number;
  name: string;
  iconUrls: {
    small: string;
    tiny: string;
    medium: string;
  };
}

export interface PlayerAchievement {
  name: string;
  stars: number;
  value: number;
  target: number;
  info: string;
  completionInfo: string;
  village: string;
}

export interface PlayerHouse {
  elements: PlayerHouseElement[];
}

export interface PlayerHouseElement {
  type: string;
  id: number;
}

export interface Label {
  id: number;
  name: string;
  iconUrls: {
    small: string;
    medium: string;
  };
}

export interface PlayerItemLevel {
  name: string;
  level: number;
  maxLevel: number;
  village: string;
}

export interface Clan {
  tag: string;
  name: string;
  type: string;
  description: string;
  location: Location;
  isFamilyFriendly: boolean;
  badgeUrls: BadgeUrls;
  clanLevel: number;
  clanPoints: number;
  clanVersusPoints: number; // To be deprecated
  clanBuilderBasePoints: number;
  clanCapitalPoints: number;
  capitalLeague: CapitalLeague;
  requiredTrophies: number;
  warFrequency: string;
  warWinStreak: number;
  warWins: number;
  isWarLogPublic: boolean;
  warLeague: WarLeague;
  members: number;
  memberList: ClanMember[];
  labels: Label[];
  requiredVersusTrophies: number; // To be deprecated
  requiredBuilderBaseTrophies: number;
  requiredTownhallLevel: number;
  clanCapital: ClanCapital;
}

export interface ClanCapital {
  capitalHallLevel: number;
  districts: District[];
}

export interface District {
  id: number;
  name: string;
  districtHallLevel: number;
}

export interface ClanMember {
  tag: string;
  name: string;
  role: string;
  expLevel: number;
  league: PlayerLeague;
  trophies: number;
  versusTrophies: number;
  clanRank: number;
  previousClanRank: number;
  donations: number;
  donationsReceived: number;
  playerHouse: PlayerHouse;
}

export interface WarLeague {
  id: number;
  name: string;
}

export interface CapitalLeague {
  id: number;
  name: string;
}

export interface BuilderBaseLeague {
  id: number;
  name: string;
}

export interface Location {
  id: number;
  name: string;
  isCountry: boolean;
  countryCode: string;
}

export interface ClanWar {
  state: string;
  teamSize: number;
  attacksPerMember: number;
  preparationStartTime: string;
  startTime: string;
  endTime: string;
  clan: WarClan;
  opponent: WarClan;
}

export interface WarClan {
  tag: string;
  name: string;
  badgeUrls: BadgeUrls;
  clanLevel: number;
  attacks: number;
  stars: number;
  destructionPercentage: number;
  members: ClanWarMember[];
}

export interface ClanWarMember {
  tag: string;
  name: string;
  townhallLevel: number;
  mapPosition: number;
  opponentAttacks: number;
  bestOpponentAttack: ClanWarAttack;
  attacks: ClanWarAttack[];
}

export interface ClanWarAttack {
  order: number;
  attackerTag: string;
  defenderTag: string;
  stars: number;
  destructionPercentage: number;
  duration: number;
}

export interface LeagueGroup {
  state: string;
  season: string;
  clans: ClanWarLeagueCLan[];
  rounds: ClanWarLeagueRound[];
}

export interface ClanWarLeagueCLan {
  tag: string;
  clanLevel: number;
  name: string;
  members: ClanWarLeagueClanMember[];
}
export interface ClanWarLeagueClanMember {
  tag: string;
  townHallLevel: number;
  name: string;
}

export interface ClanWarLeagueRound {
  warTags: String[];
}

export interface ClientError {
  reason: string;
  message: string;
  type: string;
}
