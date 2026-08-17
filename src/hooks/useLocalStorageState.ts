"use client";
import { useState, useCallback, useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("local-storage-update", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("local-storage-update", callback);
  };
}

export function useLocalStorageNumber(key: string, defaultValue = 0): [number, (val: number) => void] {
  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") return defaultValue;
    try {
      const item = localStorage.getItem(key);
      return item ? parseInt(item, 10) : defaultValue;
    } catch {
      return defaultValue;
    }
  }, [defaultValue, key]);

  const getServerSnapshot = useCallback(() => defaultValue, [defaultValue]);

  const storeValue = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [localValue, setLocalValue] = useState<number | null>(null);

  const setValue = useCallback(
    (newVal: number) => {
      setLocalValue(newVal);
      try {
        localStorage.setItem(key, String(newVal));
        window.dispatchEvent(new Event("local-storage-update"));
      } catch (_) {}
    },
    [key]
  );

  return [localValue !== null ? localValue : storeValue, setValue];
}
