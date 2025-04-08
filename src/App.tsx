import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import { useState } from 'react';
import OpeningPage from './screens/OpeningPage';
import TestingGame from './screens/GamePage';
import GameOverScreen from './screens/GameOverPage';
import AllWordsPage from './screens/AllWordsPage';

function App() {
    const [activeScreen, setActiveScreen] = useState('opening');

    const startGame = () => {
        setActiveScreen('game');
    };

    const endGame = () => {
        setActiveScreen('gameOver');
    };

    const wordsPage = () => {
        setActiveScreen('allWords')
    }

    return (
        <div>
            {activeScreen === 'opening' && <OpeningPage onStart={startGame} />}
            {activeScreen === 'game' && <TestingGame onGameOver={endGame} />}
            {activeScreen === 'gameOver' && <GameOverScreen onAllWords={wordsPage}/>}
            {activeScreen === 'allWords' && <AllWordsPage />}
        </div>
    );
}

export default App;
