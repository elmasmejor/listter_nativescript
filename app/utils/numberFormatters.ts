export function formatTwoDigits(value: string): string {
  // Remove non-numeric characters
  const numericValue = value.replace(/[^0-9]/g, '');
  
  // If empty, return empty string
  if (numericValue.length === 0) return '';
  
  // Parse as number and ensure it's between 0-99
  const num = parseInt(numericValue, 10);
  if (num > 99) {
    return '99';
  }
  
  // Pad with zeros if needed
  return num.toString().padStart(2, '0');
}

export function formatThreeDigits(value: string): string {
  // Remove non-numeric characters
  const numericValue = value.replace(/[^0-9]/g, '');
  
  // If empty, return empty string
  if (numericValue.length === 0) return '';
  
  // Parse as number and ensure it's between 0-999
  const num = parseInt(numericValue, 10);
  if (num > 999) {
    return '999';
  }
  
  // Pad with zeros if needed
  return num.toString().padStart(3, '0');
}

export function formatAmount(value: string): string {
  // Remove non-numeric characters except decimal point
  const numericValue = value.replace(/[^0-9.]/g, '');
  
  // Handle decimal points
  const parts = numericValue.split('.');
  if (parts.length > 2) {
    return parts[0] + '.' + parts[1];
  }
  
  // Limit decimal places to 2 and total length
  if (parts.length === 2) {
    const integerPart = parts[0].slice(0, 7); // Limit to 7 digits before decimal
    const decimalPart = parts[1].slice(0, 2); // Limit to 2 decimal places
    return integerPart + (decimalPart ? '.' + decimalPart : '');
  }
  
  // Limit integer part length
  return parts[0].slice(0, 7);
}

export function padNumber(value: string, length: number): string {
  if (!value) return '';
  const num = parseInt(value, 10);
  return num.toString().padStart(length, '0');
}

export function isValidTwoDigitNumber(value: string): boolean {
  if (!value) return false;
  const num = parseInt(value, 10);
  return !isNaN(num) && num >= 0 && num <= 99;
}

export function isValidThreeDigitNumber(value: string): boolean {
  if (!value) return false;
  const num = parseInt(value, 10);
  return !isNaN(num) && num >= 0 && num <= 999;
}

export function isValidAmount(value: string): boolean {
  if (!value) return false;
  const num = parseFloat(value);
  return !isNaN(num) && num > 0 && num <= 9999999.99;
}