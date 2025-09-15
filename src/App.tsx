import { useState } from "react";

function App() {
  const [amount, setAmount] = useState(10);
  const [loading, setLoading] = useState(false);

  const handleDonate = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/donations/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const session = await response.json();
      if (session.url) {
        window.location.href = session.url; // Stripe Checkout redirect
      } else {
        alert("Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      alert("Error starting donation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Donation Platform</h1>
      <p>Enter amount to donate:</p>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        min="1"
        style={{ marginRight: "10px", padding: "5px" }}
      />
      <button onClick={handleDonate} disabled={loading}>
        {loading ? "Processing..." : "Donate"}
      </button>
    </div>
  );
}

export default App;
