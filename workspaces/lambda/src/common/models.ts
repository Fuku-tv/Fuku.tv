export interface BaseModel {
  id: string;
  domainName: string;
  stage: string;
}

export interface Player extends BaseModel {
  connectionDate: number;
  credits: number;
  ipAddress: string;
}

export interface Game extends BaseModel {
  name: string;
  currentPlayer: string;
  connectionDate: number;
  queue: string[];
}
