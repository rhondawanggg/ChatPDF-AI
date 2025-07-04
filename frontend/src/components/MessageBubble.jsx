import React from "react";

export default function MessageBubble({ role, content }) {
  // 简单高亮页码和"根据第X页"引用
  const highlight = (text) =>
    text.replace(/第(\d+)页/g, (m) => `<span class='text-blue-500 font-bold'>${m}</span>`);

  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] px-4 py-2 rounded-2xl shadow text-base whitespace-pre-line ${
          isUser
            ? "bg-gradient-to-r from-purple-400 to-blue-400 text-white rounded-br-md"
            : "bg-gray-100 text-gray-800 rounded-bl-md"
        }`}
        dangerouslySetInnerHTML={{ __html: highlight(content) }}
      />
    </div>
  );
} 