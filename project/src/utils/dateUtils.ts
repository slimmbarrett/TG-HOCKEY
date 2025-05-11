export function format(date: Date, formatStr: string): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return formatStr
    .replace('yyyy', String(year))
    .replace('MM', month)
    .replace('dd', day);
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function formatGameDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });
}

export function isToday(dateStr: string): boolean {
  const today = new Date();
  const gameDate = new Date(dateStr);
  
  return today.getFullYear() === gameDate.getFullYear() &&
    today.getMonth() === gameDate.getMonth() &&
    today.getDate() === gameDate.getDate();
}

export function isTomorrow(dateStr: string): boolean {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const gameDate = new Date(dateStr);
  
  return tomorrow.getFullYear() === gameDate.getFullYear() &&
    tomorrow.getMonth() === gameDate.getMonth() &&
    tomorrow.getDate() === gameDate.getDate();
}

export function groupGamesByDate(games: any[]): Record<string, any[]> {
  return games.reduce((grouped, game) => {
    if (!grouped[game.date]) {
      grouped[game.date] = [];
    }
    grouped[game.date].push(game);
    return grouped;
  }, {} as Record<string, any[]>);
}