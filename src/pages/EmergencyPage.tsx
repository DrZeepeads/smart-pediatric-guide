
import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import EmergencyGuidelines from '@/components/emergency/EmergencyGuidelines';

export default function EmergencyPage() {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Emergency Pediatric Guidelines</h1>
          <p className="text-muted-foreground max-w-3xl">
            Quick reference guidelines for common pediatric emergencies. This page is designed to work offline for access during emergencies.
          </p>
          
          <div className={`mt-4 flex items-center gap-2 ${isOnline ? 'text-green-600' : 'text-amber-600'} text-sm font-medium`}>
            {isOnline ? (
              <>
                <Wifi className="h-4 w-4" />
                <span>Online - Content is up to date</span>
              </>
            ) : (
              <>
                <WifiOff className="h-4 w-4" />
                <span>Offline - Using cached content</span>
              </>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-8 max-w-4xl">
          <EmergencyGuidelines />
          
          <div className="text-sm text-muted-foreground">
            <p className="mb-2 font-medium">Important Notes:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>These guidelines are simplified for emergency reference only</li>
              <li>Always use clinical judgment and follow local protocols</li>
              <li>Pediatric dosing should be verified when possible</li>
              <li>Add this app to your home screen for quick offline access</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
