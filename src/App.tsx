import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import { useEffect, useState } from 'react';
import Timer from './Timer';
import Game from './Game';
import GameScreen from './screens/GameScreen';
import OpeningPage from './screens/OpeningPage';
import GamePage from './screens/GamePage';
import GameOverScreen from './screens/GameOverPage';
import AllWordsPage from './screens/AllWordsPage';

function App() {
    const [activeScreen, setActiveScreen] = useState('opening');
    const [gameOver, setGameOver] = useState(false); 

    const startGame = () => {
        setActiveScreen('game');
        setGameOver(false);
    };

    // Function to end the game
    const endGame = () => {
        setGameOver(true);
        setActiveScreen('gameOver');
    };

    const wordsPage = () => {
        setActiveScreen('allWords')
    }

    return (
        <div>
            {activeScreen === 'opening' && <OpeningPage onStart={startGame} />}
            {activeScreen === 'game' && <GamePage onGameOver={endGame} />}
            {activeScreen === 'gameOver' && <GameOverScreen onAllWords={wordsPage}/>}
            {activeScreen === 'allWords' && <AllWordsPage />}
        </div>
    );
}

export default App;
