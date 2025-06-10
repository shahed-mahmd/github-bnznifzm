import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TimeInfo } from '../types/TimeInfo';
import { MapPin, Clock } from 'lucide-react';

interface TimeCardProps {
  timeInfo: TimeInfo;
  isDarkMode?: boolean;
}

const getFlagBasedColor = (id: string) => {
  switch (id) {
    case 'dhaka':
      return 'from-green-500 to-emerald-600'; // Bangladesh flag green
    case 'belgium':
      return 'from-yellow-500 to-amber-600'; // Belgium flag yellow
    case 'kiel':
      return 'from-red-500 to-rose-600'; // Germany flag red
    default:
      return 'from-blue-500 to-indigo-600';
  }
};

const getAbbreviation = (id: string) => {
  switch (id) {
    case 'dhaka':
      return 'BD';
    case 'belgium':
      return 'BE';
    case 'kiel':
      return 'GER';
    default:
      return '';
  }
};

const getCardGradient = (id: string, isDarkMode: boolean) => {
  if (isDarkMode) {
    switch (id) {
      case 'dhaka':
        return 'from-green-900/40 to-emerald-900/40';
      case 'belgium':
        return 'from-yellow-900/40 to-amber-900/40';
      case 'kiel':
        return 'from-red-900/40 to-rose-900/40';
      default:
        return 'from-gray-800/40 to-gray-900/40';
    }
  } else {
    switch (id) {
      case 'dhaka':
        return 'from-green-50 to-emerald-50';
      case 'belgium':
        return 'from-yellow-50 to-amber-50';
      case 'kiel':
        return 'from-red-50 to-rose-50';
      default:
        return 'from-blue-50 to-indigo-50';
    }
  }
};

export const TimeCard: React.FC<TimeCardProps> = ({ timeInfo, isDarkMode = false }) => {
  const isDhaka = timeInfo.id === 'dhaka';
  const abbreviation = getAbbreviation(timeInfo.id);
  const flagColor = getFlagBasedColor(timeInfo.id);
  const cardGradient = getCardGradient(timeInfo.id, isDarkMode);
  
  return (
    <Card className={`
      w-full h-full backdrop-blur-lg border-0 shadow-2xl transition-all duration-500 ease-out
      rounded-3xl hover:shadow-3xl hover:scale-105 hover:-translate-y-2 cursor-pointer group
      bg-gradient-to-br ${cardGradient}
      ${isDhaka ? 'ring-2 ring-purple-400 ring-opacity-50' : ''}
      ${isDarkMode ? 'shadow-purple-500/10' : 'shadow-blue-500/10'}
    `}>
      <CardContent className="p-6 md:p-8 text-center space-y-4 md:space-y-6 h-full flex flex-col justify-between relative overflow-hidden">
        
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10 transform rotate-12 translate-x-8 -translate-y-8">
          <Clock className="w-full h-full" />
        </div>
        
        {/* Flag emoji with enhanced styling */}
        <div className="text-4xl md:text-5xl transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 relative z-10">
          {timeInfo.flagEmoji}
        </div>
        
        {/* Country abbreviation with gradient */}
        <div className={`text-2xl md:text-3xl font-black transition-all duration-500 group-hover:scale-110 bg-gradient-to-r ${flagColor} bg-clip-text text-transparent`}>
          {abbreviation}
        </div>
        
        {/* Location name with icon */}
        <div className="flex items-center justify-center space-x-2 px-2">
          <MapPin className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`} />
          <div className={`text-sm md:text-base font-semibold leading-relaxed transition-all duration-300 ${
            isDarkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'
          }`}>
            {timeInfo.name}
          </div>
        </div>
        
        {/* Reference indicator for Dhaka */}
        {isDhaka && (
          <div className="flex justify-center">
            <span className="inline-flex items-center space-x-2 text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-lg">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>Reference Zone</span>
            </span>
          </div>
        )}
        
        {/* Current time with enhanced styling */}
        <div className="space-y-2 md:space-y-3 relative z-10">
          <div className={`text-3xl md:text-4xl font-black leading-tight transition-all duration-500 group-hover:scale-110 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {timeInfo.currentTime}
          </div>
          <div className={`text-lg md:text-xl font-bold transition-all duration-300 ${
            timeInfo.period === 'AM' 
              ? (isDarkMode ? 'text-blue-400' : 'text-blue-600')
              : (isDarkMode ? 'text-orange-400' : 'text-orange-600')
          }`}>
            {timeInfo.period}
          </div>
        </div>
        
        {/* Time difference with enhanced design */}
        <div className={`pt-4 md:pt-6 border-t transition-all duration-300 ${
          isDarkMode ? 'border-gray-600/50' : 'border-gray-300/50'
        }`}>
          <p className={`text-xs md:text-sm mb-2 font-medium transition-colors duration-300 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Difference from Dhaka
          </p>
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
            timeInfo.timeDifference === '0h 0m' 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
              : isDarkMode 
                ? 'bg-gray-700/50 text-gray-300' 
                : 'bg-gray-200/70 text-gray-700'
          }`}>
            <Clock className="w-4 h-4" />
            <span className="text-sm md:text-base font-bold">
              {timeInfo.timeDifference}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};