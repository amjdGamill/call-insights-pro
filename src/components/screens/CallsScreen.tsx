import { useState } from "react";
import { Search, Mic } from "lucide-react";
import { CallCard } from "../CallCard";
import { ThemeToggle } from "../ThemeToggle";
import { useRecordings } from "@/hooks/useRecordings";

export function CallsScreen() {
  const { groupedRecordings, deleteRecording, loading } = useRecordings();
  const [searchQuery, setSearchQuery] = useState("");

  // تصفية التسجيلات حسب البحث
  const filteredGroups = Object.entries(groupedRecordings).reduce((acc, [date, calls]) => {
    const filtered = calls.filter(
      (call) =>
        call.name.includes(searchQuery) || call.number.includes(searchQuery)
    );
    if (filtered.length > 0) {
      acc[date] = filtered;
    }
    return acc;
  }, {} as typeof groupedRecordings);

  if (loading) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="px-5 pt-12 pb-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">المكالمات</h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="recording-indicator" />
              <span className="text-sm font-medium text-muted-foreground">التسجيل نشط</span>
            </div>
            <ThemeToggle />
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
        {Object.keys(filteredGroups).length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">لا توجد تسجيلات</p>
          </div>
        ) : (
          Object.entries(filteredGroups).map(([date, calls]) => (
            <div key={date} className="mb-6">
              <h2 className="text-sm font-semibold text-muted-foreground mb-3">{date}</h2>
              <div className="space-y-3">
                {calls.map((call) => (
                  <CallCard
                    key={call.id}
                    call={call}
                    onDelete={deleteRecording}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* FAB */}
      <button className="fab-button fixed bottom-24 left-5">
        <Mic className="w-6 h-6" />
      </button>
    </div>
  );
}
