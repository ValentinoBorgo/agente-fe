"use client";

import { useState } from "react";
import { useChatStream } from "../hooks/useChatStream";
import MessageBubble from "../components/MessageBubble";
import ThinkingIndicator from "../components/ThinkingIndicator";

export default function ChatPage() {
  const { messages, thinking, sendMessage } = useChatStream();
  const [input, setInput] = useState("");

  function handleSend() {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  }

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">🤖 Agente IA</h1>

      <div className="flex-1 overflow-y-auto border rounded p-4 bg-white">
        {messages
          .filter((m) => m.role !== "tool_call" && m.role !== "tool_result")
          .map((m, i) => (
            <MessageBubble key={m.localId ?? i} msg={m} />
          ))}

        {thinking && <ThinkingIndicator />}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          className="flex-1 border rounded p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button
          onClick={handleSend}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
