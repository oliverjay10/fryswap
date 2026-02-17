export default function Chart() {
  return (
    <div className="guideWrapper">
      <div className="guideCard">

        <h1>Air Fryer Temperature Chart</h1>

        <p>
          This quick reference chart helps you find common air fryer cooking
          temperatures for popular foods. Always check food early as air fryers
          can vary by model.
        </p>

        <table className="chartTable">
          <thead>
            <tr>
              <th>Food</th>
              <th>Temperature</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Fries / Chips</td><td>180°C</td><td>12–18 min</td></tr>
            <tr><td>Chicken Breast</td><td>180°C</td><td>18–22 min</td></tr>
            <tr><td>Chicken Wings</td><td>190°C</td><td>20–25 min</td></tr>
            <tr><td>Fish Fillets</td><td>180°C</td><td>10–15 min</td></tr>
            <tr><td>Vegetables</td><td>170°C</td><td>8–12 min</td></tr>
            <tr><td>Frozen Nuggets</td><td>200°C</td><td>10–12 min</td></tr>
          </tbody>
        </table>

        <p style={{ marginTop: "20px" }}>
          For exact conversions, try the FrySwap converter.
        </p>

      </div>
    </div>
  );
}
