export function validateAmount(amount: string): string | null {
  if (!amount) {
    return 'Ingrese un monto';
  }
  
  const value = parseFloat(amount);
  if (isNaN(value)) {
    return 'Monto inválido';
  }

  if (value <= 1) {
    return 'El monto debe ser mayor que 1';
  }

  if (value >= 800) {
    return 'El monto debe ser menor que 800';
  }
  
  return null;
}