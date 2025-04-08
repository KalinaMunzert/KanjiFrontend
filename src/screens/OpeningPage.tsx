interface OpeningScreenProps {
    onStart: () => void;
}

const OpeningPage : React.FC<OpeningScreenProps> = ({onStart}) => {

    return (
        <>
            <div>
                <h1>Kanji 2048</h1>
            </div>
            <div className="container text-center mt-5">
                <div className="row align-items-start">
                    <div className="col">
                        <button type="button" className="btn btn-danger btn-lg" onClick={onStart}>PLAY</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OpeningPage;