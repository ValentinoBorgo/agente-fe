"use client";

import { useState, useRef } from "react";

function uid() {
  return crypto.randomUUID();
}

export function useChatStream() {
  const [messages, setMessages] = useState<any[]>([]);
  const [thinking, setThinking] = useState(false);

  const messagesRef = useRef<any[]>([]);
  messagesRef.current = messages;

  async function sendMessage(content: string) {
    const userMsg = { localId: uid(), role: "user", content };

    const updatedMessages = [...messagesRef.current, userMsg];
    setMessages(updatedMessages);
    messagesRef.current = updatedMessages;

    setThinking(true);

    const llmMessages = updatedMessages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => ({ role: m.role, content: m.content }));

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: llmMessages }),
    });

    if (!res.body) return console.error("❌ No stream");

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    let assistantMsgId = uid();

    let gotFirstToken = false;

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value);
      const parts = buffer.split("\n\n");
      buffer = parts.pop()!;

      for (const p of parts) {
        if (!p.startsWith("data:")) continue;

        const raw = p.replace("data:", "").trim();
        if (!raw) continue;

        const parsed = JSON.parse(raw);

        if (parsed.type === "token") {
          if (!gotFirstToken) {
            gotFirstToken = true;
            setThinking(false);
          }

          setMessages((prev) => {
            const last = prev[prev.length - 1];

            if (last?.role === "assistant") {
              return [
                ...prev.slice(0, -1),
                { ...last, content: last.content + parsed.token },
              ];
            }

            return [
              ...prev,
              {
                localId: assistantMsgId,
                role: "assistant",
                content: parsed.token,
              },
            ];
          });

          continue;
        }

        if (parsed.type === "reasoning") {
          console.log("🧠 LLEGÓ THINKING DESDE EL BACKEND");
          continue;
        }

        if (parsed.type === "tool_call") {
          console.log("TOOL CALL:", parsed);
          continue;
        }

        if (parsed.type === "tool_result") {
          const toolMsg = {
            localId: uid(),
            role: "tool",
            content: JSON.stringify(parsed.result),
          };

          setMessages((prev) => [...prev, toolMsg]);
          continue;
        }

        if (parsed.type === "finish") {
          continue;
        }
      }
    }
  }

  return { messages, thinking, sendMessage };
}
