export interface BaseModel {
  id: string;
}

export interface Player extends BaseModel {
  credits: number;
  ipAddress: string;
}

export interface Game extends BaseModel {
  name: string;
  currentPlayer: string;
  connectionDate: number;
  queue: string[];
}
