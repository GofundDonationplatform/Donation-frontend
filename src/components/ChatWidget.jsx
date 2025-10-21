import React, { useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [msgs, setMsgs] = useState([
    { from: "ai", text: "Hi — need help donating? Ask me anything." },
  ]);

  const send = async () => {
    if (!value.trim()) return;
    const userMsg = { from: "user", text: value };
    setMsgs((m) => [...m, userMsg]);
    setValue("");
    // Basic simulated reply — replace with real backend call if available
    setTimeout(() => {
      setMsgs((m) => [...m, { from: "ai", text: "Thanks! We received that. For payments use the Donate page." }]);
    }, 700);
  };

  return (
    <div style={{
      position: "fixed",
      bottom: 18,
      left: 18,
      width: 300,
      zIndex: 9999,
      fontFamily: "Inter, system-ui, sans-serif"
    }}>
      <div style={{
        background: "rgba(255,255,255,0.06)",
        padding: 10,
        borderRadius: 10,
        boxShadow: "0 8px 20px rgba(2,6,23,0.6)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <strong style={{ color: "white" }}>AI Support</strong>
          <button onClick={() => setOpen(!open)} style={{ background: "transparent", color: "white", border: "none", cursor: "pointer" }}>
            {open ? "−" : "+"}
          </button>
        </div>

        {open ? (
          <>
            <div style={{ maxHeight: 180, overflowY: "auto", marginTop: 8 }}>
              {msgs.map((m, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 13, color: m.from === "ai" ? "#e6eef8" : "#cbd5e1" }}>
                    {m.from === "ai" ? "AI" : "You"}:
                  </div>
                  <div style={{ background: m.from === "ai" ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)", padding: 8, borderRadius: 8, marginTop: 4 }}>
                    <div style={{ color: "white", fontSize: 14 }}>{m.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Ask me anything..." style={{
                flex: 1, padding: 8, borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "transparent", color: "white"
              }} />
              <button onClick={send} className="btn">Send</button>
            </div>
          </>
        ) : (
          <div style={{ marginTop: 8, color: "white", fontSize: 13 }}>Click + to expand chat</div>
        )}
      </div>
    </div>
  );
}
