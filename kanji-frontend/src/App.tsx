import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import { useState } from 'react';

function App() {
  const [timeLeft, setTimeLeft] = useState<number>();

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

  async function fetchTime() {
    try {
      const response = await fetch("http://localhost:8080/api/game/boop", {
        mode : "cors",
        method: "GET",
        headers: {"Content-Type" : "application/json"},
      },)

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  // const timeInterval = setInterval(fetchTime, 1000);
  //TODO how to m
  // ake it run every interval

  fetchTime();

  return (
    <div>
      <p>Time Left: {timeLeft} seconds </p>
    </div>
  )
}

export default App
