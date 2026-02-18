import Comparison from "./comparison";
import Chart from "./chart";
import { Routes, Route, Link } from "react-router-dom";
import Guide from "./guide";
import { useState, useRef } from "react";
import "./App.css";

function App() {

  const [result, setResult] = useState("--");
  const [timer, setTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [notice, setNotice] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  function convert() {
    const ovenTemp = Number(document.getElementById("ovenTemp").value);
    const ovenTime = Number(document.getElementById("ovenTime").value);
    const foodType = document.getElementById("foodType").value;

    if (!ovenTemp || !ovenTime) {
      setNotice("Please enter temperature and time");
      return;
    } else {
      setNotice("");
    }

    let multiplier = 0.8;

    switch (foodType) {
      case "chicken":
        multiplier = 0.9;
        break;
      case "fries":
        multiplier = 0.75;
        break;
      case "fish":
        multiplier = 0.72;
        break;
      case "vegetables":
        multiplier = 0.7;
        break;
    }

    let airTime = Math.round(ovenTime * multiplier);
    let airTemp = ovenTemp - 20;

    setResult(`Temp: ${airTemp}°C, Time: ${airTime} minutes`);
    setTimer(airTime * 60);
    setTimeLeft(airTime * 60);
    setIsRunning(false);
  }

  function startTimer() {
    if (!timer) return;

    setIsRunning(true);
    let halfway = timer / 2;

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {

        if (prev === Math.floor(halfway)) {
          playBeep();
          showNotice("Flip or shake your food 🔄");
        }

        if (prev <= 1) {
          clearInterval(intervalRef.current);
          playBeep();
          showNotice("Cooking complete 🎉");
          setIsRunning(false);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);
  }

  function showNotice(message) {
    setNotice(message);
    setTimeout(() => setNotice(""), 3000);
  }

  function playBeep(times = 3) {
    let count = 0;

    const interval = setInterval(() => {
      const audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
      audio.play();

      count++;
      if (count >= times) clearInterval(interval);
    }, 300);
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  const progress = timer ? ((timer - timeLeft) / timer) * 100 : 0;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="container">

            <div style={{ textAlign: "center", marginBottom: "14px" }}>
              <div className="logoBadge">🍟 FrySwap</div>
            </div>

            <h2 style={{
              textAlign: "center",
              marginTop: "8px",
              marginBottom: "6px",
              fontSize: "22px",
              lineHeight: "1.3"
            }}>
              Convert oven instructions to air fryer settings in seconds
            </h2>

            <p style={{
              textAlign: "center",
              marginTop: "0",
              marginBottom: "14px",
              color: "#666"
            }}>
              A quick starting point with built-in timer and reminders.
            </p>

            {notice && <div className="notice">{notice}</div>}

            <label>Oven Temperature (°C)</label>
            <input type="number" id="ovenTemp" placeholder="e.g. 200" />

            <label>Oven Time (minutes)</label>
            <input type="number" id="ovenTime" placeholder="e.g. 30" />

            <label>Food Type</label>
            <select id="foodType">
              <option value="generic">Generic</option>
              <option value="chicken">Chicken</option>
              <option value="fries">Fries / Chips</option>
              <option value="fish">Fish</option>
              <option value="vegetables">Vegetables</option>
            </select>

            <button onClick={convert}>Convert!</button>
            <br></br>

            {result !== "--" && (
              <div className="resultCard">
                <div className="resultTitle">Air Fryer Settings</div>
                <div className="resultValue">{result}</div>
                <div className="resultHint">Flip or shake halfway through</div>
              </div>
            )}

            {/* ⭐ PROGRESS BAR ONLY WHEN TIMER RUNNING */}
            {isRunning && (
              <div style={{ marginTop: "12px" }}>
                <div style={{ height: "8px", background: "#eee", borderRadius: "6px" }}>
                  <div
                    style={{
                      width: `${progress}%`,
                      height: "100%",
                      background: "#ff6b3d",
                      borderRadius: "6px",
                      transition: "width 1s linear"
                    }}
                  />
                </div>
              </div>
            )}
<br></br>
            <p style={{ fontSize: "13px", color: "#666", textAlign: "center" }}>
              Air fryers vary by model — check food a few minutes early.
            </p>

            <div className="infoSection">
              <h3>How FrySwap works</h3>
              <p>
                FrySwap gives you a quick starting point for converting oven instructions
                to air fryer settings. Since every air fryer cooks slightly differently,
                use the suggested temperature and time as a guide and check your food a
                few minutes early.
              </p>
            </div>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Link to="/guide">Read the conversion guide</Link>
            </div>
            
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <Link to="/chart">View temperature chart</Link>
              <div style={{ textAlign: "center", marginTop: "10px" }}>
                <Link to="/oven-vs-air-fryer">Oven vs Air Fryer comparison</Link>
              </div>
            </div>

            {timer && (
              <>
                <button onClick={startTimer}>Start Cooking</button>
                <div className="result" style={{ marginTop: "10px" }}>
                  ⏱️ {formatTime(timeLeft)}
                </div>
              </>
            )}

          </div>
        }
      />

      <Route path="/guide" element={<Guide />} />
      <Route path="/chart" element={<Chart />} />
      <Route path="/oven-vs-air-fryer" element={<Comparison />} />

    </Routes>
  );
}

export default App;
