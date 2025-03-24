interface GameOverScreenProps{
    onAllWords: () => void;
}

const GameOverScreen : React.FC<GameOverScreenProps> = ({onAllWords}) => {
    return (
        <>
            <div>
                <h1>Game Over</h1>
            </div>
            <div class="mt-5">
                <h2>Score: 231</h2>
            </div>
            <div class="mt-5">
                <button type="button" class="btn btn-primary btn-lg" onClick={onAllWords}>See all words</button>
            </div>
        </>
    );
};

export default GameOverScreen