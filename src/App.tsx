import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import { useEffect, useState } from 'react';
import Timer from './Timer';
import WordDisplay from './WordDisplay';
import Game from './Game';
import GameUI from './GameUI';
import GameUITEST from './GameUITEST';

function App() {
  // const [timeLeft, setTimeLeft] = useState<number>();

  // async function fetchTime() {
  //   const ops = {
  //     mode: "cors",
  //     method:"POST",
  //     headers: {"Content-Type":"application/json"},
  //   };
  //   const response = await fetch("http://localhost:8080/api/game/timer/99",{
  //     mode: "cors",
  //     method:"POST",
  //     headers: {"Content-Type":"application/json"},
  //   });
  //   const time = response;

  //   console.log("ENDED")
  //   console.log(time);
  // }
//-------------------------------------------------------------------
  // I honestly can't tell if this works or not
  // function GameOver() {
  //   const [gameOver, setGameOver] = useState<boolean | null>(null);

  //   useEffect(() => {
  //     async function fetchGameOver () {
  //       const response = await fetch("http://localhost:8080/clock/game-over", {
  //         mode: "cors",
  //         method: "GET",
  //         headers: { "Content-Type": "application/json" },
  //       });
  //       const text: string = await response.text();
  //       setGameOver(text.trim() === "true");
  //     }

  //     fetchGameOver();
  //   }, []);

  //   return <p>Game Over: {gameOver === null ? "Loading..." : String(gameOver)}</p>;
  // }

  // function GameOver() {
  //   const gameOver: boolean = getGameOver();
  //   return <p>Game Over: {String(gameOver)}</p>
  // }

  // async function fetchTime() {
  //   try {
  //     const response = await fetch("http://localhost:8080/api/game/boop", {
  //       mode : "cors",
  //       method: "GET",
  //       headers: {"Content-Type" : "application/json"},
  //     },)

  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

//----------------------------------------------------------------
  //This method decrements timeLeft every second. IT WORKS
  // const Timer = (initialTime: number) => {
  //   const [timeLeft, setTimeLeft] = useState(initialTime);
  
  //   useEffect(() => {
  //     const intervalId = setInterval(() => {
  //       setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
  //     }, 1000);
  
  //     return () => clearInterval(intervalId);
  //   }, []);
  
  //   return timeLeft;
  // };
  
  // const timeLeft: number = Timer(100);

  return (
    <div>
      <Timer duration={1000000} />
      {/* <WordDisplay /> */}
      {/* <Game /> */}
      <GameUITEST />
    </div>
  )
}

export default App;
