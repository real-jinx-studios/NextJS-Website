import { useState, useEffect } from "react";
export function useSessionStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof window !== "undefined") {
      const jsonValue = sessionStorage.getItem(key);
      if (jsonValue != null) {
        try {
          return JSON.parse(jsonValue);
        } catch (e) {
          return null;
        }
      }
    }
    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
