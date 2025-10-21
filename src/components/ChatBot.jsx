import React, { useState } from "react";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋! I'm your GoFund assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: "You are a friendly AI assistant for the GoFund donation platform, helping users donate or start campaigns." },
            ...newMessages.map((m) => ({
              role: m.from === "user" ? "user" : "assistant",
              content: m.text,
            })),
          ],
        }),
      });

      const data = await res.json();
      const reply =
        data?.choices?.[0]?.message?.content ||
        "Sorry, I couldn’t understand that 😅";

      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Oops! Something went wrong. Please try again later." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden border border-gray-200 z-50">
      <div className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white p-3 font-semibold">
        💬 GoFund Assistant
      </div>
      <div className="p-3 h-72 overflow-y-auto space-y-2 text-sm text-gray-800">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-xl ${
              msg.from === "user"
                ? "bg-purple-500 text-white ml-auto w-fit max-w-[80%]"
                : "bg-gray-100 mr-auto w-fit max-w-[80%]"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="text-gray-500 italic text-xs">AI is typing...</div>
        )}
      </div>
      <form onSubmit={sendMessage} className="flex border-t border-gray-200">
        <input
          className="flex-1 p-2 outline-none text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-3 text-sm font-semibold"
          disabled={loading}
        >
          Send
        </button>
      </form>
    </div>
  );
}
