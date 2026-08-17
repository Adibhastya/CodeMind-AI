import { useEffect, useState } from "react";

function useSplashScreen() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return {
    showSplash,
  };
}

export default useSplashScreen;