import { TimeInfo } from '../types/TimeInfo';

export const locations: Omit<TimeInfo, 'currentTime' | 'timeDifference' | 'period'>[] = [
  {
    id: 'dhaka',
    name: 'Dhaka, Bangladesh',
    timeZoneId: 'Asia/Dhaka',
    flagEmoji: '🇧🇩'
  },
  {
    id: 'belgium',
    name: 'Brussels, Belgium',
    timeZoneId: 'Europe/Brussels',
    flagEmoji: '🇧🇪'
  },
  {
    id: 'kiel',
    name: 'Kiel, Germany',
    timeZoneId: 'Europe/Berlin',
    flagEmoji: '🇩🇪'
  }
];

export const getCurrentTimeInfo = (): TimeInfo[] => {
  const now = new Date();
  const dhakaZone = 'Asia/Dhaka';
  
  // Get current time in Dhaka (reference timezone)
  const dhakaTime = new Date(now.toLocaleString("en-US", {timeZone: dhakaZone}));
  
  return locations.map(location => {
    // Get current time in the location's timezone
    const locationTime = new Date(now.toLocaleString("en-US", {timeZone: location.timeZoneId}));
    
    // Format time in 12-hour format
    const time12Formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: location.timeZoneId,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    
    const formattedTime = time12Formatter.format(now);
    const [time, period] = formattedTime.split(' ');
    
    // Calculate time difference relative to Dhaka
    let timeDifference = '0h 0m'; // Default for Dhaka
    
    if (location.timeZoneId !== dhakaZone) {
      const diffMs = locationTime.getTime() - dhakaTime.getTime();
      const diffHours = Math.floor(Math.abs(diffMs) / (1000 * 60 * 60));
      const diffMinutes = Math.floor((Math.abs(diffMs) % (1000 * 60 * 60)) / (1000 * 60));
      
      const sign = diffMs >= 0 ? '+' : '-';
      timeDifference = `${sign}${diffHours}h ${diffMinutes}m`;
    }
    
    return {
      ...location,
      currentTime: time,
      timeDifference,
      period: period as 'AM' | 'PM'
    };
  });
};

// Utility function to get time zone info
export const getTimeZoneInfo = (timeZoneId: string) => {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timeZoneId,
    timeZoneName: 'long'
  });
  
  return formatter.formatToParts(now).find(part => part.type === 'timeZoneName')?.value || timeZoneId;
};

// Utility function to check if it's daytime in a timezone
export const isDaytime = (timeZoneId: string): boolean => {
  const now = new Date();
  const hour = parseInt(new Intl.DateTimeFormat('en-US', {
    timeZone: timeZoneId,
    hour: 'numeric',
    hour12: false
  }).format(now));
  
  return hour >= 6 && hour < 18;
};