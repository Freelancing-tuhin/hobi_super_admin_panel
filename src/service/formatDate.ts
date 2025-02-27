export const formatDateTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleString('en-US', {
    weekday: 'short', // e.g., "Thu"
    year: 'numeric',
    month: 'short', // e.g., "Feb"
    day: '2-digit',
    // hour: '2-digit',
    // minute: '2-digit',
    // hour12: true,
  });
};
