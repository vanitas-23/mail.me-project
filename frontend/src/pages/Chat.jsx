import React, { useState } from "react";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages([...messages, { role: "user", content: input }]);

    try {
      const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
      const API_KEY = process.env.API_KEY
      //console.log(API_KEY);
      
      const response = await axios.post(
        `${API_URL}?key=${API_KEY}`,
        {
          contents: [{ parts: [{ text: input }] }],
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const botMessage = {
        role: "bot",
        content: response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI",
      };

      setMessages([...messages, { role: "user", content: input }, botMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }

    setInput("");
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "34%",
        right: "20px",
        width: "350px",
        backgroundColor: "#121212",
        color: "#FFFFFF",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
        display: "flex",
        flexDirection: "column",
        padding: "10px",
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          maxHeight: "300px",
          padding: "5px",
          scrollbarWidth: "none",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              backgroundColor: msg.role === "user" ? "#1E88E5" : "#333",
              padding: "8px",
              borderRadius: "5px",
              marginBottom: "5px",
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "80%",
            }}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", padding: "5px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          style={{
            flex: 1,
            padding: "8px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#333",
            color: "#FFF",
            outline: "none",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "8px",
            marginLeft: "5px",
            backgroundColor: "#1E88E5",
            color: "#FFF",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
