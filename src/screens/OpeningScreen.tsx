const OpeningScreen : React.FC = () => {
    return (
        <>
            <div>
                <h1>Kanji 2048</h1>
            </div>
            <div class="container text-center">
                <div class="row align-items-start">
                    {/* <div class="c" */}
                    <button type="button" class="btn btn-primary btn-lg">PLAY</button>
                    <button type="button" class="btn btn-danger btn-lg">TUTORIAL</button>
                </div>
            </div>
        </>
    );
};

export default OpeningScreen;