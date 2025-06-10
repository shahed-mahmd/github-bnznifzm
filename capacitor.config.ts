
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.c2a275878bfe4b819f694cc411f70d31',
  appName: 'Time Difference',
  webDir: 'dist',
  server: {
    url: 'https://c2a27587-8bfe-4b81-9f69-4cc411f70d31.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#3b82f6',
      showSpinner: false
    }
  }
};

export default config;
