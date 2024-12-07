export function formatAmount(value: string): string {
  const numericValue = value.replace(/[^0-9.]/g, '');
  const parts = numericValue.split('.');
  
  if (parts.length > 2) {
    return parts[0] + '.' + parts[1];
  }
  
  if (parts.length === 2) {
    return parts[0] + '.' + parts[1].slice(0, 2);
  }
  
  return numericValue;
}