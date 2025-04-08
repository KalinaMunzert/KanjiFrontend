import { useEffect, useState } from 'react';

interface Word {
  id: string;
  word: string;
  pronunciation: string;
  definition: string;
  sentences: string[];
}

const AllWordsPage : React.FC = () => {
  const [allWords, setAllWords] = useState<Word[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("allWords");
    if (stored) setAllWords(JSON.parse(stored));
    console.log("Stored: ", stored);
    console.log("All Words: ", allWords);
  }, []);

  return (
    <div className="container my-4">
      <h2>All Words Collected</h2>
      {allWords.map((w, idx) => {
        const [jp, en] = w.sentences;
        console.log("JP: ", jp);
        console.log("EN: ", en);

        return (
          <div key={w.id || idx} className="card my-2 p-3">
            <h4>{w.word}</h4>
            <p><strong>Pronunciation:</strong> {w.pronunciation}</p>
            <p><strong>Definition:</strong> {w.definition}</p>
            <p>
              <strong>Example (JP):</strong> {jp}<br />
              <strong>Example (EN):</strong> {en}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default AllWordsPage;