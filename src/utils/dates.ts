
export function sortDateDescending(dates: string[]): string[] {
  return dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
}
