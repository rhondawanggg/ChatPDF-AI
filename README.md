# 智能 PDF 问答

本项目包含前端（React）和后端（FastAPI），支持上传 PDF 并基于内容进行智能问答。

---

## 快速开始

### 1. 启动后端（FastAPI）

在 `backend` 目录下打开终端，依次运行：

```bash
cd backend
python3 -m venv venv && source venv/bin/activate  # Windows 用 .\venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env   # 并填写 OPENAI_API_KEY=你的key
uvicorn main:app --host 0.0.0.0 --port 8000
```

- 后端窗口要一直开着，前端才能访问接口。

---

### 2. 启动前端（React）

另开一个终端，进入 `frontend` 目录，依次运行：

```bash
cd frontend
npm install   # 仅首次需要
npm start
```

- 启动后会自动打开浏览器访问前端页面。

---

### 3. 访问

- 前端页面：http://localhost:3000
- 后端接口：http://localhost:8000

---

如需局域网访问，把前端请求地址改成后端机器的 IP（如 http://192.168.x.x:8000）。

---

## 常见问题

- **前后端必须分别启动，且都要保持运行。**
- 如果前端报 `ERR_CONNECTION_REFUSED`，请检查后端是否已启动、端口是否正确。
- 局域网访问时，前端请求地址要用后端机器的 IP。
- `.env` 文件需配置好 OpenAI API Key。
- 端口被占用可换端口，如 `--port 8080`。
- PDF 上传失败时请看后端返回的 error 信息。

---

如有问题请先检查后端和前端是否都已正确启动，再排查网络和依赖问题。

## 功能特性
- 拖拽上传 PDF，动画反馈，上传后显示文件名
- AI 支持多轮问答，自动标注引用页码和原文
- 聊天历史完整展示，支持追问
- 现代化 UI，渐变按钮、圆角、阴影、响应式

## 技术栈
- 前端：React 18 + TailwindCSS
- 后端：FastAPI + OpenAI GPT-3.5 + PyPDF2

## 目录结构
```
PDF Chat/
  backend/
    main.py
    requirements.txt
  frontend/
    package.json
    tailwind.config.js
    postcss.config.js
    index.css
    src/
      App.js
      index.js
      components/
        UploadBox.jsx
        ChatInterface.jsx
        MessageBubble.jsx
  README.md
```

## 接口说明
- `POST /upload_pdf/`  上传 PDF，返回 `pdf_id`
- `POST /chat`  问答接口，参数：
  - `pdf_id`：PDF 文件 id
  - `query`：用户问题
  - 返回：`{"answer": "..."}`

## 依赖环境
- Python 3.8+
- Node.js 16+
  
