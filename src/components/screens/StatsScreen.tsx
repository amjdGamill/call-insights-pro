import { Phone, Clock, TrendingUp, Users, PhoneIncoming, PhoneOutgoing, PhoneMissed } from "lucide-react";

const stats = [
  { label: "إجمالي المكالمات", value: "156", icon: Phone, color: "bg-primary/10 text-primary" },
  { label: "مدة التسجيل", value: "24:35:12", icon: Clock, color: "bg-success/10 text-success" },
  { label: "المكالمات اليوم", value: "12", icon: TrendingUp, color: "bg-accent/10 text-accent" },
  { label: "جهات الاتصال", value: "45", icon: Users, color: "bg-warning/10 text-warning" },
];

const callBreakdown = [
  { type: "واردة", count: 78, icon: PhoneIncoming, color: "bg-call-incoming", percentage: 50 },
  { type: "صادرة", count: 62, icon: PhoneOutgoing, color: "bg-call-outgoing", percentage: 40 },
  { type: "فائتة", count: 16, icon: PhoneMissed, color: "bg-call-missed", percentage: 10 },
];

const weeklyData = [
  { day: "السبت", calls: 18 },
  { day: "الأحد", calls: 24 },
  { day: "الإثنين", calls: 15 },
  { day: "الثلاثاء", calls: 32 },
  { day: "الأربعاء", calls: 28 },
  { day: "الخميس", calls: 22 },
  { day: "الجمعة", calls: 17 },
];

const maxCalls = Math.max(...weeklyData.map((d) => d.calls));

const topContacts = [
  { name: "أحمد محمد", calls: 23, avatar: "أ" },
  { name: "سارة علي", calls: 18, avatar: "س" },
  { name: "محمد خالد", calls: 15, avatar: "م" },
  { name: "فاطمة أحمد", calls: 12, avatar: "ف" },
];

export function StatsScreen() {
  return (
    <div className="flex flex-col h-full overflow-y-auto pb-32">
      {/* Header */}
      <header className="px-5 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-foreground">الإحصاءات</h1>
        <p className="text-muted-foreground mt-1">نظرة عامة على مكالماتك</p>
      </header>

      {/* Stats Grid */}
      <div className="px-5 grid grid-cols-2 gap-4 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="stat-card animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-foreground">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          );
        })}
      </div>

      {/* Call Breakdown */}
      <div className="px-5 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">توزيع المكالمات</h2>
        <div className="glass-card p-5">
          <div className="flex items-center gap-4 mb-4">
            {callBreakdown.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.type} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-sm text-muted-foreground">{item.type}</span>
                </div>
              );
            })}
          </div>
          
          {/* Progress Bar */}
          <div className="h-4 rounded-full overflow-hidden flex">
            {callBreakdown.map((item) => (
              <div
                key={item.type}
                className={`h-full ${item.color} transition-all duration-500`}
                style={{ width: `${item.percentage}%` }}
              />
            ))}
          </div>

          <div className="flex justify-between mt-4">
            {callBreakdown.map((item) => (
              <div key={item.type} className="text-center">
                <span className="text-xl font-bold text-foreground">{item.count}</span>
                <p className="text-xs text-muted-foreground">{item.type}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="px-5 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">نشاط الأسبوع</h2>
        <div className="glass-card p-5">
          <div className="flex items-end justify-between gap-2 h-32">
            {weeklyData.map((item, index) => (
              <div key={item.day} className="flex flex-col items-center gap-2 flex-1">
                <div
                  className="w-full bg-primary/20 rounded-lg relative overflow-hidden transition-all duration-500"
                  style={{ height: `${(item.calls / maxCalls) * 100}%` }}
                >
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-primary rounded-lg transition-all duration-700"
                    style={{ 
                      height: "100%",
                      animationDelay: `${index * 0.1}s`
                    }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{item.day.slice(0, 2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Contacts */}
      <div className="px-5 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">أكثر جهات الاتصال</h2>
        <div className="space-y-3">
          {topContacts.map((contact, index) => (
            <div
              key={contact.name}
              className="glass-card p-4 flex items-center gap-4 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <span className="text-lg font-bold text-primary">{contact.avatar}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{contact.name}</h3>
                <p className="text-sm text-muted-foreground">{contact.calls} مكالمة</p>
              </div>
              <span className="text-2xl font-bold text-primary">#{index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
