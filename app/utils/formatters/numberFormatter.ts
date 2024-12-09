export function formatTwoDigits(value: string): string {
  const numericValue = value.replace(/[^0-9]/g, '');
  if (numericValue.length === 0) return '';
  const num = parseInt(numericValue, 10);
  if (num > 99) {
    return '99';
  }
  return num.toString().padStart(2, '0');
}

export function formatThreeDigits(value: string): string {
  const numericValue = value.replace(/[^0-9]/g, '');
  if (numericValue.length === 0) return '';
  const num = parseInt(numericValue, 10);
  if (num > 999) {
    return '999';
  }
  return num.toString().padStart(3, '0');
}