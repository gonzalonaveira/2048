import { useEffect } from "react";

/**
 * Hook to use the arrows
 * @param callback
 */
export default function useArrowsEvent(callback) {
  useEffect(() => {
    const handler = (event) => {
      const { key } = event;
      const match = key.toLowerCase().match(/arrow(up|right|down|left)/);
      if (match) {
        callback(match[1]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [callback]);
}
