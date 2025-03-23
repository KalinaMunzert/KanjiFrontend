import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
// import { useEffect, useState } from 'react';
import Timer from './Timer';
import Game from './Game';
import GameUI from './GameUI';

function App() {

  return (
    <div>
      <Timer duration={1000000} />
      <Game />
      <GameUI />
    </div>
  )
}

export default App;
