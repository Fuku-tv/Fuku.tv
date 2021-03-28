export interface BaseModel {
  id: string;
}

export interface Player extends BaseModel {
  credits: number;
  freeplay: number;
  lastfreeplaydate: number; // unix timestamp?
  points: number;
  xp: number;
  email: string;
  nickname: string;
  ipAddress: string;
}

export interface Game extends BaseModel {
  name: string;
  currentPlayer: string;
  connectionDate: number;
  queue: string[];
}

export interface Replay extends BaseModel {
  playerid: string;
  win: boolean;
  amount: number;
}
