import { useState } from "react";
import { Search, Mic, X, Trash2, Share2, CheckSquare, Square } from "lucide-react";
import { CallCard } from "../CallCard";
import { ThemeToggle } from "../ThemeToggle";
import { useRecordings } from "@/hooks/useRecordings";
import { DeleteMultipleDialog } from "@/components/dialogs/DeleteMultipleDialog";
import { ShareRecordingsDialog } from "@/components/dialogs/ShareRecordingsDialog";
import { toast } from "sonner";

export function CallsScreen() {
  const { groupedRecordings, deleteRecording, loading } = useRecordings();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  const isSelectionMode = selectedIds.size > 0;

  // Get all recording IDs
  const allRecordingIds = Object.values(groupedRecordings).flat().map(call => call.id);

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

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const selectAll = () => {
    setSelectedIds(new Set(allRecordingIds));
  };

  const deselectAll = () => {
    setSelectedIds(new Set());
  };

  const handleDeleteSelected = () => {
    selectedIds.forEach(id => deleteRecording(id));
    setSelectedIds(new Set());
    setDeleteDialogOpen(false);
    toast.success(`تم حذف ${selectedIds.size} تسجيل`);
  };

  const handleShare = (method: "copy" | "whatsapp" | "email") => {
    // Simulate sharing - in real app would use native sharing
    console.log(`Sharing ${selectedIds.size} recordings via ${method}`);
    setSelectedIds(new Set());
  };

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
          {isSelectionMode ? (
            <>
              <button 
                onClick={deselectAll}
                className="p-2 -m-2 text-foreground"
              >
                <X className="w-6 h-6" />
              </button>
              <span className="text-lg font-semibold">{selectedIds.size} محدد</span>
              <div className="w-10" />
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-foreground">المكالمات</h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="recording-indicator" />
                  <span className="text-sm font-medium text-muted-foreground">التسجيل نشط</span>
                </div>
                <ThemeToggle />
              </div>
            </>
          )}
        </div>

        {/* Search */}
        {!isSelectionMode && (
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
        )}

        {/* Selection Actions Bar */}
        {isSelectionMode && (
          <div className="flex items-center justify-center gap-2 py-2">
            <button
              onClick={selectedIds.size === allRecordingIds.length ? deselectAll : selectAll}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary text-foreground text-sm font-medium"
            >
              {selectedIds.size === allRecordingIds.length ? (
                <>
                  <Square className="w-4 h-4" />
                  إلغاء تحديد الكل
                </>
              ) : (
                <>
                  <CheckSquare className="w-4 h-4" />
                  تحديد الكل
                </>
              )}
            </button>
          </div>
        )}
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
                    isSelectionMode={isSelectionMode}
                    isSelected={selectedIds.has(call.id)}
                    onToggleSelect={toggleSelect}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Selection Mode Bottom Bar */}
      {isSelectionMode && (
        <div className="fixed bottom-20 left-0 right-0 px-5 pb-4">
          <div className="flex items-center justify-center gap-4 p-4 bg-card border border-border rounded-2xl shadow-lg">
            <button
              onClick={() => setShareDialogOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-medium"
            >
              <Share2 className="w-5 h-5" />
              مشاركة
            </button>
            <button
              onClick={() => setDeleteDialogOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-destructive text-destructive-foreground font-medium"
            >
              <Trash2 className="w-5 h-5" />
              حذف
            </button>
          </div>
        </div>
      )}

      {/* FAB - Hide when in selection mode */}
      {!isSelectionMode && (
        <button className="fab-button fixed bottom-24 left-5">
          <Mic className="w-6 h-6" />
        </button>
      )}

      {/* Dialogs */}
      <DeleteMultipleDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteSelected}
        selectedCount={selectedIds.size}
      />

      <ShareRecordingsDialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        selectedCount={selectedIds.size}
        onShare={handleShare}
      />
    </div>
  );
}
