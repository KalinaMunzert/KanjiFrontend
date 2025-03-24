import { useEffect, useState } from "react";

interface TimerProps {
    duration: number; // Initial duration when the game starts
}

const Timer: React.FC<TimerProps> = ({duration}) => {
    const [timeLeft, setTimeLeft] = useState<number>(duration);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [gameOver, setGameOver] = useState<boolean>(false);

    //THIS WORKS
    // Function to start the timer
    const startGame = async () => {
        const param = new URLSearchParams({duration : String(duration)});
        const response = await fetch(`http://localhost:8080/clock/start?${param}`, {
            mode: "cors",
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            setIsRunning(true);
            // console.log("Game Started");
        } else {
            // console.error("Failed to start game");
        }
    };

    // Function to get the current time left from the backend
    const fetchTimeLeft = async () => {
        // console.log("Fetch started")
        try {
            const response = await fetch("http://localhost:8080/clock/timer");
            const time = await response.json();
            // console.log("Fetched Time: ", time);
            setTimeLeft(time);
        } catch (error) {
            // console.error("Error in fetch: ", error);
        }
        // console.log("Fetch ended")
    };

    // Start timer when the component is mounted
    // useEffect(() => {
    //     startGame(); // Start the timer as soon as the component is rendered
    //     const interval = setInterval(fetchTimeLeft, 1000); // Update the time every second
    //     return () => clearInterval(interval); // Cleanup the interval when the component is unmounted
    // }, []);
    
    useEffect(() => {
        startGame(); // Start the timer as soon as the component is rendered
        // const interval = setInterval(fetchTimeLeft, 1000); // Update the time every second
        const interval = setInterval(() => {
            const fetchData = async () => {
                // console.log("Time Pre-fetch: ", timeLeft);
                await fetchTimeLeft();
                // console.log("Time Post-fetch: ", timeLeft);
            };

            fetchData();
    }, 1000);
        return () => clearInterval(interval); // Cleanup the interval when the component is unmounted
    }, []);

    // If time runs out, trigger game over
    useEffect(() => {
        if (timeLeft <= 0) {
            setIsRunning(false);
            setGameOver(true) // Call the game over callback
        }
    }, [timeLeft]);

    return (
        <div>
            <p>Time Left: {timeLeft / 1000} seconds</p>
            {/* <button onClick={onWordCreated} disabled={!isRunning}>Create Word</button> */}
            {/* <p>Game Over: {gameOver === null ? "Loading..." : String(gameOver)}</p> */}
        </div>
    );
};

export default Timer;
