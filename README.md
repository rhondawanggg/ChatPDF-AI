# 智能 PDF 问答小助手

本项目包含前端（React）和后端（FastAPI），支持上传 PDF 文件并基于内容进行智能问答。

---
## 技术栈

- 前端：React 18 + TailwindCSS
- 后端：FastAPI + Python + OpenAI GPT + PyPDF2

---
## 项目结构

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

---
## 开发环境设置

### 1. 启动后端（FastAPI）

在 `backend` 目录下打开终端，依次运行：

```bash
cd backend
python3 -m venv venv && source venv/bin/activate  
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

---

### 2. 启动前端（React）

另开一个终端，进入 `frontend` 目录，依次运行：

```bash
cd frontend
npm install  
npm start
```

---

### 3. 访问

- 前端页面：http://localhost:3000
- 后端接口：http://localhost:8000

  
---
## 环境变量

- 请参考 .env 文件设置必要的环境变量。
