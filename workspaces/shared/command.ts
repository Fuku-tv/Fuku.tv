interface Command {
  command?: string;
  width?: number;
  height?: number;
  credits?: number;
  freeplay?: number;
  queue?: number;
  watch?: number;
  test?: boolean;
  action?: string;
  success?: boolean;
  points?: number;
  pointswon?: number;
  jackpot?: boolean;
}

export default Command;
