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
  versusTrophies: number;
  bestVersusTrophies: number;
  versusBattleWins: number;
  role: string;
  warPreference: string;
  donations: number;
  donationsReceived: number;
  clanCapitalContributions: number;
  clan: PlayerClan;
  league: PlayerLeague;
  achievements: PlayerAchievement[];
  versusBattleWinCount: number;
  labels: Label[];
  troops: PlayerItemLevel[];
  heroes: PlayerItemLevel[];
  spells: PlayerItemLevel[];
}

export interface PlayerClan {
  tag: string;
  name: string;
  clanLevel: 3;
  badgeUrls: {
    small: string;
    large: string;
    medium: string;
  };
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
  badgeUrls: {
    small: string;
    large: string;
    medium: string;
  };
  clanLevel: number;
  clanPoints: number;
  clanVersusPoints: number;
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
  requiredVersusTrophies: number;
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

export interface Location {
  id: number;
  name: string;
  isCountry: boolean;
  countryCode: string;
}
