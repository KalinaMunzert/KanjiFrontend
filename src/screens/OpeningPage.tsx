interface OpeningScreenProps {
    onStart: () => void;
}

const OpeningPage : React.FC<OpeningScreenProps> = ({onStart}) => {
    return (
        <>
            <div>
                <h1>Kanji 2048</h1>
            </div>
            <div class="container text-center mt-5">
                <div class="row align-items-start">
                    <div class="col">
                        <button type="button" class="btn btn-danger btn-lg" onClick={onStart}>PLAY</button>
                    </div>
                    <div class="col">
                        <button type="button" class="btn btn-primary btn-lg">TUTORIAL</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OpeningPage;