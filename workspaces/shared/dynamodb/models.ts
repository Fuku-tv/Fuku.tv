export interface BaseModel {
  id: string;
}

export interface Player extends BaseModel {
  credits: number;
  points: number;
  experience: number;
  email: string;
  ipAddress: string;
}

export interface Game extends BaseModel {
  name: string;
  currentPlayer: string;
  connectionDate: number;
  queue: string[];
}
