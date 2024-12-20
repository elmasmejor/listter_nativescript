export interface BetEntry {
  id?: number;
  number1: string;
  amount1?: string;
  amount2?: string;
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