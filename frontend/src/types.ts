export interface Command {
  id: number;
  name: string;
  description: string;
  comment?: string;
  command: string;
}

export interface CommandRes {
  commands: Command[];
}
