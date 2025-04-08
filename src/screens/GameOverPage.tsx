interface GameOverScreenProps{
    onAllWords: () => void;
}

const GameOverScreen : React.FC<GameOverScreenProps> = ({onAllWords}) => {
    return (
        <>
            <div>
                <h1>Game Over</h1>
            </div>
            <div className="mt-5">
                <h2>Score: {localStorage.getItem("score")}</h2>
            </div>
            <div className="mt-5">
                <button type="button" className="btn btn-primary btn-lg" onClick={onAllWords}>See all words</button>
            </div>
        </>
    );
};

export default GameOverScreen