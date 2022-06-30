import React, { useState, useEffect } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
// import useSound from "use-sound";
// import clapSfx from "./assets/aplausos.mp3";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [bestTime, setBestTime] = useState(
    JSON.parse(localStorage.getItem("bestTime")) || null
  );

  // const crowdClap = () => {
  //   const [play] = useSound(clapSfx);

  //   return { play };
  // };

  useEffect(() => {
    const yourBestTime = localStorage.getItem("bestTime");
    if (tenzies) {
      if (!yourBestTime) {
        localStorage.setItem("bestTime", JSON.stringify(timer));
      } else if (timer < yourBestTime) {
        setBestTime(timer);
      }
    }
  }, [tenzies, timer]);

  useEffect(() => {
    if (!tenzies) {
      let sec = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      return () => {
        clearInterval(sec);
      };
    } else {
      setTimer((prevTimer) => prevTimer);
    }
  }, [tenzies]);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

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
    console.log(newDice);
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((prevDice) =>
        prevDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
      setCount((prevCount) => prevCount + 1);
    } else {
      setTenzies(false);
      setCount(0);
      setDice(allNewDice());
      setTimer(0);
    }
  }

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  // function formatTime(ms) {
  //   let sec = Math.round(ms / 1000);
  //   let min;
  //   if (sec > 60) {
  //     min = ~~(sec % 60);
  //     return `${min} min ${sec} s`;
  //   }
  //   return `${sec} s`;
  // }

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
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="stats row">
        <h3>
          Time ⏱️
          <p className="timer">{timer}s</p>
        </h3>
        <h3>
          Best Time 🏆
          <p className="bestTime">{bestTime}s</p>
        </h3>
        <h3>
          Rolls 🎲
          <p className="rolls">{count} </p>
        </h3>
      </div>
      <div className="dice-container">{diceElm}</div>
      <button
        className="rolldBtn"
        onClick={() => {
          rollDice();
        }}
      >
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
