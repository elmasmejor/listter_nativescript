export function validateFijosInput(number1: string, number2: string): string | null {
  if (!number1 && !number2) {
    return 'Ingrese al menos un número';
  }
  
  if (number1 && number1.length !== 2) {
    return 'El número fijo debe tener 2 dígitos';
  }
  
  if (number2 && number2.length !== 2) {
    return 'El número corrido debe tener 2 dígitos';
  }
  
  return null;
}

export function validateParlesInput(number: string): string | null {
  if (!number) {
    return 'Ingrese un número';
  }
  
  if (number.length !== 2) {
    return 'El número debe tener 2 dígitos';
  }
  
  return null;
}

export function validateCentenasInput(number: string): string | null {
  if (!number) {
    return 'Ingrese un número';
  }
  
  if (number.length !== 3) {
    return 'El número debe tener 3 dígitos';
  }
  
  return null;
}

export function validateAmount(amount: string): string | null {
  if (!amount) {
    return 'Ingrese un monto';
  }
  
  const value = parseFloat(amount);
  if (isNaN(value) || value <= 0) {
    return 'Monto inválido';
  }
  
  return null;
}