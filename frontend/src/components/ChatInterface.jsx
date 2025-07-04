import React, { useRef, useState, useEffect } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatInterface({ disabled, chatHistory, onSend, loading }) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, loading]);

  const handleSend = () => {
    if (!input.trim() || disabled || loading) return;
    onSend(input.trim());
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[420px]">
      <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-3">
        {chatHistory.length === 0 && (
          <div className="text-gray-400 text-center mt-16">请上传 PDF 并开始提问…</div>
        )}
        {chatHistory.map((msg, idx) => (
          <MessageBubble key={idx} role={msg.role} content={msg.content} />
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gradient-to-r from-blue-400 to-purple-400 text-white px-4 py-2 rounded-2xl shadow animate-pulse">AI思考中…</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-2 flex items-center gap-2">
        <textarea
          className="flex-1 resize-none rounded-xl border border-gray-200 shadow px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white min-h-[44px] max-h-32 transition-all"
          placeholder={disabled ? "请先上传 PDF" : "请输入你的问题，回车发送…"}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled || loading}
          rows={1}
        />
        <button
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold px-6 py-2 rounded-xl shadow hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50"
          onClick={handleSend}
          disabled={disabled || loading || !input.trim()}
        >发送</button>
      </div>
    </div>
  );
} 