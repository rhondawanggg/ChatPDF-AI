# PDF Q&A Assistant

This project includes a frontend (React) and a backend (FastAPI), supporting PDF file uploads and intelligent Q&A based on the content.

---
## Tech Stack

- Frontend：React 18 + TailwindCSS
- Backend：FastAPI + Python + OpenAI GPT + PyPDF2

---
## Project Structure

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
## Development Environment Setup

### 1. Start the Backend (FastAPI)

Open a terminal in the `backend` directory and run the following commands:

```bash
cd backend
python3 -m venv venv && source venv/bin/activate  
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

---

### 2. Start the Frontend (React）

Open another terminal, navigate to the `frontend` directory, and run:

```bash
cd frontend
npm install  
npm start
```

---

### 3. Access

- Frontend：http://localhost:3000
- Backend：http://localhost:8000

  
---
## Environment Configuration

- Required environment variables should be configured in `.env` file.
