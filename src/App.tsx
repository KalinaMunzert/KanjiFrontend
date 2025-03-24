import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
// import { useEffect, useState } from 'react';
import Timer from './Timer';
import Game from './Game';
import GameScreen from './screens/GameScreen';
import OpeningScreen from './screens/OpeningScreen';

function App() {

  return (
    <div>
      <Timer duration={300000} />
      <Game />
      <GameScreen />
      {/* <OpeningScreen /> */}
    </div>
  )
}

export default App;
