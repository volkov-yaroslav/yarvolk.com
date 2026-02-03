// Format the date to a string
export const formatDate = (
  dateInput: string | Date,
  format: 'long' | 'short' = 'short'
): string => {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${dateInput}`);
  }

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: format === 'long' ? 'long' : 'short',
    year: 'numeric'
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
};
