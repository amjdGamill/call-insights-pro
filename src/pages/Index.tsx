import { useState } from "react";
import { BottomNavigation } from "@/components/BottomNavigation";
import { CallsScreen } from "@/components/screens/CallsScreen";
import { StatsScreen } from "@/components/screens/StatsScreen";
import { FavoritesScreen } from "@/components/screens/FavoritesScreen";
import { SettingsScreen } from "@/components/screens/SettingsScreen";

type Tab = "calls" | "stats" | "favorites" | "settings";

const screens = {
  calls: CallsScreen,
  stats: StatsScreen,
  favorites: FavoritesScreen,
  settings: SettingsScreen,
};

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>("calls");
  const ActiveScreen = screens[activeTab];

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
