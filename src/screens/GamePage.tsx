import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface GameScreenProps {
  onGameOver: () => void;
}

const GamePage: React.FC<GameScreenProps> = ({onGameOver}) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180); 
  const [recentWords, setRecentWords] = useState([' ', ' ', ' ', ' ', ' ', ' ', '', '', '', '']);
  const [selectedChars, setSelectedChars] = useState([]);
  
  const [grid, setGrid] = useState([
    [null, null, null, null],
    ['朝', null, null, null],
    [null, null, '食', null],
    [null, null, null, null]
  ]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleCharClick = (row, col) => {
    if (grid[row][col] === null) return;
    
    const newSelectedChars = [...selectedChars, { char: grid[row][col], row, col }];
    setSelectedChars(newSelectedChars);
    
    if (newSelectedChars.length >= 2) {
      const word = newSelectedChars.map(item => item.char).join('');
      if (newSelectedChars.length === 2) {
        setScore(score + 100);
        setRecentWords([word, ...recentWords.slice(0, 5)]);
        setSelectedChars([]);
      }
    }
  };

  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const timerProgress = (timeLeft / 180) * 100;

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-7">
          <h1 className="mb-4">Kanji 2048</h1>
          
          <div className="bg-light p-3 rounded" style={{ maxWidth: '500px' }}>
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="d-flex mb-2">
                {row.map((char, colIndex) => (
                  <div 
                    key={colIndex}
                    className={`
                      d-flex justify-content-center align-items-center 
                      bg-white border rounded m-1
                      ${selectedChars.some(item => item.row === rowIndex && item.col === colIndex) ? 'bg-primary text-white' : ''}
                    `}
                    style={{ 
                      width: '80px', 
                      height: '80px', 
                      fontSize: '2rem',
                      cursor: char ? 'pointer' : 'default'
                    }}
                    onClick={() => handleCharClick(rowIndex, colIndex)}
                  >
                    {char}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        
        <div className="col-md-5">
          <div className="d-flex justify-content-center">
            <h2>Score: {score}</h2>
          </div>
          
          <div className="mt-5">
            <h3>Recent Words</h3>
            <ul className="list-group">
              {recentWords.map((word, index) => (
                <li key={index} className="list-group-item border-0 ps-0">
                  <h4>{word}</h4>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-5">
            <h3>Timer {formatTime(timeLeft)}</h3>
            <div className="progress">
              <div 
                className="progress-bar bg-danger" 
                role="progressbar" 
                style={{ width: `${timerProgress}%` }}
                aria-valuenow={timerProgress} 
                aria-valuemin="0" 
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage; 
