import { useEffect, useRef, useState } from 'react';

interface Tile {
  kanji: string;
  x: number;
  y: number;
  color: string;
}

interface Word {
  id: string;
  word: string;
  pronunciation: string;
  definition: string;
  sentences: string[];
}

interface GamePageProps {
  onGameOver: () => void;
}

const GamePage: React.FC<GamePageProps> = ({ onGameOver }) => {
  const [board, setBoard] = useState<Tile[][]>([]);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [allWords, setAllWords] = useState<Word[]>([]);
  const [recentWords, setRecentWords] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const hasStarted = useRef(false);

  const startGame = async () => {
    console.log("Start Game")
    try {
      const response = await fetch('http://localhost:8080/game/start', {
        mode: "cors",
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        fetchBoard(); 
        setIsGameRunning(true);
        startTimer();
      } else {
        const errorText = await response.text();
        console.error('Failed to start game:', errorText);
      }
    } catch (error) {
      console.error('Error starting game:', error);
    }
  };

  const startTimer = async () => {
    console.log("Start Timer");
      const response = await fetch(`http://localhost:8080/clock/start/${timeLeft}`, {
          mode: "cors",
          method: "POST",
          headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
          setIsTimerRunning(true);
          console.log("Timer Started");
      } else {
          console.error("Failed to start timer: ", await response.text);
      }
  };

  const fetchBoard = async () => {
    console.log("Fetching board...");
    const boardData: Tile[][] = await (await fetch("http://localhost:8080/game/board")).json();
    console.log("Board data: ", boardData);
    setBoard(boardData);
  };  

  const moveTiles = async (direction: string) => {
    const res = await fetch("http://localhost:8080/game/move", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ direction }) 
    });
  
    if (res.ok) {
      const newWords: Word[] = await res.json();
      console.log("New Words: ", newWords);
      setAllWords(prev => [...prev, ...newWords]);
      console.log("All Words: ", allWords);
      setRecentWords(prev => [...newWords.map(w => w.word), ...prev].slice(0, 6));
      console.log("Recent Words: ", recentWords);
      fetchBoard();

      if (newWords.length !== 0) {
        const resTimer = await fetch("http://localhost:8080/clock/timer");
        if (resTimer.ok) {
          console.log("resTimer: ", resTimer)
          const timer = await resTimer.text();
          console.log("Timer Text: ",timer);
          console.log("Timer Num: ", Number(timer));
          setTimeLeft(Number(timer));
        }

        const resScore = await fetch("http://localhost:8080/game/score");
        if (resScore.ok) {
          console.log("resScore: ", resScore);
          const score = await resScore.text();
          console.log("Score text: ", score);
          console.log("Score Num: ", Number(score));
          setScore(Number(score));
        }
      }

    } else {
      console.error("Move failed:", await res.text());
    }
  };

  const isBoardFull = () => {
    if (!board || board.length === 0) return false; // Prevent premature Game Over
  
    return board.every(row =>
      row.every(tile => tile !== null && tile.kanji.trim() !== "")
    );
  };

  const formatTime = (seconds : number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const getColor = (color : string) => {
    switch (color) {
      case 'white': 
        return '#ffffff';
      case 'green':
        return '#b3ffbc';
      case 'red':
        return '#ffb3b3';
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isGameRunning) return;

      switch (event.key) {
        case 'ArrowUp':
          moveTiles('up');
          break;
        case 'ArrowDown':
          moveTiles('down');
          break;
        case 'ArrowLeft':
          moveTiles('left');
          break;
        case 'ArrowRight':
          moveTiles('right');
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isGameRunning]);

  useEffect(() => {
    if (timeLeft <= 0 || isBoardFull()) {
      localStorage.setItem("allWords", JSON.stringify(allWords));
      localStorage.setItem("score", String(score));
      onGameOver();
    }

    const timer = setTimeout(() => {
      if (timeLeft > 0 && isTimerRunning) setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, board]);

  useEffect(() => {
    if (!hasStarted.current) {
      hasStarted.current = true;
      startGame();
    }
  }, []);  

  return isGameRunning ?(
    <div className="container my-5">
      <div className="row">
        <div className="col-md-7">
          <h1 className="mb-4">Kanji 2048</h1>

          <div className="bg-light p-3 rounded" style={{ maxWidth: '500px' }}>
            {board.map((row, rowIndex) => (
              <div key={rowIndex} className="d-flex mb-2">
                {row.map((tile, colIndex) => (
                  <div
                    key={colIndex}
                    className="d-flex justify-content-center align-items-center 
                               border rounded m-1"
                    style={{
                      width: '80px',
                      height: '80px',
                      fontSize: '2rem',
                      backgroundColor: getColor(tile.color)
                    }}
                  >
                    {tile?.kanji}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-5">
          <h4>Score: {score}</h4>

          <h3>Recent Words</h3>
          <ul className="list-group" style={{ minHeight: '325px' }}>
            {recentWords.length > 0 ? (
              recentWords.map((word, idx) => (
                <li key={idx} className="list-group-item border-0">
                  <h5>{word}</h5>
                </li>
              ))
            ) : (
              <li className="list-group-item border-0 text-muted">
                <em>No words yet</em>
              </li>
            )}
          </ul>

          <div className="d-flex justify-content-center">
            <h2>Time: {formatTime(timeLeft)}</h2>
          </div>

          <div className="progress my-3">
            <div
              className="progress-bar bg-danger"
              style={{ width: `${(timeLeft / 180) * 100}%` }}
              aria-valuenow={timeLeft}
              aria-valuemin={0}
              aria-valuemax={180}
            />
          </div>
          
        </div>
      </div>
    </div>
  ) :  (
    <div className="container my-5 text-center">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    <p className="mt-3">Loading game board...</p>
  </div>
  );
};

export default GamePage;
