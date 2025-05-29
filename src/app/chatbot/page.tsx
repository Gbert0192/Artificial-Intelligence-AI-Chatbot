// ChatbotUI.tsx
"use client";
import { useState } from "react";
import ChatBubble from "./ChatBubble";
import TypingBubble from "./TypingBubble";

export default function ChatbotUI() {
  const [messages, setMessages] = useState<
    { message: string; isUser: boolean }[]
  >([
    { message: "Hi There..! Theres something i can help with?", isUser: false },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = async () => {
    if (userInput.trim() === "") {
      return;
    }

    const newUserMessage = { message: userInput, isUser: true };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setUserInput("");

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userInput }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API response error text:", errorText);
        throw new Error(
          `Gagal mendapatkan respons dari Gemini. Response text: ${errorText}`
        );
      }

      const data = await response.json();
      const geminiResponse = data.text;

      setMessages((prevMessages) => [
        ...prevMessages,
        { message: geminiResponse, isUser: false },
      ]);
    } catch (err: unknown) {
      console.error("Error calling Gemini API from frontend:", err);
      if (err instanceof Error) {
        setError(err.message || "Terjadi kesalahan saat menghubungi Gemini.");
      } else {
        setError("Terjadi kesalahan yang tidak diketahui.");
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: "Maaf, terjadi kesalahan. Silakan coba lagi.",
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !isLoading) {
      // Cegah pengiriman saat loading
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="bg-black text-white px-4 py-3 text-xl font-semibold shadow">
        Chatbot By An Jing
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-gray-50">
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg.message} isUser={msg.isUser} />
        ))}
        {isLoading && <TypingBubble />}
        {error && ( // Tampilkan pesan error
          <ChatBubble message={`Error: ${error}`} isUser={false} />
        )}
      </div>
      <div className="border-t px-4 py-3 flex items-center gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-black"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading} // Nonaktifkan input saat loading
        />
        <button
          className="bg-black text-white px-4 py-2 rounded-full hover:bg-black transition disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSendMessage}
          disabled={isLoading || userInput.trim() === ""} // Nonaktifkan tombol saat loading atau input kosong
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}
