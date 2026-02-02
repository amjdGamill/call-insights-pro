import { Phone, BarChart3, Settings } from "lucide-react";

type Tab = "calls" | "stats" | "settings";

interface BottomNavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const navItems = [
  { id: "calls" as Tab, label: "المكالمات", icon: Phone },
  { id: "stats" as Tab, label: "الإحصاءات", icon: BarChart3 },
  { id: "settings" as Tab, label: "الإعدادات", icon: Settings },
];

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-xl border-t border-border/50 px-2 pb-6 pt-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`nav-item ${isActive ? "nav-item-active" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Icon className={`w-6 h-6 transition-transform duration-300 ${isActive ? "scale-110" : ""}`} />
              <span className={`text-xs font-medium ${isActive ? "" : "opacity-70"}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
