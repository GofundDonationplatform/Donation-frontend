import React, { useState } from "react";

function App() {
  const [status, setStatus] = useState("Backend status not checked yet");
  const [amount, setAmount] = useState("");

  // Check backend health (optional, you can remove if not needed)
  React.useEffect(() => {
    fetch("/api/health")
      .then((res) => res.text())
      .then((data) => setStatus(data))
      .catch((err) => setStatus("Error: " + err.message));
  }, []);

  async function handleDonate() {
    try {
      const response = await fetch("/api/donations/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Number(amount) }),
      });

      const data = await response.json();
      console.log("API response:", data);

      if (!response.ok) {
        alert("Error: " + (data.error || JSON.stringify(data)));
        return;
      }

      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe checkout
      } else {
        alert("No Stripe URL returned: " + JSON.stringify(data));
      }
    } catch (error) {
      console.log("API error:", error);
      alert("API error: " + error.message);
    }
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Donation Platform Frontend ✅</h1>
      <h2>Backend Health:</h2>
      <pre>{status}</pre>
      <div style={{ marginTop: "2rem" }}>
        <input
          type="number"
          min="1"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ marginRight: "8px" }}
        />
        <button onClick={handleDonate}>Donate</button>
      </div>
    </div>
  );
}

export default App;
