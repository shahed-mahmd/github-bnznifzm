import React, { useState, useEffect } from 'react';
import { TimeCard } from './TimeCard';
import { getCurrentTimeInfo } from '../utils/timeUtils';
import { TimeInfo } from '../types/TimeInfo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Globe, MessageCircle, RefreshCw, Sun, Moon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export const GlobalTimeTracker: React.FC = () => {
  const [timeInfos, setTimeInfos] = useState<TimeInfo[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const updateTimes = () => {
      const updatedTimes = getCurrentTimeInfo();
      setTimeInfos(updatedTimes);
      setLastUpdated(new Date());
    };

    // Initial update
    updateTimes();

    // Update every second
    const interval = setInterval(updateTimes, 1000);

    return () => clearInterval(interval);
  }, []);

  // Check system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    // Simulate a brief refresh animation
    setTimeout(() => {
      const updatedTimes = getCurrentTimeInfo();
      setTimeInfos(updatedTimes);
      setLastUpdated(new Date());
      setIsRefreshing(false);
      
      toast({
        title: "Times Updated",
        description: "All time zones have been refreshed successfully.",
      });
    }, 500);
  };

  const handleWhatsAppClick = () => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      window.open('whatsapp://', '_self');
    } else {
      window.open('https://web.whatsapp.com', '_blank');
    }
    
    toast({
      title: "Opening WhatsApp",
      description: "Redirecting to WhatsApp application...",
    });
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const formatLastUpdated = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-black' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    } p-4 md:p-6 flex flex-col`}>
      <div className="max-w-6xl mx-auto w-full h-full flex flex-col">
        {/* Header with enhanced design */}
        <Card className={`mb-6 md:mb-8 backdrop-blur-lg border-0 shadow-2xl transition-all duration-500 ${
          isDarkMode 
            ? 'bg-gray-800/30 shadow-purple-500/10' 
            : 'bg-white/70 shadow-blue-500/10'
        } rounded-3xl hover:shadow-3xl hover:scale-[1.02]`}>
          <CardHeader className="text-center pb-4 pt-8 md:pb-6 md:pt-10 relative">
            {/* Theme toggle button */}
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 rounded-full hover:bg-white/20 transition-all duration-300"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600" />
              )}
            </Button>

            <CardTitle className="flex items-center justify-center space-x-3 text-2xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              <Globe className="w-8 h-8 md:w-10 md:h-10 text-purple-500 animate-spin-slow" />
              <span className="tracking-wide">Global Time Tracker</span>
              <Clock className="w-8 h-8 md:w-10 md:h-10 text-pink-500 animate-pulse" />
            </CardTitle>
            
            <p className={`text-base md:text-lg mt-4 font-medium transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Real-time synchronization across time zones
            </p>
            
            <div className="flex items-center justify-center space-x-4 mt-6">
              <div className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Last updated: {formatLastUpdated(lastUpdated)}
              </div>
              
              <Button
                onClick={handleRefresh}
                variant="ghost"
                size="sm"
                disabled={isRefreshing}
                className="rounded-full hover:bg-white/20 transition-all duration-300"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Time cards with enhanced grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-10 flex-1">
          {timeInfos.map((timeInfo, index) => (
            <div
              key={timeInfo.id}
              className="transform transition-all duration-500 hover:scale-105"
              style={{
                animationDelay: `${index * 150}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              <TimeCard timeInfo={timeInfo} isDarkMode={isDarkMode} />
            </div>
          ))}
        </div>

        {/* Enhanced WhatsApp button */}
        <div className="flex justify-center mb-8 md:mb-6">
          <Button 
            onClick={handleWhatsAppClick}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-6 md:px-12 md:py-6 text-lg md:text-xl font-bold rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-green-500/25 hover:scale-110 hover:-translate-y-2 active:scale-95 group"
            size="lg"
          >
            <MessageCircle className="w-6 h-6 md:w-7 md:h-7 mr-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            <span className="tracking-wide">Open WhatsApp</span>
          </Button>
        </div>

        {/* Enhanced footer */}
        <div className="text-center pb-6 md:pb-4">
          <div className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full backdrop-blur-sm transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-800/30 text-gray-400' 
              : 'bg-white/50 text-gray-600'
          }`}>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-sm font-medium">
              All times relative to Dhaka, Bangladesh • Live updates every second
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};