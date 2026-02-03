// نظام إدارة التسجيلات المحلي

export interface Recording {
  id: string;
  name: string;
  number: string;
  type: "incoming" | "outgoing" | "missed";
  duration: number; // بالثواني
  date: string; // ISO string
  audioPath?: string; // مسار الملف الصوتي في التخزين المحلي
}

export interface RecordingStats {
  totalCalls: number;
  totalDuration: number; // بالثواني
  todayCalls: number;
  incomingCalls: number;
  outgoingCalls: number;
  missedCalls: number;
  topContacts: { name: string; calls: number; avatar: string }[];
  weeklyData: { day: string; calls: number }[];
}

const RECORDINGS_KEY = "call_recordings";
const SETTINGS_KEY = "app_settings";

// الإعدادات الافتراضية
export interface AppSettings {
  autoRecord: boolean;
  audioQuality: "low" | "medium" | "high" | "ultra";
  theme: "light" | "dark" | "system";
}

const defaultSettings: AppSettings = {
  autoRecord: true,
  audioQuality: "high",
  theme: "system",
};

// ===== إدارة التسجيلات =====

export function getRecordings(): Recording[] {
  try {
    const data = localStorage.getItem(RECORDINGS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveRecordings(recordings: Recording[]): void {
  localStorage.setItem(RECORDINGS_KEY, JSON.stringify(recordings));
}

export function addRecording(recording: Omit<Recording, "id">): Recording {
  const recordings = getRecordings();
  const newRecording: Recording = {
    ...recording,
    id: `rec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  };
  recordings.unshift(newRecording);
  saveRecordings(recordings);
  return newRecording;
}

export function deleteRecording(id: string): void {
  const recordings = getRecordings();
  const filtered = recordings.filter((r) => r.id !== id);
  saveRecordings(filtered);
}

export function deleteAllRecordings(): void {
  saveRecordings([]);
}

// ===== إدارة الإعدادات =====

export function getSettings(): AppSettings {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    return data ? { ...defaultSettings, ...JSON.parse(data) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings: Partial<AppSettings>): void {
  const current = getSettings();
  localStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...current, ...settings }));
}

// ===== حساب الإحصائيات =====

export function calculateStats(): RecordingStats {
  const recordings = getRecordings();
  const today = new Date().toDateString();
  
  const todayRecordings = recordings.filter(
    (r) => new Date(r.date).toDateString() === today
  );
  
  const incomingCalls = recordings.filter((r) => r.type === "incoming").length;
  const outgoingCalls = recordings.filter((r) => r.type === "outgoing").length;
  const missedCalls = recordings.filter((r) => r.type === "missed").length;
  
  const totalDuration = recordings.reduce((sum, r) => sum + r.duration, 0);
  
  // حساب أكثر جهات الاتصال
  const contactCounts: Record<string, { count: number; name: string }> = {};
  recordings.forEach((r) => {
    if (!contactCounts[r.number]) {
      contactCounts[r.number] = { count: 0, name: r.name };
    }
    contactCounts[r.number].count++;
  });
  
  const topContacts = Object.entries(contactCounts)
    .sort(([, a], [, b]) => b.count - a.count)
    .slice(0, 4)
    .map(([, data]) => ({
      name: data.name,
      calls: data.count,
      avatar: data.name.charAt(0),
    }));
  
  // حساب بيانات الأسبوع
  const weekDays = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
  const weeklyData = weekDays.map((day, index) => {
    const dayDate = new Date();
    const diff = (dayDate.getDay() - index + 7) % 7;
    dayDate.setDate(dayDate.getDate() - diff);
    
    const dayRecordings = recordings.filter(
      (r) => new Date(r.date).toDateString() === dayDate.toDateString()
    );
    
    return { day, calls: dayRecordings.length };
  });
  
  return {
    totalCalls: recordings.length,
    totalDuration,
    todayCalls: todayRecordings.length,
    incomingCalls,
    outgoingCalls,
    missedCalls,
    topContacts,
    weeklyData,
  };
}

// ===== تنسيق المدة =====

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

export function formatTotalDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// ===== تنسيق التاريخ =====

export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return "اليوم";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "أمس";
  } else {
    return date.toLocaleDateString("ar-SA");
  }
}

export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString("ar-SA", { hour: "numeric", minute: "2-digit" });
}

// ===== بيانات تجريبية للاختبار =====

export function seedDemoData(): void {
  const existingRecordings = getRecordings();
  if (existingRecordings.length > 0) return;
  
  const demoRecordings: Omit<Recording, "id">[] = [
    {
      name: "أحمد محمد",
      number: "+966501234567",
      type: "incoming",
      duration: 323, // 5:23
      date: new Date().toISOString(),
    },
    {
      name: "سارة علي",
      number: "+966559876543",
      type: "outgoing",
      duration: 765, // 12:45
      date: new Date().toISOString(),
    },
    {
      name: "محمد خالد",
      number: "+966544567890",
      type: "missed",
      duration: 0,
      date: new Date(Date.now() - 86400000).toISOString(), // أمس
    },
    {
      name: "فاطمة أحمد",
      number: "+966563210987",
      type: "incoming",
      duration: 492, // 8:12
      date: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      name: "عبدالله سعيد",
      number: "+966505551234",
      type: "outgoing",
      duration: 154, // 2:34
      date: new Date(Date.now() - 86400000).toISOString(),
    },
  ];
  
  demoRecordings.forEach((r) => addRecording(r));
}
