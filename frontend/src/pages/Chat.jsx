import React, { useState } from "react";

export default function Chat() {
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState("");

  async function send() {
    if (!text.trim()) return;
    // local UI echo
    setMsgs(m => [...m, { from: "You", text }]);
    setText("");
    // placeholder: in your real app POST to /api/chat
    try {
      const res = await fetch((import.meta.env.VITE_API_URL || "http://localhost:5000") + "/api/chat", {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      setMsgs(m => [...m, { from: "AI", text: data.reply || "AI: no reply (server)" }]);
    } catch(err) {
      console.warn("chat error", err);
      setMsgs(m => [...m, { from: "AI", text: "AI server error. Check backend logs." }]);
    }
  }

  return (
    <section className="container" style={{paddingTop:20}}>
      <div style={{maxWidth:700, margin:"0 auto", color:"#fff"}}>
        <h2>AI Chat Support</h2>
        <div style={{background:"rgba(255,255,255,0.03)", borderRadius:8, padding:12, minHeight:200, marginBottom:8}}>
          {msgs.length === 0 ? <div className="muted">No messages yet.</div> :
            msgs.map((m,i) => <div key={i} style={{marginBottom:8}}><strong>{m.from}:</strong> {m.text}</div>)}
        </div>
        <div style={{display:"flex", gap:8}}>
          <input value={text} onChange={e=>setText(e.target.value)} placeholder="Ask something..." style={{flex:1, padding:10, borderRadius:8}}/>
          <button className="btn" onClick={send}>Send</button>
        </div>
      </div>
    </section>
  );
}
