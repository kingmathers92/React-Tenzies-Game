import React, { useState, useEffect } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { Howl, Howler } from "howler";
import diceRoll from "../assets/rolling-dice.mp3";
import popDown from "../assets/pop-down.mp3";
import clap from "../assets/applause.mp3";

const sound = new Howl({
  src: clap,
});

const sound1 = new Howl({
  src: diceRoll,
});

const sound2 = new Howl({
  src: popDown,
});
Howler.volume(0.5);

const Game = () => {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [bestTime, setBestTime] = useState(
    JSON.parse(localStorage.getItem("bestTime")) || null
  );
  const [gameStarted, setGameStarted] = useState(false); // Track whether the game has started

  useEffect(() => {
    const yourBestTime = localStorage.getItem("bestTime");
    if (tenzies) {
      if (!yourBestTime) {
        localStorage.setItem("bestTime", JSON.stringify(timer));
        setBestTime(timer);
      } else if (timer < parseInt(yourBestTime)) {
        localStorage.setItem("bestTime", JSON.stringify(timer));
        setBestTime(timer);
      }
    }
  }, [tenzies, timer]);

  useEffect(() => {
    if (gameStarted && !tenzies) {
      let sec = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      return () => {
        clearInterval(sec);
      };
    }
  }, [gameStarted, tenzies]);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (gameStarted && allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice, gameStarted]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function startGame() {
    setGameStarted(true);
  }

  function rollDice() {
    if (gameStarted && !tenzies) {
      setDice((prevDice) =>
        prevDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
      setCount((prevCount) => prevCount + 1);
      sound1.play();
    } else if (tenzies) {
      setTenzies(false);
      setCount(0);
      setDice(allNewDice());
      setTimer(0);
      sound2.play();
    }
  }

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElm = dice.map((die) => (
    <Die
      value={die.value}
      key={die.id}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <span className="hide">{tenzies && sound.play()}</span>
      <h1 className={tenzies ? "title blink_me" : "title"}>
        {tenzies ? "You Won!" : "Tenzies"}
      </h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="stats row">
        <h3>
          Time ⏱️
          <p className="timer">{timer}</p>
        </h3>
        <h3>
          Best Time 🏆
          <p className="bestTime">{bestTime ? `${bestTime}s` : "N/A"}</p>
        </h3>
        <h3>
          Rolls 🎲
          <p className="rolls">{count} </p>
        </h3>
      </div>
      {gameStarted ? (
        <span onClick={() => sound2.play()} className="dice-container">
          {diceElm}
        </span>
      ) : (
        <button className="rolldBtn" onClick={startGame}>
          Start Game
        </button>
      )}
      {gameStarted && (
        <button className="rolldBtn" onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
      )}
    </main>
  );
};

export default Game;
