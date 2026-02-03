import { useState, useEffect, useCallback } from "react";
import {
  Recording,
  RecordingStats,
  getRecordings,
  deleteRecording as deleteRec,
  deleteAllRecordings as deleteAllRecs,
  calculateStats,
  formatDuration,
  formatRelativeDate,
  formatTime,
  seedDemoData,
} from "@/lib/recordings";

export interface FormattedRecording extends Recording {
  formattedDuration: string;
  formattedDate: string;
  formattedTime: string;
  isRecorded: boolean;
}

export function useRecordings() {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRecordings = useCallback(() => {
    seedDemoData(); // تحميل بيانات تجريبية إذا كانت القائمة فارغة
    setRecordings(getRecordings());
    setLoading(false);
  }, []);

  useEffect(() => {
    loadRecordings();
  }, [loadRecordings]);

  const deleteRecording = useCallback((id: string) => {
    deleteRec(id);
    setRecordings(getRecordings());
  }, []);

  const deleteAllRecordings = useCallback(() => {
    deleteAllRecs();
    setRecordings([]);
  }, []);

  const refresh = useCallback(() => {
    loadRecordings();
  }, [loadRecordings]);

  // تنسيق التسجيلات للعرض
  const formattedRecordings: FormattedRecording[] = recordings.map((r) => ({
    ...r,
    formattedDuration: formatDuration(r.duration),
    formattedDate: formatRelativeDate(r.date),
    formattedTime: formatTime(r.date),
    isRecorded: r.duration > 0,
  }));

  // تجميع التسجيلات حسب التاريخ
  const groupedRecordings = formattedRecordings.reduce((acc, recording) => {
    const date = recording.formattedDate;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(recording);
    return acc;
  }, {} as Record<string, FormattedRecording[]>);

  return {
    recordings: formattedRecordings,
    groupedRecordings,
    loading,
    deleteRecording,
    deleteAllRecordings,
    refresh,
  };
}

export function useRecordingStats() {
  const [stats, setStats] = useState<RecordingStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    seedDemoData();
    setStats(calculateStats());
    setLoading(false);
  }, []);

  const refresh = useCallback(() => {
    setStats(calculateStats());
  }, []);

  return { stats, loading, refresh };
}
