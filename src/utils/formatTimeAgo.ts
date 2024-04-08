export default function formatTimeAgo(timestamp: any): string {
  const seconds: number = Math.floor((Date.now() - timestamp) / 1000);

  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hours: 3600,
    minutes: 60,
    second: 1,
  };

  for (const [interval, secondsPerInterval] of Object.entries(intervals)) {
    const count: number = Math.floor(seconds / secondsPerInterval);
    if (count > 0) {
      return `${count} ${interval} ago`;
    }
  }

  return "few seconds ago";
}
