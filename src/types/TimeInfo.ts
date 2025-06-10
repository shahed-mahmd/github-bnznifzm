
export interface TimeInfo {
  id: string;
  name: string;
  timeZoneId: string;
  flagEmoji: string;
  currentTime: string;
  timeDifference: string;
  period: 'AM' | 'PM';
}
