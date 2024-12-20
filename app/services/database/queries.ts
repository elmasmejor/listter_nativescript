export const INSERT_BET = `
  INSERT INTO bets (type, number1, amount1, amount2)
  VALUES (?, ?, ?, ?)
`;

export const UPDATE_BET = `
  UPDATE bets 
  SET number1 = ?, amount1 = ?, amount2 = ?
  WHERE id = ? AND type = ?
`;

export const DELETE_BET = `
  DELETE FROM bets 
  WHERE id = ? AND type = ?
`;

export const SELECT_BETS = `
  SELECT id, type, number1, amount1, amount2 
  FROM bets 
  ORDER BY created_at DESC
`;