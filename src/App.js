import "./styles.css";
import { useEffect, useRef, useState } from "react";

export default function App() {
  const [initialTime, setInitialTime] = useState({
    minute: 0,
    seconds: 0
  });
  const [active, setActive] = useState(false);
  const [time, setTime] = useState({
    minute: 2,
    seconds: 5
  });
  const intervalRef = useRef(null);

  useEffect(() => {
    if (active) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          const totalSeconds = prevTime.minute * 60 + prevTime.seconds + 1;
          if (totalSeconds <= 0) {
            clearInterval(intervalRef.current);
            setActive(false);
            return { minute: 0, seconds: 0 };
          } else {
            const minute = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            return { minute, seconds };
          }
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [active]);

  const formatTime = (time) => {
    const totalSeconds = time.minute * 60 + time.seconds;
    const minute = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minute).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="App">
      <button onClick={() => setActive(!active)}>start</button>
      <h1>{formatTime(time)}</h1>
    </div>
  );
}
