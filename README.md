# 智能 PDF 问答小助手

本项目包含前端（React）和后端（FastAPI），支持上传 PDF 并基于内容进行智能问答。

---

## 快速开始

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

