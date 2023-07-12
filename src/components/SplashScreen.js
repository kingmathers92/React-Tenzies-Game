import React, { useEffect } from "react";
import { Howl } from "howler";
import logo from "../assets/logo.png";
import loadSound from "../assets/loading-sound-short.mp3";

const SplashScreen = ({ onTransition }) => {
  useEffect(() => {
    const sound3 = new Howl({
      src: loadSound,
      onend: () => onTransition(),
    });

    const timer = setTimeout(() => {
      sound3.play();
    }, 3000);

    return () => {
      clearTimeout(timer);
      sound3.pause();
    };
  }, [onTransition]);

  return (
    <div className="splash-screen">
      <div className="loading-container">
        <img src={logo} alt="Logo" className="logo" />
        <div className="loading-animation">
          <div className="dot1"></div>
          <div className="dot2"></div>
          <div className="dot3"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
