import React, { useEffect, useState } from "react";
import "./SplashScreen.css";
import { Howl } from "howler";
import logo from "../assets/logo.png";
import loadSound from "../assets/loading.mp3";

const SplashScreen = ({ onTransition }) => {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    const sound3 = new Howl({
      src: loadSound,
      onend: () => onTransition(),
    });

    const timer = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length < 6) {
          return [
            ...prevDots,
            <div key={prevDots.length} className="dot-load"></div>,
          ];
        } else {
          clearInterval(timer);
          sound3.play();
          return [
            ...prevDots,
            <div key={prevDots.length} className="dot-load dot-middle"></div>,
            <div key={prevDots.length + 1} className="dot-load"></div>,
            <div key={prevDots.length + 2} className="dot-load"></div>,
            <div key={prevDots.length + 3} className="dot-load"></div>,
            <div key={prevDots.length + 4} className="dot-load"></div>,
            <div key={prevDots.length + 5} className="dot-load"></div>,
            <div key={prevDots.length + 6} className="dot-load"></div>,
          ];
        }
      });
    }, 450);

    return () => {
      clearInterval(timer);
      sound3.pause();
    };
  }, [onTransition]);

  return (
    <div className="splash-container">
      <div className="loading-container">
        <img src={logo} alt="Logo" className="logo" />
        <div className="loading-animation">
          <div className="rolling-dice">{dots.map((dot) => dot)}</div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
