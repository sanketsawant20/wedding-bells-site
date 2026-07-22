import { useState, useEffect } from "react";

export function useIsVIP() {
  const [isVIP, setIsVIP] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("vip") === "true") {
        setIsVIP(true);
      }
    }
  }, []);

  return isVIP;
}
