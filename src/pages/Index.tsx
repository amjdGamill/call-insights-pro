import { useState, useEffect } from "react";
import { BottomNavigation } from "@/components/BottomNavigation";
import { CallsScreen } from "@/components/screens/CallsScreen";
import { StatsScreen } from "@/components/screens/StatsScreen";
import { SettingsScreen } from "@/components/screens/SettingsScreen";
import { PermissionsScreen } from "@/components/screens/PermissionsScreen";

type Tab = "calls" | "stats" | "settings";

const screens = {
  calls: CallsScreen,
  stats: StatsScreen,
  settings: SettingsScreen,
};

const PERMISSIONS_GRANTED_KEY = "permissions_granted";

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>("calls");
  const [permissionsGranted, setPermissionsGranted] = useState<boolean | null>(null);
  const ActiveScreen = screens[activeTab];

  useEffect(() => {
    const granted = localStorage.getItem(PERMISSIONS_GRANTED_KEY);
    setPermissionsGranted(granted === "true");
  }, []);

  const handlePermissionsComplete = () => {
    localStorage.setItem(PERMISSIONS_GRANTED_KEY, "true");
    setPermissionsGranted(true);
  };

  // Loading state
  if (permissionsGranted === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Show permissions screen if not granted
  if (!permissionsGranted) {
    return (
      <div className="min-h-screen bg-background max-w-md mx-auto">
        <PermissionsScreen onComplete={handlePermissionsComplete} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative overflow-hidden">
      {/* Phone Frame Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-foreground/90 rounded-b-2xl" />
      </div>
      
      {/* Main Content */}
      <main className="h-screen">
        <ActiveScreen />
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
