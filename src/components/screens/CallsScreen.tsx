import { useState } from "react";
import { Search, Mic } from "lucide-react";
import { CallCard, Call } from "../CallCard";

const mockCalls: Call[] = [
  {
    id: "1",
    name: "أحمد محمد",
    number: "+966 50 123 4567",
    type: "incoming",
    duration: "5:23",
    date: "اليوم",
    time: "10:30 ص",
    isFavorite: true,
    isRecorded: true,
  },
  {
    id: "2",
    name: "سارة علي",
    number: "+966 55 987 6543",
    type: "outgoing",
    duration: "12:45",
    date: "اليوم",
    time: "09:15 ص",
    isFavorite: false,
    isRecorded: true,
  },
  {
    id: "3",
    name: "محمد خالد",
    number: "+966 54 456 7890",
    type: "missed",
    duration: "0:00",
    date: "أمس",
    time: "11:45 م",
    isFavorite: false,
    isRecorded: false,
  },
  {
    id: "4",
    name: "فاطمة أحمد",
    number: "+966 56 321 0987",
    type: "incoming",
    duration: "8:12",
    date: "أمس",
    time: "3:20 م",
    isFavorite: true,
    isRecorded: true,
  },
  {
    id: "5",
    name: "عبدالله سعيد",
    number: "+966 50 555 1234",
    type: "outgoing",
    duration: "2:34",
    date: "أمس",
    time: "1:00 م",
    isFavorite: false,
    isRecorded: true,
  },
];

export function CallsScreen() {
  const [calls, setCalls] = useState(mockCalls);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCalls = calls.filter(
    (call) =>
      call.name.includes(searchQuery) || call.number.includes(searchQuery)
  );

  const toggleFavorite = (id: string) => {
    setCalls((prev) =>
      prev.map((call) =>
        call.id === id ? { ...call, isFavorite: !call.isFavorite } : call
      )
    );
  };

  const groupedCalls = filteredCalls.reduce((acc, call) => {
    if (!acc[call.date]) {
      acc[call.date] = [];
    }
    acc[call.date].push(call);
    return acc;
  }, {} as Record<string, Call[]>);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="px-5 pt-12 pb-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">المكالمات</h1>
          <div className="flex items-center gap-2">
            <div className="recording-indicator" />
            <span className="text-sm font-medium text-muted-foreground">التسجيل نشط</span>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="البحث في المكالمات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pr-12 pl-4 bg-secondary/50 rounded-xl border-0 focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground transition-all"
          />
        </div>
      </header>

      {/* Calls List */}
      <div className="flex-1 overflow-y-auto px-5 pb-32">
        {Object.entries(groupedCalls).map(([date, calls]) => (
          <div key={date} className="mb-6">
            <h2 className="text-sm font-semibold text-muted-foreground mb-3">{date}</h2>
            <div className="space-y-3">
              {calls.map((call) => (
                <CallCard
                  key={call.id}
                  call={call}
                  onToggleFavorite={() => toggleFavorite(call.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* FAB */}
      <button className="fab-button fixed bottom-24 left-5">
        <Mic className="w-6 h-6" />
      </button>
    </div>
  );
}
