/* eslint-disable max-classes-per-file */
export class BaseModel {
  id: string;
}

export class Player extends BaseModel {
  credits = 0;

  freeplay = 0;

  lastfreeplaydate = 0; // unix timestamp?

  points = 0;

  xp = 0;

  email = '';

  nickname = '';

  ipAddress = '';
}

export class Game extends BaseModel {
  name = '';

  currentPlayer = '';

  connectionDate = 0;

  queue: string[] = [];
}

export class Replay extends BaseModel {
  playerid = '';

  win = false;

  amount = 0;
}

export class PointsLedger extends BaseModel {
  playerid = '';

  pointsRedeemed = 0;

  date = '';

  time = '';
}

export const defaults = <T extends BaseModel>(Instance: T, obj: BaseModel): T => ({
  ...Instance,
  ...obj,
});
