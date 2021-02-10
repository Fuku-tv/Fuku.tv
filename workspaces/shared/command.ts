interface Command {
  command?: string;
  width?: number;
  height?: number;
  credits?: number;
  queue?: number;
  watch?: number;
  test?: boolean;
  action?: string;
  success?: boolean;
}

export default Command;
