import { useState, useRef } from "react"
import './App.css'

function App() {

  const [result, setResult] = useState("--")
  const [timer, setTimer] = useState(null)
  const [timeLeft, setTimeLeft] = useState(0)
  const [notice, setNotice] = useState("")
  const intervalRef = useRef(null)

  function convert() {
    const ovenTemp = Number(document.getElementById("ovenTemp").value);
    const ovenTime = Number(document.getElementById("ovenTime").value);
    const foodType = document.getElementById("foodType").value;

    if (!ovenTemp || !ovenTime) {
      setNotice("Please enter temperature and time")
      return;
    }

    let airTemp = ovenTemp - 20;
    let airTime = Math.round(ovenTime * 0.8);

    switch(foodType) {
      case "chicken": airTime += 5; break;
      case "fries": airTime -= 2; break;
      case "fish": airTime -= 3; break;
      case "vegetables": airTime -= 5; break;
    }

    setResult(`Temp: ${airTemp}°C, Time: ${airTime} minutes. Flip/shake halfway.`);
    setTimer(airTime * 60);
    setTimeLeft(airTime * 60);
  }

  function startTimer() {
    if (!timer) return;

    let halfway = timer / 2

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {

        if (prev === Math.floor(halfway)) {
          playBeep()
          showNotice("Flip or shake your food 🔄")
        }

        if (prev <= 1) {
          clearInterval(intervalRef.current)
          playBeep()
          showNotice("Cooking complete 🎉")
          return 0
        }

        return prev - 1
      })
    }, 1000)
  }

  function showNotice(message) {
    setNotice(message)
    setTimeout(() => setNotice(""), 3000)
  }

  function playBeep(times = 3) {
  let count = 0

  const interval = setInterval(() => {
    const audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg")
    audio.play()

    count++
    if (count >= times) clearInterval(interval)
  }, 300)
}


  function formatTime(seconds) {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  return (
    <div className="container">
      
      <div style={{textAlign: "center", marginBottom: "10px"}}>
  <div style={{
    display: "inline-block",
    background: "#FFE1D6",
    padding: "12px 16px",
    borderRadius: "999px",
    fontSize: "22px"
  }}>
    🍟 FrySwap
  </div>
</div>

      <p>Convert oven instructions into perfect air fryer settings</p>

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

      <h2>Air Fryer Result:</h2>
      <p className="result">{result}</p>

      {timer && (
        <>
          <button onClick={startTimer}>Start Cooking</button>
          <div className="result" style={{marginTop: "10px"}}>
            ⏱️ {formatTime(timeLeft)}
          </div>
        </>
      )}
    </div>
  )
}

export default App

