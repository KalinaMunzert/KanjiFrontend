import { useState, useEffect } from "react";

interface Word {
    id: string
    word: string;
    pronunciation: string;
    definition: string;
    exampleSentence: string;
}

const Game = () => {
//   const [currentWord, setCurrentWord] = useState<string | null>(null);
  const [wordData, setWordData] = useState<Word | null>(null);

  useEffect(() => {
    const handleKeyPress = async (event: KeyboardEvent) => {
      const direction = getDirection(event.key);
      if (!direction) return;

      const response = await fetch("http://localhost:8080/game/move", {
        mode: "cors",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ direction }),
      });

      const newWords: string[] = await response.json();
      newWords.forEach(word => {
        if (word !== null) {
            // setCurrentWord(word);  // Store the word
            fetchWordData(word);
        }
      });

    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const fetchWordData = async (word: string) => {
    const response = await fetch(`http://localhost:8080/word/data/word=${word}`, {
        mode: "cors",
        method: "GET", 
        headers: { "Content-Type": "application/json" },
    });
    const data: Word = await response.json();
    setWordData(data);
  };

  const getDirection = (key: string): string | null => {
    switch (key) {
      case "ArrowUp": return "up";
      case "ArrowDown": return "down";
      case "ArrowLeft": return "left";
      case "ArrowRight": return "right";
      default: return null;
    }
  };

  return (
    <div className="p-4">
      {/* <h1 className="text-2xl font-bold">Kanji 2048</h1> */}
      <p>Use arrow keys to play</p>

      {wordData && (
        <div>
          <h2>Word: {wordData.word} ({wordData.pronunciation})</h2>
          <p>Defintion: {wordData.definition}</p>
          <blockquote>{wordData.exampleSentence}</blockquote>
        </div>
      )}
    </div>
  );
};

export default Game;