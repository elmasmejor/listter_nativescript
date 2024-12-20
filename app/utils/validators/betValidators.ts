export function validateFijosNumber(number: string): string | null {
  if (!number) {
    return 'Ingrese un número';
  }
  
  if (number.length !== 2) {
    return 'El número debe tener 2 dígitos';
  }
  
  return null;
}

export function validateFijosAmounts(amount1: string, amount2: string): string | null {
  console.log('Validando montos:', { amount1, amount2 });
  
  // Si ambos están vacíos
  if (!amount1 && !amount2) {
    return 'Ingrese al menos un monto';
  }
  
  // Validar monto fijo si está presente
  if (amount1) {
    const value1 = parseFloat(amount1);
    console.log('Validando monto fijo:', { amount1, value1 });
    if (isNaN(value1) || value1 <= 0) {
      return 'Monto fijo inválido';
    }
  }
  
  // Validar monto corrido si está presente
  if (amount2) {
    const value2 = parseFloat(amount2);
    console.log('Validando monto corrido:', { amount2, value2 });
    if (isNaN(value2) || value2 <= 0) {
      return 'Monto corrido inválido';
    }
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