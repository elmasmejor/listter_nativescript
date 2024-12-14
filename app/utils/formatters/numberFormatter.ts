export function formatTwoDigits(value: string): string {
  const numericValue = value.replace(/[^0-9]/g, '');
  if (numericValue.length === 0) return '';
  if (numericValue.length > 2) {
    return numericValue.slice(-2);
  }
  return numericValue;
}

export function formatThreeDigits(value: string): string {
  const numericValue = value.replace(/[^0-9]/g, '');
  if (numericValue.length === 0) return '';
  if (numericValue.length > 3) {
    return numericValue.slice(-3);
  }
  return numericValue;
}