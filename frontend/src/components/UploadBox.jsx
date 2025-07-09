import React, { useRef, useState } from "react";

export default function UploadBox({ onSuccess }) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef();

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (!file || file.type !== "application/pdf") return;
    await uploadFile(file);
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") return;
    await uploadFile(file);
  };

  const uploadFile = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      // 使用完整后端地址
      const res = await fetch("https://chatpdf-ai-backend.onrender.com/upload_pdf/", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      onSuccess(data.pdf_id || "demo", file.name);
    } catch (e) {
      alert("上传失败，请重试");
    }
    setUploading(false);
  };

  return (
    <div
      className={`transition-all duration-300 border-2 ${dragActive ? "border-blue-400 bg-blue-50" : "border-dashed border-gray-300 bg-gray-50"} rounded-2xl flex flex-col items-center justify-center py-12 cursor-pointer shadow-inner relative`}
      onDragOver={e => { e.preventDefault(); setDragActive(true); }}
      onDragLeave={e => { e.preventDefault(); setDragActive(false); }}
      onDrop={handleDrop}
      onClick={() => inputRef.current.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleChange}
        disabled={uploading}
      />
      <div className="flex flex-col items-center gap-2">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-tr from-blue-400 to-purple-400 animate-pulse ${uploading ? "opacity-60" : ""}`}>
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
        </div>
        <p className="text-lg font-medium text-gray-700">拖拽 PDF 到此处，或点击上传</p>
        <p className="text-xs text-gray-400">仅支持单个 PDF 文件</p>
        {uploading && <span className="mt-2 text-blue-500 animate-pulse">上传中…</span>}
      </div>
    </div>
  );
} 
