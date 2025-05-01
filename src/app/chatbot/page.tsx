"use client";
import { useState } from "react";
import ChatBubble from "./ChatBubble";

export default function ChatbotUI() {
  const [messages, setMessages] = useState<
    { message: string; isUser: boolean }[]
  >([{ message: "Halo! Ada yang bisa saya bantu?", isUser: false }]);

  const [userInput, setUserInput] = useState("");

  const handleSendMessage = () => {
    if (userInput.trim()) {
      setMessages([...messages, { message: userInput, isUser: true }]);
      setUserInput("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="bg-black text-white px-4 py-3 text-xl font-semibold shadow">
        Chatbot
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-gray-50">
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg.message} isUser={msg.isUser} />
        ))}
      </div>
      <div className="border-t px-4 py-3 flex items-center gap-2">
        <input
          type="text"
          placeholder="Ketik pesan..."
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-black"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-black text-white px-4 py-2 rounded-full hover:bg-black transition"
          onClick={handleSendMessage}
        >
          Kirim
        </button>
      </div>
    </div>
  );
}
