import { useState, useEffect, useCallback } from "react";
import { AppSettings, getSettings, saveSettings } from "@/lib/recordings";

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(getSettings());

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  const updateSettings = useCallback((newSettings: Partial<AppSettings>) => {
    saveSettings(newSettings);
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  return {
    settings,
    updateSettings,
  };
}
