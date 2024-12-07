export interface BetEntry {
  id?: number;
  number1: string;
  number2?: string;
  amount: string;
}

export interface GameState {
  fijos: BetEntry[];
  parles: BetEntry[];
  centenas: BetEntry[];
  balance: number;
}

export interface InputRowRef {
  getData: () => BetEntry;
  clear: () => void;
}