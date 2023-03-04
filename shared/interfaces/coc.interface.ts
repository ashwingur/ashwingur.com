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
  labels: PlayerLabel[];
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

export interface PlayerLabel {
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
