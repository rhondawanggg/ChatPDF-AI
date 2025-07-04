import React, { useState } from "react";
import UploadBox from "./components/UploadBox";
import ChatInterface from "./components/ChatInterface";

export default function App() {
  const [pdfId, setPdfId] = useState(null);
  const [fileName, setFileName] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // 上传成功后回调
  const handleUploadSuccess = (id, name) => {
    setPdfId(id);
    setFileName(name);
  };

  // 发送问题
  const handleSend = async (question) => {
    if (!pdfId) return;
    setLoading(true);
    setChatHistory((prev) => [
      ...prev,
      { role: "user", content: question }
    ]);
    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ pdf_id: pdfId, query: question })
      });
      const data = await res.json();
      setChatHistory((prev) => [
        ...prev,
        { role: "assistant", content: data.answer }
      ]);
    } catch (e) {
      setChatHistory((prev) => [
        ...prev,
        { role: "assistant", content: "出错了，请重试。" }
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex flex-col items-center py-8 font-sans">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">智能 PDF 问答</h1>
        {!pdfId ? (
          <UploadBox onSuccess={handleUploadSuccess} />
        ) : (
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-xl shadow-inner">
            <span className="text-gray-700 font-medium">已上传：{fileName}</span>
            <span className="text-xs text-green-500">✔️</span>
          </div>
        )}
        <ChatInterface
          disabled={!pdfId}
          chatHistory={chatHistory}
          onSend={handleSend}
          loading={loading}
        />
      </div>
      <footer className="text-center text-gray-400 py-4 text-sm">
        © 2025 智能 PDF 问答 | Powered by React & TailwindCSS
      </footer>
    </div>
  );
} 