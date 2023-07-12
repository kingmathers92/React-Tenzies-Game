import React, { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";
import Game from "./components/Game";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen onTransition={() => setLoading(false)} />;
  }

  return <Game />;
}

export default App;
