import { useState, useEffect, Key } from 'react';

// Define the structure of the game board
interface GameBoard {
    board: Tile[][]; // You can adjust this based on the structure you're using
    recentWords: Array<string>;
}

interface Tile {
    kanji: string;
    x: number;
    y: number;
}

interface Word {
    id: string
    word: string;
    pronunciation: string;
    definition: string;
    exampleSentence: string;
}

const GameUITEST = () => {
    const [board, setBoard] = useState<Tile[][] | null>(null);
    const [isGameRunning, setIsGameRunning] = useState(false);
  
    // Fetch the game board from the backend
    const fetchBoard = async () => {
        try {
            const response = await fetch("http://localhost:8080/game/board");
            if (response.ok) {
                const updatedBoard: Tile[][] = await response.json();
                setBoard(updatedBoard); // Update the board state with the new data
            } else {
                console.error(`Failed to fetch updated board: ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error fetching updated board:", error);
        }
    };
  
    // Start a new game by calling the backend
    const startGame = async () => {
      try {
        const response = await fetch('http://localhost:8080/game/start', {
          mode: "cors",
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          setIsGameRunning(true);
          fetchBoard(); // Fetch the initial board state
        } else {
          const errorText = await response.text();
          console.error('Failed to start game:', errorText);
        }
      } catch (error) {
        console.error('Error starting game:', error);
      }
    };
  
    // Handle the move action
    const moveTiles = async (direction: string) => {
      const response = await fetch(`http://localhost:8080/game/move?${direction}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ direction}),
      });
  
      if (response.ok) {
        // const newWord: string = await response.json();
        // console.log('New word made: ', newWord);
        fetchBoard(); // Update the board after the move
      } else {
        console.error('Failed to make move');
      }
    };
  
    // Handle arrow key events
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
        const interval = setInterval(() => {
            const fetchBoard = async () => {
                await fetchBoard();
            }
        }, 500);
        return () => clearInterval(interval);
    }, []);
  
    return (
      <div>
        <h1>Kanji 2048 Game</h1>
  
        {/* Button to start a new game */}
        {!isGameRunning && <button onClick={startGame}>Start Game</button>}
  
        {/* Display the board */}
        {board && (
          <div className="game-board">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="board-row">
              {row.map((tile, colIndex) => (
                <div key={colIndex} className="board-tile">
                  {tile?.kanji || " "} {/* Display kanji or a blank space */}
                </div>
              ))}
            </div>
          ))}
        </div>
        )}
  
        {/* Timer or other game status can be added here */}
      </div>
    );
  };
  
  export default GameUITEST;